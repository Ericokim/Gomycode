# Data Structures - Advanced Data Structures

## Graph Basics and Traversal

### Objective

The aim of this assignment is to implement a graph in JavaScript using an adjacency list. The graph should support basic operations such as adding edges, removing edges, checking whether an edge exists, and printing the graph. In addition, the graph should support traversal using both Depth-First Search (DFS) and Breadth-First Search (BFS). The solution should work for both directed and undirected graphs.

---

## Explanation of the Code

### 1. Graph Representation

The graph is represented using an **adjacency list**.
This means each vertex stores a list of its neighboring vertices.

Example:

```javascript
{
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"]
}
```

This is efficient because it only stores existing connections.

### 2. addVertex(vertex)

This method adds a new vertex to the graph only if it does not already exist.

### 3. addEdge(vertex1, vertex2)

This method creates a connection between two vertices.

* In an **undirected graph**, both vertices point to each other.
* In a **directed graph**, only the first vertex points to the second.

### 4. removeEdge(vertex1, vertex2)

This method removes a connection between two vertices.

* In an undirected graph, the edge is removed from both sides.
* In a directed graph, only one direction is removed.

### 5. hasEdge(vertex1, vertex2)

This method checks whether an edge exists between two vertices.

### 6. printGraph()

This method displays all vertices and their neighbors.

### 7. DFS (Depth-First Search)

DFS explores as far as possible along one branch before backtracking.

Example order:
`A -> B -> D -> C`

### 8. BFS (Breadth-First Search)

BFS explores neighbors level by level.

Example order:
`A -> B -> C -> D`

---

## Sample Output

```text
UNDIRECTED GRAPH
Graph:
A -> B, C
B -> A, D
C -> A
D -> B
Has edge A-B: true
Has edge A-D: false
DFS Traversal: A -> B -> D -> C
BFS Traversal: A -> B -> C -> D

After removing edge A-C:
Graph:
A -> B
B -> A, D
C ->
D -> B

DIRECTED GRAPH
Graph:
1 -> 2, 3
2 -> 4
3 ->
4 ->
Has edge 1-2: true
Has edge 2-1: false
DFS Traversal: 1 -> 2 -> 4 -> 3
BFS Traversal: 1 -> 2 -> 3 -> 4
```

---

## Correctness

The program satisfies the assignment requirements because it:

* implements a `Graph` class
* supports adding and removing edges
* checks whether an edge exists
* prints the graph
* implements both DFS and BFS
* works for both directed and undirected graphs
* tests the graph with more than 3 vertices

---

## Conclusion

In this assignment, I implemented a graph in JavaScript using an adjacency list. I added methods for creating edges, removing edges, checking connections, and printing the graph. I also implemented DFS and BFS traversal methods and tested them on both undirected and directed graphs. This shows how graphs can be represented and traversed efficiently in JavaScript.

---
