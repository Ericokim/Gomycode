# Sentence Analyzer

This small Node.js script analyzes a sentence and reports:

- The length of the sentence (number of characters). The final dot/point is counted as a character.
- The number of words in the sentence (assumes words are separated by a single space).
- The number of vowels in the sentence (a, e, i, o, u — case-insensitive).

The implementation follows the checkpoint rules:

- Iterates each character separately.
- Uses exactly three variables as counters: `charCount`, `wordCount`, `vowelCount`.
- The sample sentence ends with a point (.) and the code documents this assumption.

# Small Algorithms — Sentence Analyzer & Insertion Sort

This repository contains two small, self-contained Node.js scripts used
for teaching algorithmic checkpoints:

- `sentence.js` — a sentence analyzer (character, word, vowel counts).
- `insertion_sort.js` — in-place insertion sort implementation.

## Insertion Sort — checkpoint

The `insertion_sort.js` file implements insertion sort in a clear and
documented way. It follows the checkpoint instructions:

- Each iteration works with the first `i-1` elements.
- The element `arr[i]` is picked and inserted into the sorted sequence
  `arr[0..i-1]`.
- Uses two loop counters: `i` and `j`.

The implementation is in-place and the module exports two helpers:

- `insertionSort(arr)` — sorts the array in-place (returns nothing).
- `insertionSortReturn(arr)` — sorts in-place and returns the sorted array
  (handy for tests).

## How to run the insertion sort script

From the project folder run (PowerShell):

```powershell
# Provide numbers as separate arguments
node "d:\Projects\Gomycode\javascript Algo\insertion_sort.js" 5 2 9 1 5

# Or run without args to use a sample array
node "d:\Projects\Gomycode\javascript Algo\insertion_sort.js"
```

Example output:

```
Input: 5 2 9 1 5
Sorted: 1 2 5 5 9
```

## Evaluation checklist (fill before submission)

Use this checklist to make sure the submission meets the checkpoint
requirements. Evaluators can mark each item (0–5):

- Use of two counters (`i` and `j`).
- Correct insertion sort logic: insert `arr[i]` into `arr[0..i-1]`.
- Documentation & clarity in `insertion_sort.js`.
- README contains usage and evaluation checklist.
- Submission deadline clearly placed in this README or PR description.

## Submission Deadline (IMPORTANT)

Replace the placeholder below with your actual deadline date. According
to checkpoint rules, late submissions may receive a score of 0.

Submission deadline: YYYY-MM-DD <-- REPLACE THIS WITH THE ACTUAL DEADLINE

Deadline Alert: If your submission is after the date above, the
checkpoint rules state it may receive a 0. Make sure the date is visible
in the PR description or at the top of this README.

---

If you want, I can add a small unit test file (using Node's `assert` or
Jest) that verifies the insertion sort implementation on several edge
cases (empty array, single element, duplicates, negative numbers).
