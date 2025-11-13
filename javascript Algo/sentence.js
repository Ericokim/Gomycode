// sentence.js
// Function to analyze a sentence and count characters, words, and vowels.

function readSentence(sentence) {
  // Initialize counters
  let charCount = 0;
  let wordCount = 0;
  let vowelCount = 0;

  // Define vowels once for clarity
  const vowels = "aeiouAEIOU";

  // Loop through each character
  for (let i = 0; i < sentence.length; i++) {
    const ch = sentence[i];

    // Count each character
    charCount++;

    // Check if it’s a vowel
    if (vowels.includes(ch)) {
      vowelCount++;
    }

    // Count words when a space is found
    if (ch === " ") {
      wordCount++;
    }
  }

  // Add the last word if sentence is not empty
  if (sentence.trim().length > 0) {
    wordCount++;
  }

  // Display results
  console.log("Sentence:", sentence);
  console.log("Total characters:", charCount);
  console.log("Total words:", wordCount);
  console.log("Total vowels:", vowelCount);
}


const data = "Coding challenges improve your problem-solving skills.";
readSentence(data);
