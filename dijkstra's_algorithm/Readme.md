# Applied Algorithms in Software Development

## Checkpoint: Implementing Dijkstra's Algorithm in JavaScript

## Objective

The objective of this assignment is to implement **Dijkstra's Algorithm** in JavaScript to find the shortest path from a starting vertex to all other vertices in a weighted graph.

This algorithm is widely used in real-world systems such as:

- GPS navigation
- network routing
- pathfinding in games
- shortest-cost delivery systems

---

## Problem Description

We are given a weighted graph represented as an object.

Each key is a vertex, and its value is another object containing neighboring vertices and edge weights.

Example:

```javascript
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};
```


The task is to write a function:

```javascript
dijkstra(graph, start);
```

This function should return the shortest distance from the starting vertex to every other vertex.

---

## Solution

```javascript
// Dijkstra's Algorithm in JavaScript
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();

  // Initialize all distances as Infinity
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }

  // Distance to start node is 0
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let currentVertex = null;
    let shortestDistance = Infinity;

    // Find the unvisited vertex with the smallest distance
    for (const vertex in distances) {
      if (!visited.has(vertex) && distances[vertex] < shortestDistance) {
        shortestDistance = distances[vertex];
        currentVertex = vertex;
      }
    }

    // If no reachable unvisited vertex remains, stop
    if (currentVertex === null) {
      break;
    }

    // Mark current vertex as visited
    visited.add(currentVertex);

    // Update distances to neighboring vertices
    for (const neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor];
      const newDistance = distances[currentVertex] + weight;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }

  return distances;
}

// Example graph
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};

// Run the algorithm
const result = dijkstra(graph, "A");
console.log("Shortest distances from A:");
console.log(result);
```

---

## Explanation of the Code

### 1. Initialize Distances

The algorithm starts by assigning all vertices a distance of `Infinity`.

This means we do not yet know the shortest path to them.

```javascript
for (const vertex in graph) {
  distances[vertex] = Infinity;
}
```

Then the starting vertex is assigned distance `0` because the distance from the start node to itself is zero.

```javascript
distances[start] = 0;
```

---

### 2. Track Visited Vertices

A `Set` named `visited` is used to keep track of vertices that have already been processed.

```javascript
const visited = new Set();
```

This ensures that each vertex is finalized only once.

---

### 3. Choose the Closest Unvisited Vertex

The algorithm repeatedly selects the unvisited vertex with the smallest known distance.

```javascript
for (const vertex in distances) {
  if (!visited.has(vertex) && distances[vertex] < shortestDistance) {
    shortestDistance = distances[vertex];
    currentVertex = vertex;
  }
}
```

This is the core idea of Dijkstra’s Algorithm.

---

### 4. Update Neighbor Distances

Once the closest vertex is chosen, the algorithm checks all its neighbors and updates their distances if a shorter path is found.

```javascript
for (const neighbor in graph[currentVertex]) {
  const weight = graph[currentVertex][neighbor];
  const newDistance = distances[currentVertex] + weight;

  if (newDistance < distances[neighbor]) {
    distances[neighbor] = newDistance;
  }
}
```

---

## Example Walkthrough

Starting from vertex `A`:

- Distance to `A` = `0`
- Distance to `B` = `4`
- Distance to `C` = `2`
- Distance to `D` = `5`

Why is `D = 5`?

Because the shortest route is:

```text
A -> C -> D
```

And the cost is:

```text
2 + 3 = 5
```

---

## Expected Output

```javascript
{
  A: 0,
  B: 4,
  C: 2,
  D: 5
}
```

---

## Sample Console Output

```text
Shortest distances from A:
{ A: 0, B: 4, C: 2, D: 5 }
```

---

## Complexity Analysis

### Time Complexity

This implementation uses a simple loop to find the smallest unvisited vertex.

- Finding the smallest vertex each time: `O(V)`
- Doing this for all vertices: `O(V^2)`
- Updating neighbors contributes additional edge checks

Overall time complexity:

```text
O(V^2 + E)
```

This is often simplified to:

```text
O(V^2)
```

for this implementation.

---

### Space Complexity

The algorithm stores:

- `distances` object
- `visited` set

So the space complexity is:

```text
O(V)
```

---

## Why This Solution Works

Dijkstra’s Algorithm works because it always expands the currently shortest known path first.

Since all edge weights are non-negative, once a node is selected as the smallest unvisited vertex, its shortest distance is guaranteed to be correct.

---

## Conclusion

In this assignment, I implemented Dijkstra’s Algorithm in JavaScript to calculate the shortest distances from a starting vertex to all other vertices in a weighted graph. The graph was represented using an object of objects, and the algorithm successfully computed the correct shortest distances. This project demonstrates how graph algorithms can be applied in real-world software development problems such as routing and navigation.

