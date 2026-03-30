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
    return this.items.map(job => `${job.name} (${job.pages} pages)`).join(" -> ");
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