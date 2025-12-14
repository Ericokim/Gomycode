// 1. Reverse a String
function reverseString(str) {
  if (!str || typeof str !== "string") {
    return ""; 
  }
  return str.split("").reverse().join("");
}

// 2. Count Characters in a String
function countCharacters(str) {
  if (!str || typeof str !== "string") {
    return 0; // Return 0 if invalid
  }
  return str.length;
}

// 3. Capitalize the First Letter of Each Words
function capitalizeWords(sentence) {
  if (!sentence || typeof sentence !== "string") {
    return ""; 
  }
  return sentence
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word; // Skip empty words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}


// Test reverseString
console.log("\n1. Reverse String:");
console.log('reverseString("hello"):', reverseString("hello"));
console.log('reverseString("JavaScript"):', reverseString("JavaScript"));

// Test countCharacters
console.log("\n2. Count Characters:");
console.log('countCharacters("hello"):', countCharacters("hello"));
console.log(
  'countCharacters("Hello World!"):',
  countCharacters("Hello World!")
);

// Test capitalizeWords
console.log("\n3. Capitalize Words:");
console.log('capitalizeWords("hello world"):', capitalizeWords("hello world"));
console.log(
  'capitalizeWords("javascript is fun"):',
  capitalizeWords("javascript is fun")
);
