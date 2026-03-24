function isNonOverlapping(selectedTasks) {
  for (let i = 1; i < selectedTasks.length; i++) {
    if (selectedTasks[i].start < selectedTasks[i - 1].end) {
      return false;
    }
  }
  return true;
}

// Brute-force approach
function bruteForceMaxTasks(tasks) {
  const sorted = [...tasks].sort((a, b) => a.start - b.start);
  let best = [];

  function backtrack(index, current) {
    if (index === sorted.length) {
      if (current.length > best.length && isNonOverlapping(current)) {
        best = [...current];
      }
      return;
    }

    backtrack(index + 1, current);

    current.push(sorted[index]);
    backtrack(index + 1, current);
    current.pop();
  }

  backtrack(0, []);
  return best;
}

// Greedy approach
function greedyMaxTasks(tasks) {
  const sorted = [...tasks].sort((a, b) => a.end - b.end);
  const selected = [];
  let lastEnd = -Infinity;

  for (const task of sorted) {
    if (task.start >= lastEnd) {
      selected.push(task);
      lastEnd = task.end;
    }
  }

  return selected;
}

// Utility: generate random tasks
function generateRandomTasks(count, maxTime = 100000) {
  const tasks = [];

  for (let i = 0; i < count; i++) {
    const start = Math.floor(Math.random() * maxTime);
    const duration = Math.floor(Math.random() * 20) + 1;
    const end = start + duration;
    tasks.push({ start, end });
  }

  return tasks;
}

// Sample validation
const tasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 },
];

const bruteResult = bruteForceMaxTasks(tasks);
const greedyResult = greedyMaxTasks(tasks);

console.log("Brute-force result:", bruteResult);
console.log("Greedy result:", greedyResult);
console.log(
  "Same number of tasks:",
  bruteResult.length === greedyResult.length,
);

// Timing
console.log("\n--- Performance Test ---");

// Greedy can handle 10,000 tasks
const largeTasks = generateRandomTasks(10000);

console.time("Greedy 10,000 tasks");
const greedyLarge = greedyMaxTasks(largeTasks);
console.timeEnd("Greedy 10,000 tasks");
console.log("Greedy selected:", greedyLarge.length);

// Brute-force cannot realistically handle 10,000 tasks
// Use a much smaller subset to demonstrate growth
const smallTasks = generateRandomTasks(20);

console.time("Brute-force 20 tasks");
const bruteSmall = bruteForceMaxTasks(smallTasks);
console.timeEnd("Brute-force 20 tasks");
console.log("Brute-force selected:", bruteSmall.length);

// Bonus stress tests
const allOverlapping = [
  { start: 1, end: 5 },
  { start: 2, end: 6 },
  { start: 3, end: 7 },
  { start: 4, end: 8 },
];

const allNonOverlapping = [
  { start: 1, end: 2 },
  { start: 2, end: 3 },
  { start: 3, end: 4 },
  { start: 4, end: 5 },
];

const sameStartOrEnd = [
  { start: 1, end: 3 },
  { start: 1, end: 2 },
  { start: 2, end: 4 },
  { start: 3, end: 4 },
  { start: 4, end: 6 },
];

console.log("\n--- Stress Tests ---");
console.log("All overlapping - Greedy:", greedyMaxTasks(allOverlapping));
console.log("All overlapping - Brute:", bruteForceMaxTasks(allOverlapping));

console.log("All non-overlapping - Greedy:", greedyMaxTasks(allNonOverlapping));
console.log(
  "All non-overlapping - Brute:",
  bruteForceMaxTasks(allNonOverlapping),
);

console.log("Same start/end - Greedy:", greedyMaxTasks(sameStartOrEnd));
console.log("Same start/end - Brute:", bruteForceMaxTasks(sameStartOrEnd));
