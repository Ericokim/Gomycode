// 1. Factorial of a Number
function factorial(n) {
  if (n < 0) {
    return undefined;
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// 2. Prime Number Check
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  // Check odd numbers up to square root
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// 3. Fibonacci Sequence (up to n terms)
function fibonacci(n) {
  if (n <= 0) {
    return [];
  }

  const sequence = [];
  let a = 0,
    b = 1;

  for (let i = 0; i < n; i++) {
    sequence.push(a);
    [a, b] = [b, a + b];
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
