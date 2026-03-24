
# Checkpoint: Implementation Variations and Trade-offs

## Objective
The goal is to implement two versions of a **Queue** and two versions of a **Priority Queue** in JavaScript, then understand the trade-offs between the implementations.

The structures implemented are:

### Queue
- Array-based Queue (fixed size)
- Linked List-based Queue (dynamic size)

### Priority Queue
- Min-Heap-based Priority Queue
- Ordered Array-based Priority Queue

The required operations include insertion, removal, peeking, and checking whether the data structure is empty. Edge cases such as removing from an empty structure and inserting into a full fixed-size queue are also handled.

---

## Explanation of Each Implementation

## 1. Array-based Queue

This queue uses a fixed-size array and keeps track of:

* `front`
* `rear`
* `size`

A circular indexing technique is used so that freed spaces can be reused efficiently.

### Operations

* `enqueue(element)` adds an element at the rear
* `dequeue()` removes the front element
* `peek()` returns the front element without removing it
* `isEmpty()` checks whether the queue is empty

### Edge case handled

* inserting when the queue is full throws an error
* removing or peeking from an empty queue throws an error

### Complexity

* `enqueue()` → `O(1)`
* `dequeue()` → `O(1)`
* `peek()` → `O(1)`
* `isEmpty()` → `O(1)`

### Trade-off

This implementation is very fast, but it has a fixed capacity. If more elements need to be stored than the array can hold, insertion fails unless resizing is added.

---

## 2. Linked List-based Queue

This queue uses a singly linked list with:

* `head` pointing to the front
* `tail` pointing to the rear

Each new element is added to the end, and removal happens from the front.

### Operations

* `enqueue(element)` adds a new node to the tail
* `dequeue()` removes the node at the head
* `peek()` returns the head value
* `isEmpty()` checks whether the queue has no nodes

### Edge case handled

* removing or peeking from an empty queue throws an error

### Complexity

* `enqueue()` → `O(1)`
* `dequeue()` → `O(1)`
* `peek()` → `O(1)`
* `isEmpty()` → `O(1)`

### Trade-off

This implementation grows dynamically, so it does not have the fixed-size limitation of the array-based queue. However, it uses extra memory for node pointers.

---

## 3. Min-Heap-based Priority Queue

This priority queue stores elements in a min-heap, where the smallest priority value is always at the root.

Each element is stored as an object such as:

```javascript
{ value: "Task A", priority: 3 }
```

### Operations

* `insert(element)` adds an element and restores heap order
* `extractMin()` removes the smallest-priority element
* `peekMin()` returns the smallest-priority element
* `isEmpty()` checks if the heap is empty

### Edge case handled

* extracting or peeking from an empty priority queue throws an error

### Complexity

* `insert()` → `O(log n)`
* `extractMin()` → `O(log n)`
* `peekMin()` → `O(1)`
* `isEmpty()` → `O(1)`

### Trade-off

This is the most efficient general-purpose priority queue implementation because both insertion and removal are efficient. It is ideal when many inserts and removals happen frequently.

---

## 4. Ordered Array-based Priority Queue

This implementation keeps the array sorted by priority at all times.

The minimum priority element is always at the front of the array.

### Operations

* `insert(element)` places the element in the correct position
* `extractMin()` removes the first element
* `peekMin()` returns the first element
* `isEmpty()` checks if the array is empty

### Edge case handled

* extracting or peeking from an empty priority queue throws an error

### Complexity

* `insert()` → `O(n)`
* `extractMin()` → `O(n)` in JavaScript because `shift()` moves elements
* `peekMin()` → `O(1)`
* `isEmpty()` → `O(1)`

### Trade-off

This approach is simpler to understand, but it is less efficient than a heap for large datasets because insertion and extraction may require shifting many elements.

---

## Comparison and Trade-offs

## Queue Comparison

| Feature       | Array-based Queue | Linked List-based Queue |
| ------------- | ----------------- | ----------------------- |
| Size          | Fixed             | Dynamic                 |
| Enqueue       | O(1)              | O(1)                    |
| Dequeue       | O(1)              | O(1)                    |
| Peek          | O(1)              | O(1)                    |
| Memory        | Lower overhead    | Extra pointer memory    |
| Best use case | Known capacity    | Unknown/changing size   |

### Summary

* Use the **array-based queue** when the maximum size is known and fixed.
* Use the **linked list-based queue** when the queue size changes often and flexibility is more important.

---

## Priority Queue Comparison

| Feature     | Min-Heap PQ | Ordered Array PQ |
| ----------- | ----------- | ---------------- |
| Insert      | O(log n)    | O(n)             |
| Extract Min | O(log n)    | O(n)             |
| Peek Min    | O(1)        | O(1)             |
| Scalability | Better      | Worse            |
| Simplicity  | Moderate    | Very simple      |

### Summary

* Use the **min-heap priority queue** when performance matters and many operations are expected.
* Use the **ordered array priority queue** for small datasets or simpler learning examples.

---

## Conclusion

In this checkpoint, I implemented two queue variations and two priority queue variations in JavaScript. The array-based queue is efficient but limited by fixed size, while the linked list-based queue is more flexible. For priority queues, the min-heap implementation is more efficient and scalable, while the ordered array implementation is easier to understand but slower for large inputs. These trade-offs show how the choice of data structure depends on the problem requirements, expected input size, and performance needs.

