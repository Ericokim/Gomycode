# Distributed Key-Value Store with Consistent Hashing and Caching

## Project Overview

This project simulates a basic distributed key-value storage system. It uses consistent hashing to assign keys to storage nodes, supports node join and leave operations, includes a small Least Recently Used cache, and simulates node failure and recovery.

The user interacts with simple `save` and `read` methods. The system hides which storage node owns each key, so reads and writes remain transparent to the user.

## Features

- Consistent hashing for dynamic key placement.
- Node join and leave behavior with rebalancing.
- LRU cache for faster repeated reads.
- Simulated node failures with limited availability.
- Beginner-friendly method names: `save`, `read`, `addNode`, `removeNode`, `failNode`, and `recoverNode`.
- Demo data included for users `user:101` through `user:106`.

## Example Data

| Key | Value |
| --- | --- |
| `user:101` | `{ "name": "Alice" }` |
| `user:102` | `{ "name": "Bob" }` |
| `user:103` | `{ "name": "Charlie" }` |
| `user:104` | `{ "name": "Diana" }` |
| `user:105` | `{ "name": "Eve" }` |
| `user:106` | `{ "name": "Frank" }` |

## Project Files

- `index.js` - complete simulation code.
- `package.json` - start and syntax-check scripts.
- `Dockerfile` - optional container setup for running the simulation in Node.js.
- `projectplan.md` - planning checklist and review notes.
- `README.md` - project explanation and usage guide.

## How to Run

This project uses only built-in Node.js modules, so no package installation is required.

Run the simulation:

```bash
npm start
```

Check syntax:

```bash
npm run check
```

## Optional Docker Run

Build the image:

```bash
docker build -t distributed-kv-store .
```

Run the container:

```bash
docker run --rm distributed-kv-store
```

## Expected Output

The terminal output shows:

- The initial distribution of keys across nodes.
- Cache behavior where a repeated read comes from cache.
- A new node joining the ring and keys being rebalanced.
- A node leaving and only its keys being moved.
- A node failure where the system still responds using active nodes.
- A recovered node and final rebalancing.

## Design Notes

### Consistent Hashing

Each storage node is placed on a hash ring with virtual replicas. A key is hashed and assigned to the next active node on the ring. When a node joins or leaves, only part of the data needs to move instead of redistributing every key manually.

### Caching

The cache uses an LRU policy with a small fixed size. When a key is read, the result is stored in the cache. If the same key is read again before eviction, the response comes from cache.

### Node Failure

Failed nodes are marked inactive. Reads are routed to active nodes only. This gives limited availability for the simulation, but because this is a simple checkpoint project, it does not implement full replication.

### Transparency

The user does not choose a node directly. The store methods handle hashing, node selection, caching, and failure routing internally.

### Microservices and Containerization

The simulation treats each storage node as an independent service-like unit with its own state and health flag. The included Dockerfile shows how the project can be packaged and run in a container.

## Evaluation Coverage

- **Tech Skills:** Uses hashing, node management, caching, and simulation logic.
- **Quality of Work:** Keeps the project small, readable, and runnable with built-in Node.js modules.
- **Problem-Solving Skills:** Demonstrates how distributed systems handle scaling, rebalancing, and partial failure.
