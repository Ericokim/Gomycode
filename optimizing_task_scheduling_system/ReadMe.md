
# Optimizing Task Scheduling System

## Objective
The goal of this assignment is to develop a lightweight task scheduling system for a to-do application. The system should manage tasks efficiently by sorting them by start time, grouping them by priority, and detecting overlapping tasks. It should also include an analysis of the time and space complexity of each function.

---

## Solution Code
[Source Code](./index.js)

## Explanation of the Code

### 1. Task Representation

Each task is stored as an object with the following properties:

* `name`
* `start`
* `end`
* `priority`

Example:

```javascript
{
  name: "Task A",
  start: 9,
  end: 11,
  priority: "High"
}
```

---

### 2. Sorting Tasks by Start Time

The `sortByStartTime()` function sorts tasks in ascending order based on their start time.

```javascript
sortByStartTime() {
  return [...this.tasks].sort((a, b) => a.start - b.start);
}
```

This makes it easier to process tasks in chronological order.

**Time Complexity:** `O(n log n)`
**Space Complexity:** `O(n)` because of the copied array

---

### 3. Grouping Tasks by Priority

The `groupByPriority()` function uses an object as a hash map to group tasks by priority.

```javascript
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
```

This is efficient because each task is processed only once.

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

---

### 4. Detecting Overlapping Tasks

The `detectOverlappingTasks()` function first sorts tasks, then compares each task with the next one.

```javascript
if (current.end > next.start)
```

If the current task ends after the next task starts, then the tasks overlap.

```javascript
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
```

This is more efficient than checking every pair of tasks.

**Time Complexity:** `O(n log n)`

* Sorting = `O(n log n)`
* Single pass comparison = `O(n)`

**Space Complexity:** `O(n)`

---

### 5. Estimating Memory Usage

The optional `estimateMemoryUsage()` function gives a rough estimate of memory usage based on the number of tasks.

```javascript
estimateMemoryUsage() {
  const bytesPerTask = 64;
  return this.tasks.length * bytesPerTask;
}
```

This is only an approximation, not an exact measurement.

**Time Complexity:** `O(1)`
**Space Complexity:** `O(1)`

---

## Why This Solution is Efficient

A less efficient overlap detection method would compare every task with every other task using nested loops:

```javascript
for (let i = 0; i < tasks.length; i++) {
  for (let j = i + 1; j < tasks.length; j++) {
    // compare tasks
  }
}
```

That would take `O(n²)` time.

The current solution improves performance by:

* sorting tasks once
* comparing neighboring intervals only

This reduces overlap detection to `O(n log n)` time.

---

## Sample Output

```text
Sorted by Start Time:
[
  { name: 'Task A', start: 9, end: 11, priority: 'High' },
  { name: 'Task B', start: 10, end: 12, priority: 'Medium' },
  { name: 'Task D', start: 11, end: 13, priority: 'High' },
  { name: 'Task E', start: 12, end: 15, priority: 'Medium' },
  { name: 'Task C', start: 13, end: 14, priority: 'Low' }
]

Grouped by Priority:
{
  High: [
    { name: 'Task A', start: 9, end: 11, priority: 'High' },
    { name: 'Task D', start: 11, end: 13, priority: 'High' }
  ],
  Medium: [
    { name: 'Task B', start: 10, end: 12, priority: 'Medium' },
    { name: 'Task E', start: 12, end: 15, priority: 'Medium' }
  ],
  Low: [
    { name: 'Task C', start: 13, end: 14, priority: 'Low' }
  ]
}

Overlapping Tasks:
1. Task A overlaps with Task B
2. Task D overlaps with Task E
3. Task E overlaps with Task C

Estimated Memory Usage:
320 bytes
```

---

## Complexity Summary

| Function                   | Time Complexity | Space Complexity |
| -------------------------- | --------------- | ---------------- |
| `addTask()`                | `O(1)`          | `O(1)`           |
| `sortByStartTime()`        | `O(n log n)`    | `O(n)`           |
| `groupByPriority()`        | `O(n)`          | `O(n)`           |
| `detectOverlappingTasks()` | `O(n log n)`    | `O(n)`           |
| `estimateMemoryUsage()`    | `O(1)`          | `O(1)`           |

---

## Conclusion

In this assignment, I implemented a task scheduling system in JavaScript that can sort tasks by start time, group them by priority, and detect overlapping tasks efficiently. I also analyzed the time and space complexity of each function. The solution uses appropriate data structures such as arrays and objects, and applies efficient algorithmic patterns such as sorting and interval comparison to improve performance.