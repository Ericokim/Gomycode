# Checkpoint Recursion - Is Palindrome

## Description

This project checks whether a word is a palindrome.

A word is a palindrome when it can be read the same way from left to right and from right to left.

Examples:

- `gag`
- `kayak`
- `php`
- `radar`

## How the Algorithm Works

The function compares the characters at both ends of the word:

1. Compare the first character and the last character.
2. If they are different, the word is not a palindrome.
3. If they are equal, move inward and compare the next pair.
4. Stop when the remaining word is empty or has one character.

The stop condition is:

```js
left >= right
```

When this happens, the word is a palindrome.

## How to Run

From this project folder, run:

```bash
node palindrome.js
```

## Expected Output

```text
gag: is a palindrome
kayak: is a palindrome
php: is a palindrome
radar: is a palindrome
hello: is not a palindrome
world: is not a palindrome
javascript: is not a palindrome
```

## Code Summary

The main function is:

```js
isPalindrome(word)
```

It normalizes the word by trimming spaces and converting it to lowercase. Then it uses a recursive helper with two counters:

- `left`: starts at the beginning of the word
- `right`: starts at the end of the word

Each recursive call moves the counters inward:

```js
check(left + 1, right - 1)
```

This keeps the solution simple and directly follows the checkpoint instructions.
