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

console.log("\n=== Recursion ===");
console.log("Fibonacci(6):", fibonacci(6));
console.log("Palindrome('A man, a plan, a canal, Panama'):", isPalindrome("A man, a plan, a canal, Panama"));
console.log("Power(2, 4):", power(2, 4));