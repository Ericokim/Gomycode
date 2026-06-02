const crypto = require("crypto");

// =====================================================
// 1. Sample data
// =====================================================

// Sample data required by the checkpoint.
const SAMPLE_USERS = {
  "user:101": { name: "Alice" },
  "user:102": { name: "Bob" },
  "user:103": { name: "Charlie" },
  "user:104": { name: "Diana" },
  "user:105": { name: "Eve" },
  "user:106": { name: "Frank" }
};

// =====================================================
// 2. Helper for consistent hashing
// =====================================================

// Turn any key or node name into a repeatable number.
const createHashNumber = (value) => {
  return parseInt(
    crypto.createHash("sha1").update(value).digest("hex").slice(0, 8),
    16
  );
};

// =====================================================
// 3. LRU cache
// =====================================================

// Stores recently read values. When full, it removes the oldest used item.
class LRUCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.items = new Map();
  }

  get(key) {
    if (!this.items.has(key)) return undefined;

    const value = this.items.get(key);

    // Mark item as recently used by moving it to the end of the Map.
    this.items.delete(key);
    this.items.set(key, value);

    return value;
  }

  set(key, value) {
    if (this.items.has(key)) {
      this.items.delete(key);
    }

    this.items.set(key, value);

    if (this.items.size > this.limit) {
      const leastRecentlyUsedKey = this.items.keys().next().value;
      this.items.delete(leastRecentlyUsedKey);
    }
  }

  clear() {
    this.items.clear();
  }
}

class ConsistentHashRing {
  constructor(virtualNodes = 3) {
    this.virtualNodes = virtualNodes;
    this.ring = [];
  }

  addNode(nodeName) {
    // Virtual nodes help spread keys more evenly across the ring.
    for (let index = 1; index <= this.virtualNodes; index += 1) {
      this.ring.push({
        nodeName,
        position: createHashNumber(`${nodeName}:${index}`)
      });
    }

    this.ring.sort((a, b) => a.position - b.position);
  }

  removeNode(nodeName) {
    this.ring = this.ring.filter((point) => point.nodeName !== nodeName);
  }

  findNodeNameForKey(key) {
    if (this.ring.length === 0) {
      throw new Error("No nodes exist in the hash ring.");
    }

    const keyPosition = createHashNumber(key);

    // Pick the first node after the key position. If none exists, wrap to the first node.
    const node =
      this.ring.find((point) => point.position >= keyPosition) || this.ring[0];

    return node.nodeName;
  }
}

// =====================================================
// 4. Distributed key-value store
// =====================================================

// This class hides node selection from the user. The user only calls save/read.
class DistributedKeyValueStore {
  constructor({ cacheLimit = 3, virtualNodes = 3 } = {}) {
    this.nodes = new Map();
    this.ring = new ConsistentHashRing(virtualNodes);
    this.cache = new LRUCache(cacheLimit);
  }

  addNode(nodeName) {
    if (this.nodes.has(nodeName)) {
      return [];
    }

    this.nodes.set(nodeName, {
      name: nodeName,
      active: true,
      data: new Map()
    });

    this.ring.addNode(nodeName);

    // After adding a node, only some keys should move to the new correct owner.
    return this.rebalance();
  }

  removeNode(nodeName) {
    const node = this.nodes.get(nodeName);

    if (!node) {
      return [];
    }

    const keysToMove = Array.from(node.data.keys());
    const dataToMove = Array.from(node.data.entries());

    this.nodes.delete(nodeName);
    this.ring.removeNode(nodeName);
    this.cache.clear();

    dataToMove.forEach(([key, value]) => {
      this.save(key, value);
    });

    return keysToMove;
  }

  failNode(nodeName) {
    const node = this.nodes.get(nodeName);

    if (!node) {
      return false;
    }

    node.active = false;
    this.cache.clear();

    return true;
  }

  recoverNode(nodeName) {
    const node = this.nodes.get(nodeName);

    if (!node) {
      return [];
    }

    node.active = true;
    this.cache.clear();

    return this.rebalance();
  }

