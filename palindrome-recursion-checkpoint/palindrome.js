function isPalindrome(word) {
  const normalizedWord = String(word).trim().toLowerCase();

  function check(left, right) {
    if (left >= right) {
      return true;
    }

    if (normalizedWord[left] !== normalizedWord[right]) {
      return false;
    }

    return check(left + 1, right - 1);
  }

  return check(0, normalizedWord.length - 1);
}

const words = ["gag", "kayak", "php", "radar", "hello", "world", "javascript"];

for (const word of words) {
  const result = isPalindrome(word) ? "is a palindrome" : "is not a palindrome";
  console.log(`${word}: ${result}`);
}
