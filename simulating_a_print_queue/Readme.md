# Simulating a Print Queue

## Objective

The goal of this assignment is to simulate a shared office printer system using a **queue** data structure. Since print jobs are handled in the order they are received, the system follows the **First-In-First-Out (FIFO)** principle.

Each print job contains:

- a job name
- a number of pages

The program supports:

- adding print jobs to the queue
- processing print jobs one by one
- viewing the next print job
- checking whether the queue is empty
- printing the current queue contents

---

## Solution

```javascript
// Queue class
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    return this.items
      .map((job) => `${job.name} (${job.pages} pages)`)
      .join(" -> ");
  }
}

// PrinterQueue class
class PrinterQueue {
  constructor() {
    this.queue = new Queue();
  }

  addJob(name, pages) {
    const job = { name, pages };
    this.queue.enqueue(job);
    console.log(`Added job: ${name} (${pages} pages)`);
  }

  processJob() {
    if (this.queue.isEmpty()) {
      console.log("No print jobs to process.");
      return;
    }

    const job = this.queue.dequeue();
    console.log(`Processing job: ${job.name} (${job.pages} pages)`);
  }

  viewNextJob() {
    const job = this.queue.peek();
    if (typeof job === "string") {
      console.log(job);
    } else {
      console.log(`Next job: ${job.name} (${job.pages} pages)`);
    }
  }

  printJobs() {
    if (this.queue.isEmpty()) {
      console.log("Print queue is empty.");
    } else {
      console.log("Current Print Queue:");
      console.log(this.queue.printQueue());
    }
  }
}

// Test the solution
const printer = new PrinterQueue();

printer.addJob("Document1", 5);
printer.addJob("Report", 10);
printer.addJob("Assignment", 3);

printer.printJobs();
printer.viewNextJob();

printer.processJob();
printer.printJobs();

printer.processJob();
printer.processJob();
printer.processJob(); // queue is empty
```


---

## Explanation of the Code

### 1. Queue Class

The `Queue` class is implemented using an array and supports the main queue operations:

- `enqueue(item)` -> adds an item to the rear of the queue
- `dequeue()` -> removes and returns the front item
- `peek()` -> returns the front item without removing it
- `isEmpty()` -> checks whether the queue is empty
- `printQueue()` -> displays all items currently in the queue

This follows the **FIFO** rule:

> The first job added is the first job processed.

---

### 2. PrinterQueue Class

The `PrinterQueue` class uses the `Queue` class to simulate a printer system.

It supports:

- `addJob(name, pages)` -> adds a print job
- `processJob()` -> removes and processes the next job
- `viewNextJob()` -> shows the next job to be processed
- `printJobs()` -> displays all waiting jobs

Each print job is stored as an object like this:

```javascript
{ name: "Document1", pages: 5 }
```

---

## How the Simulation Works

### Adding Jobs

When a user sends a print job, it is placed at the end of the queue.

Example:

```javascript
printer.addJob("Document1", 5);
printer.addJob("Report", 10);
printer.addJob("Assignment", 3);
```

Queue becomes:

```text
Document1 (5 pages) -> Report (10 pages) -> Assignment (3 pages)
```

### Processing Jobs

The printer processes jobs in the same order they were received.

So:

1. `Document1` is printed first
2. `Report` is printed second
3. `Assignment` is printed last

This shows FIFO behavior clearly.

---

## Sample Output

```text
Added job: Document1 (5 pages)
Added job: Report (10 pages)
Added job: Assignment (3 pages)

Current Print Queue:
Document1 (5 pages) -> Report (10 pages) -> Assignment (3 pages)

Next job: Document1 (5 pages)

Processing job: Document1 (5 pages)
Current Print Queue:
Report (10 pages) -> Assignment (3 pages)

Processing job: Report (10 pages)
Processing job: Assignment (3 pages)
No print jobs to process.
```

---

## Complexity Analysis

### Queue Operations

- `enqueue()` -> `O(1)`
- `peek()` -> `O(1)`
- `isEmpty()` -> `O(1)`

### Dequeue Operation

- `dequeue()` using `shift()` on an array is `O(n)` because the remaining elements are re-indexed

### Printing the Queue

- `printQueue()` -> `O(n)`

### Overall

This solution works well for a basic checkpoint simulation.
For larger systems, a more optimized queue implementation could be built using a linked list or front/rear pointers to make `dequeue()` closer to `O(1)`.

---

## Conclusion

In this assignment, I simulated a printer system using a queue data structure. The solution correctly follows the FIFO principle by processing print jobs in the order they were added. The program supports adding jobs, viewing the next job, processing jobs, and displaying the queue. This demonstrates how queues are useful in real-world systems such as print scheduling.

---


## How to Run

1. Save the code in a file named `index.js`
2. Run it using Node.js: `node index.js`