# Network Cable Optimization

This project uses **Kruskal’s Algorithm** to find the **Minimum Spanning Tree (MST)** of a network.

The goal is to connect all computers using the **lowest total cable cost** without creating loops.

---

## Problem

Each computer is represented as a **vertex**.

Each possible cable connection is represented as an **edge** with a **weight**.

The weight shows the cable cost or length.

The task is to:

- connect all computers
- avoid cycles
- minimize the total cost

---

## Features

- Represent computers as vertices
- Represent cable connections as weighted edges
- Build the MST using **Kruskal’s Algorithm**
- Use **Union-Find** to avoid cycles
- Output the selected edges
- Output the total network cost

---

## Algorithm Used

### Kruskal’s Algorithm

Kruskal’s Algorithm works by:

1. Sorting all edges by weight
2. Picking the smallest edge first
3. Adding it only if it does not create a cycle
4. Repeating until all computers are connected

### Union-Find

Union-Find helps check whether adding an edge would create a cycle.

It uses:

- `find()` to locate the parent set of a vertex
- `union()` to join two sets

---

## Example Code

```javascript
class DisjointSet {
  constructor(vertices) {
    this.parent = {};
    this.rank = {};

    for (const vertex of vertices) {
      this.parent[vertex] = vertex;
      this.rank[vertex] = 0;
    }
  }

  find(vertex) {
    if (this.parent[vertex] !== vertex) {
      this.parent[vertex] = this.find(this.parent[vertex]);
    }
    return this.parent[vertex];
  }

  union(vertex1, vertex2) {
    const root1 = this.find(vertex1);
    const root2 = this.find(vertex2);

    if (root1 === root2) return false;

    if (this.rank[root1] < this.rank[root2]) {
      this.parent[root1] = root2;
    } else if (this.rank[root1] > this.rank[root2]) {
      this.parent[root2] = root1;
    } else {
      this.parent[root2] = root1;
      this.rank[root1]++;
    }

    return true;
  }
}

class Graph {
  constructor() {
    this.vertices = new Set();
    this.edges = [];
  }

  addEdge(source, destination, weight) {
    this.vertices.add(source);
    this.vertices.add(destination);
    this.edges.push({ source, destination, weight });
  }

  kruskalMST() {
    const sortedEdges = [...this.edges].sort((a, b) => a.weight - b.weight);
    const disjointSet = new DisjointSet([...this.vertices]);

    const mst = [];
    let totalCost = 0;

    for (const edge of sortedEdges) {
      const { source, destination, weight } = edge;

      if (disjointSet.union(source, destination)) {
        mst.push(edge);
        totalCost += weight;
      }

      if (mst.length === this.vertices.size - 1) break;
    }

    return { mst, totalCost };
  }
}

const graph = new Graph();

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 3);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 2);
graph.addEdge("C", "D", 4);
graph.addEdge("C", "E", 5);
graph.addEdge("D", "E", 1);

const result = graph.kruskalMST();

console.log("Selected Connections in MST:");
result.mst.forEach((edge) => {
  console.log(`${edge.source} - ${edge.destination} : ${edge.weight}`);
});

console.log("Total Cost of Network:", result.totalCost);


---

## Sample Output

```text
Selected Connections in MST:
B - C : 1
D - E : 1
B - D : 2
A - C : 3
Total Cost of Network: 7
```

---

## Complexity

### Time Complexity

* Sorting edges: `O(E log E)`
* Overall: `O(E log E)`

### Space Complexity

* `O(V + E)`

Where:

* `V` = number of vertices
* `E` = number of edges

---

## How to Run

Save the code in a file called `index.js`, then run:

```bash
node index.js
```

You can also run it on:

* OneCompiler
* Programiz
* Replit

---

## Conclusion

This project shows how to optimize a network cable layout using graph algorithms.
By applying **Kruskal’s Algorithm** and **Union-Find**, the network is built with the minimum total cost and no loops.