  save(key, value) {
    const node = this.getOwnerNode(key);

    if (!node.active) {
      return {
        ok: false,
        reason: `owner node ${node.name} is unavailable`
      };
    }

    node.data.set(key, value);

    // Cache the value so a repeated read can be faster.
    this.cache.set(key, value);

    return {
      ok: true,
      node: node.name
    };
  }

  read(key) {
    const cachedValue = this.cache.get(key);

    if (cachedValue !== undefined) {
      return {
        ok: true,
        value: cachedValue,
        source: "cache"
      };
    }

    const node = this.getOwnerNode(key);

    if (!node.active) {
      return {
        ok: false,
        value: undefined,
        source: node.name,
        reason: "owner node failed; no replica configured"
      };
    }

    const value = node.data.get(key);

    if (value !== undefined) {
      // Store successful reads in cache.
      this.cache.set(key, value);

      return {
        ok: true,
        value,
        source: node.name
      };
    }

    return {
      ok: false,
      value: undefined,
      source: node.name,
      reason: "key not found"
    };
  }

  getOwnerNode(key) {
    const nodeName = this.ring.findNodeNameForKey(key);
    const node = this.nodes.get(nodeName);

    if (!node) {
      throw new Error(`Owner node ${nodeName} does not exist.`);
    }

    return node;
  }

  rebalance() {
    const previousOwners = new Map();
    const allData = [];

    // Collect all keys before clearing nodes.
    this.nodes.forEach((node) => {
      node.data.forEach((value, key) => {
        previousOwners.set(key, node.name);
        allData.push([key, value]);
      });

      node.data.clear();
    });

    const movedKeys = [];

    allData.forEach(([key, value]) => {
      const owner = this.getOwnerNode(key);

      owner.data.set(key, value);

      // Count only keys that changed owner.
      if (previousOwners.get(key) !== owner.name) {
        movedKeys.push(key);
      }
    });

    this.cache.clear();

    return movedKeys;
  }

  printCluster() {
    this.nodes.forEach((node) => {
      const status = node.active ? "active" : "failed";
      const keys = Array.from(node.data.keys()).sort().join(", ") || "no keys";

      console.log(`${node.name} (${status}): ${keys}`);
    });
  }
}

// =====================================================
// 5. Printing helpers
// =====================================================

const printTitle = (title) => {
  console.log(`\n=== ${title} ===`);
};

const printRead = (store, key) => {
  const result = store.read(key);
  const value =
    result.value !== undefined ? JSON.stringify(result.value) : "unavailable";
  const reason = result.reason ? ` (${result.reason})` : "";

  console.log(`read(${key}) -> ${value} from ${result.source}${reason}`);
};

// =====================================================
// 6. Demo
// =====================================================

function runDemo() {
  const store = new DistributedKeyValueStore({
    cacheLimit: 3,
    virtualNodes: 3
  });

  ["node-a", "node-b", "node-c"].forEach((nodeName) => {
    store.addNode(nodeName);
  });

  Object.entries(SAMPLE_USERS).forEach(([key, value]) => {
    store.save(key, value);
  });

  printTitle("Initial key distribution");
  store.printCluster();

  printTitle("Cache demo");
  printRead(store, "user:101");
  printRead(store, "user:102");
  printRead(store, "user:101");

  const movedAfterJoin = store.addNode("node-d");

  printTitle(`Node join: node-d added (${movedAfterJoin.length} keys moved)`);
  store.printCluster();

  const movedAfterLeave = store.removeNode("node-a");

  printTitle(`Node leave: node-a removed (${movedAfterLeave.length} keys moved)`);
  store.printCluster();

  store.failNode("node-c");

  printTitle("Failure simulation: node-c failed");
  store.printCluster();
  printRead(store, "user:103");
  printRead(store, "user:106");

  const movedAfterRecovery = store.recoverNode("node-c");

  printTitle(`Recovery: node-c restored (${movedAfterRecovery.length} keys moved)`);
  store.printCluster();
}

runDemo();
