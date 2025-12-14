

// 1. Factorial of a Number
function factorial(n) {
  // Check for negative numbers
  if (n < 0) {
    return undefined; // Factorial doesn't work with negatives
  }
  // Base case: 0! = 1 and 1! = 1
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive call: n! = n × (n-1)!
  return n * factorial(n - 1);
}

// 2. Prime Number Check

function isPrime(num) {
  // Numbers less than 2 are not prime
  if (num <= 1) return false;
  // 2 is the only even prime
  if (num === 2) return true;
  // All other even numbers are not prime
  if (num % 2 === 0) return false;

  // Check odd numbers up to square root
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // Found a divisor, not prime
    }
  }
  return true; // No divisors found, is prime
}

// 3. Fibonacci Sequence (up to n terms)
// Each number is the sum of the previous two

function fibonacci(n) {
  // Check for invalid input
  if (n <= 0) {
    return []; // Return empty array if n is 0 or negative
  }

  const sequence = [];
  let a = 0, // First number
    b = 1; // Second number

  for (let i = 0; i < n; i++) {
    sequence.push(a); // Add current number
    [a, b] = [b, a + b]; // Update: a becomes b, b becomes a+b
  }

  return sequence;
}


// Test factorial
console.log("\n1. Factorial:");
console.log("factorial(5) = 5×4×3×2×1 =", factorial(5));
console.log("factorial(0) =", factorial(0));
console.log("factorial(7) =", factorial(7));

// Test isPrime
console.log("\n2. Prime Number Check:");
console.log("isPrime(7):", isPrime(7), "(7 is prime)");
console.log("isPrime(10):", isPrime(10), "(10 is not prime)");
console.log("isPrime(13):", isPrime(13), "(13 is prime)");
console.log("isPrime(2):", isPrime(2), "(2 is prime)");

// Test fibonacci
console.log("\n3. Fibonacci Sequence:");
console.log("fibonacci(8):", fibonacci(8));
console.log("fibonacci(10):", fibonacci(10));
console.log("fibonacci(5):", fibonacci(5));
