# Assignment: Optimizing a Delivery Platform Backend System

## Introduction
In this assignment, the goal is to select the maximum number of non-overlapping delivery tasks that a single driver can complete. Two approaches are considered:

1. **Brute-force approach** – checks all possible valid combinations of tasks  
2. **Greedy approach** – always chooses the task that finishes earliest  

The purpose is to compare both methods and determine which one is more suitable for a real-time backend system that handles thousands of tasks per second.

## Explanation of the Two Approaches

### 1. Brute-Force Algorithm

The brute-force solution tries every possible subset of tasks and checks which subset has the largest number of non-overlapping tasks.

#### Advantages

* guarantees the optimal answer
* useful for learning and testing

#### Disadvantages

* very slow for large inputs
* not practical for real-time systems

#### Complexity

* **Time Complexity:** `O(2^n * n)`
* **Space Complexity:** `O(n)`

This is because it explores all possible combinations of tasks, and the number of subsets grows exponentially.

---

### 2. Greedy Algorithm

The greedy solution first sorts tasks by their end time, then repeatedly chooses the next task that finishes earliest and does not overlap with the previous one.

#### Advantages

* gives the optimal answer for this problem
* much faster than brute force
* easy to understand and maintain

#### Disadvantages

* only works because this problem has a greedy property
* not every scheduling problem can be solved greedily

#### Complexity

* **Time Complexity:** `O(n log n)`
* **Space Complexity:** `O(n)`

The sorting step takes `O(n log n)`, and the selection step takes `O(n)`.

---

## Comparison of the Two Approaches

The greedy algorithm is much faster for large inputs because it sorts the tasks once and then processes them in a single pass. Its time complexity is `O(n log n)`, which makes it suitable for handling thousands of tasks. On the other hand, the brute-force solution checks all possible combinations and grows exponentially, so it becomes too slow very quickly. The greedy solution is also easier to maintain and scale because the logic is simpler and clearer. In terms of memory, both use extra space, but brute force also depends on recursion and becomes inefficient because of the huge number of possibilities it explores.

---

## Recommendation

I recommend using the **greedy algorithm based on earliest end time** for the final delivery platform system.

### Reason for the recommendation

* it is much faster for large inputs
* it gives the correct optimal answer for this problem
* it is simple and easy to maintain
* it is practical for a real-time backend system

The brute-force method may still be useful in small test cases, for validating correctness, or for educational purposes. However, it is not suitable for production use in a system that must handle thousands of tasks per second.

---


## Conclusion

In conclusion, both brute-force and greedy approaches can produce the correct answer for the delivery task scheduling problem. However, the greedy algorithm is clearly the better option for a real-time delivery backend because it is much faster, easier to maintain, and scalable for large inputs. The brute-force approach is only practical for very small datasets or for verifying correctness during testing.
