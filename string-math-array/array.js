// 1. Find Maximum Value in an Array
function findMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return undefined; 
  }
  return Math.max(...arr);
}

// 2. Find Minimum Value in an Array
function findMin(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return undefined;
  }
  return Math.min(...arr);
}

// 3. Sum of All Elements in an Array
function sumArray(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }
  return arr.reduce((total, num) => total + num, 0);
}

// 4. Filter Array Based on a Condition
function filterArray(arr, condition) {
  if (!Array.isArray(arr)) {
    return [];
  }
  if (typeof condition !== "function") {
    return arr;
  }
  return arr.filter(condition);
}

console.log("\n=== ARRAY FUNCTIONS TESTS ===");

const numbers = [5, 2, 8, 1, 9, 3, 7];

// Test findMax
console.log("\n1. Find Maximum:");
console.log("Array:", numbers);
console.log("Maximum value:", findMax(numbers));

// Test findMin
console.log("\n2. Find Minimum:");
console.log("Array:", numbers);
console.log("Minimum value:", findMin(numbers));

// Test sumArray
console.log("\n3. Sum of Array:");
console.log("Array:", numbers);
console.log("Sum:", sumArray(numbers));

// Test filterArray
console.log("\n4. Filter Array:");
console.log("Original array:", numbers);
console.log(
  "Even numbers only:",
  filterArray(numbers, (num) => num % 2 === 0)
);
console.log(
  "Numbers > 5:",
  filterArray(numbers, (num) => num > 5)
);
