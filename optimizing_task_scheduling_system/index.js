class TaskScheduler {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  addTask(name, start, end, priority) {
    this.tasks.push({ name, start, end, priority });
  }

  // 1. Sort tasks by start time
  sortByStartTime() {
    return [...this.tasks].sort((a, b) => a.start - b.start);
  }

  // 2. Group tasks by priority
  groupByPriority() {
    const grouped = {
      High: [],
      Medium: [],
      Low: [],
    };

    for (const task of this.tasks) {
      if (!grouped[task.priority]) {
        grouped[task.priority] = [];
      }
      grouped[task.priority].push(task);
    }

    return grouped;
  }

  // 3. Detect overlapping tasks
  detectOverlappingTasks() {
    const sortedTasks = this.sortByStartTime();
    const overlaps = [];

    for (let i = 0; i < sortedTasks.length - 1; i++) {
      const current = sortedTasks[i];
      const next = sortedTasks[i + 1];

      if (current.end > next.start) {
        overlaps.push([current, next]);
      }
    }

    return overlaps;
  }

  // 4. Optional: Estimate memory usage roughly
  estimateMemoryUsage() {
    const bytesPerTask = 64; // rough estimate for simple demo purposes
    return this.tasks.length * bytesPerTask;
  }
}

// Example usage
const scheduler = new TaskScheduler();

scheduler.addTask("Task A", 9, 11, "High");
scheduler.addTask("Task B", 10, 12, "Medium");
scheduler.addTask("Task C", 13, 14, "Low");
scheduler.addTask("Task D", 11, 13, "High");
scheduler.addTask("Task E", 12, 15, "Medium");

console.log("Sorted by Start Time:");
console.log(scheduler.sortByStartTime());

console.log("\nGrouped by Priority:");
console.log(scheduler.groupByPriority());

console.log("\nOverlapping Tasks:");
const overlaps = scheduler.detectOverlappingTasks();
overlaps.forEach(([task1, task2], index) => {
  console.log(`${index + 1}. ${task1.name} overlaps with ${task2.name}`);
});

console.log("\nEstimated Memory Usage:");
console.log(`${scheduler.estimateMemoryUsage()} bytes`);
