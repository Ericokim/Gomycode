# Low-Level Design and Design Patterns

## Checkpoint: Decision Making and Recursive Algorithms

## Objective

The aim of this assignment is to demonstrate the use of **decision-making statements** (`if-else`) and **recursive functions** in JavaScript.  
For the decision-making part, the program solves tasks such as checking leap years, determining movie ticket prices, and giving weather clothing advice.  
For the recursion part, the program solves tasks such as generating Fibonacci numbers, checking palindromes, and calculating powers.

---

## Solution

````javascript
// =========================
// Decision Making Section
// =========================

// 1. Leap Year Checker
function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return `${year} is a leap year.`;
  } else {
    return `${year} is not a leap year.`;
  }
}

// 2. Ticket Pricing
function getTicketPrice(age) {
  if (age <= 12) {
    return `Ticket price: $10`;
  } else if (age >= 13 && age <= 17) {
    return `Ticket price: $15`;
  } else {
    return `Ticket price: $20`;
  }
}

// 3. Weather Clothing Adviser
function clothingAdviser(temperature, isRaining) {
  let advice = "";

  if (temperature < 15) {
    advice = "Wear a warm jacket";
  } else if (temperature >= 15 && temperature <= 25) {
    advice = "Wear light clothes";
  } else {
    advice = "Wear very light clothes";
  }

  if (isRaining) {
    advice += " and carry an umbrella.";
  } else {
    advice += ".";
  }

  return advice;
}

// =========================
// Recursion Section
// =========================

// 1. Fibonacci Sequence
function fibonacci(n) {
  if (n < 0) return "Invalid input";
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 2. Palindrome Checker
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  function checkRecursive(left, right) {
    if (left >= right) return true;
    if (cleaned[left] !== cleaned[right]) return false;
    return checkRecursive(left + 1, right - 1);
  }

  return checkRecursive(0, cleaned.length - 1);
}

// 3. Power Function
function power(base, exponent) {
  if (exponent === 0) return 1;
  if (exponent < 0) return 1 / power(base, -exponent);

  return base * power(base, exponent - 1);
}

// =========================
// Test Cases / Output
// =========================

console.log("=== Decision Making ===");
console.log(isLeapYear(2024));
console.log(getTicketPrice(16));
console.log(clothingAdviser(18, true));

console.log("\\n=== Recursion ===");
console.log("Fibonacci(6):", fibonacci(6));
console.log(
  "Palindrome('A man, a plan, a canal, Panama'):",
  isPalindrome("A man, a plan, a canal, Panama")
);
console.log("Power(2, 4):", power(2, 4));


---

## Explanation of the Code

## Decision Making

### 1. Leap Year Checker

This function checks whether a year is a leap year.

A year is a leap year if:

* it is divisible by 4 and not divisible by 100,
  **or**
* it is divisible by 400

Example:

```javascript
isLeapYear(2024); // 2024 is a leap year.
````

---

### 2. Ticket Pricing

This function checks the user’s age and determines the movie ticket price.

Rules:

- Children (`age <= 12`) → `$10`
- Teenagers (`age 13-17`) → `$15`
- Adults (`age >= 18`) → `$20`

Example:

```javascript
getTicketPrice(16); // Ticket price: $15
```

---

### 3. Weather Clothing Adviser

This function gives clothing advice based on:

- the current temperature
- whether it is raining or not

Example:

```javascript
clothingAdviser(18, true); // Wear light clothes and carry an umbrella.
```

---

## Recursion

### 1. Fibonacci Sequence

This recursive function calculates the nth Fibonacci number.

The Fibonacci sequence starts as:
`0, 1, 1, 2, 3, 5, 8, ...`

Formula:

- `F(0) = 0`
- `F(1) = 1`
- `F(n) = F(n-1) + F(n-2)`

Example:

```javascript
fibonacci(6); // 8
```

---

### 2. Palindrome Checker

This recursive function checks whether a string is a palindrome.

It ignores:

- spaces
- punctuation
- capitalization

Example:

```javascript
isPalindrome("A man, a plan, a canal, Panama"); // true
```

---

### 3. Power Function

This recursive function calculates the result of raising a number to a given power.

Example:

```javascript
power(2, 4); // 16
```

It also supports negative exponents.

---

## Sample Output

```text
=== Decision Making ===
2024 is a leap year.
Ticket price: $15
Wear light clothes and carry an umbrella.

=== Recursion ===
Fibonacci(6): 8
Palindrome('A man, a plan, a canal, Panama'): true
Power(2, 4): 16
```

---

## Why These Solutions Work

- **Decision making** uses `if-else` statements to choose different actions depending on the input.
- **Recursion** solves problems by reducing them into smaller versions of the same problem until a base case is reached.

---

## Complexity Overview

| Function                | Time Complexity | Space Complexity |
| ----------------------- | --------------- | ---------------- |
| `isLeapYear()`          | `O(1)`          | `O(1)`           |
| `getTicketPrice()`      | `O(1)`          | `O(1)`           |
| `clothingAdviser()`     | `O(1)`          | `O(1)`           |
| `fibonacci(n)`          | `O(2^n)`        | `O(n)`           |
| `isPalindrome(str)`     | `O(n)`          | `O(n)`           |
| `power(base, exponent)` | `O(n)`          | `O(n)`           |

---

## Conclusion

In this assignment, I implemented JavaScript solutions for decision-making and recursive problems.
The decision-making section used conditional statements to solve real-world style tasks such as leap year checking, ticket pricing, and clothing advice.
The recursion section demonstrated how recursive functions can be used to solve mathematical and string-based problems such as Fibonacci numbers, palindrome checking, and power calculation.

```

```
