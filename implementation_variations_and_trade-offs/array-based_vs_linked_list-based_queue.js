// =========================
// 1. ARRAY-BASED QUEUE
// =========================
class ArrayQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = new Array(capacity);
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(element) {
    if (this.size === this.capacity) {
      throw new Error("Queue is full");
    }

    this.queue[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const value = this.queue[this.front];
    this.queue[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.queue[this.front];
  }

  isEmpty() {
    return this.size === 0;
  }
}

// =========================
// 2. LINKED LIST-BASED QUEUE
// =========================
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(element) {
    const newNode = new Node(element);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.head.value;
  }

  isEmpty() {
    return this.head === null;
  }
}


// =========================
// TESTING
// =========================

console.log("=== Array-based Queue ===");
const aq = new ArrayQueue(3);
aq.enqueue(10);
aq.enqueue(20);
aq.enqueue(30);
console.log(aq.peek()); // 10
console.log(aq.dequeue()); // 10
console.log(aq.dequeue()); // 20
console.log(aq.isEmpty()); // false

console.log("\n=== Linked List-based Queue ===");
const llq = new LinkedListQueue();
llq.enqueue(100);
llq.enqueue(200);
llq.enqueue(300);
console.log(llq.peek()); // 100
console.log(llq.dequeue()); // 100
console.log(llq.dequeue()); // 200
console.log(llq.isEmpty()); // false
