// =========================
// 1. MIN-HEAP PRIORITY QUEUE
// =========================
class MinHeapPriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }

    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex].priority <= this.heap[index].priority) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (
        left < length &&
        this.heap[left].priority < this.heap[smallest].priority
      ) {
        smallest = left;
      }

      if (
        right < length &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
    }
  }
}

// =========================
// 2. ORDERED ARRAY PRIORITY QUEUE
// =========================
class OrderedArrayPriorityQueue {
  constructor() {
    this.items = [];
  }

  insert(element) {
    let i = 0;

    while (
      i < this.items.length &&
      this.items[i].priority <= element.priority
    ) {
      i++;
    }

    this.items.splice(i, 0, element);
  }

  extractMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }

    return this.items.shift();
  }

  peekMin() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }

    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}


// =========================
// TESTING
// =========================
console.log("\n=== Min-Heap Priority Queue ===");
const minHeapPQ = new MinHeapPriorityQueue();
minHeapPQ.insert({ value: "Task A", priority: 3 });
minHeapPQ.insert({ value: "Task B", priority: 1 });
minHeapPQ.insert({ value: "Task C", priority: 2 });
console.log(minHeapPQ.peekMin()); // Task B
console.log(minHeapPQ.extractMin()); // Task B
console.log(minHeapPQ.extractMin()); // Task C
console.log(minHeapPQ.isEmpty()); // false

console.log("\n=== Ordered Array Priority Queue ===");
const orderedPQ = new OrderedArrayPriorityQueue();
orderedPQ.insert({ value: "Task A", priority: 3 });
orderedPQ.insert({ value: "Task B", priority: 1 });
orderedPQ.insert({ value: "Task C", priority: 2 });
console.log(orderedPQ.peekMin()); // Task B
console.log(orderedPQ.extractMin()); // Task B
console.log(orderedPQ.extractMin()); // Task C
console.log(orderedPQ.isEmpty()); // false
