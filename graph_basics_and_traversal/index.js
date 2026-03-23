class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.adjacencyList = {};
  }

  // Add a vertex if it does not already exist
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add an edge between two vertices
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    if (!this.adjacencyList[vertex1].includes(vertex2)) {
      this.adjacencyList[vertex1].push(vertex2);
    }

    if (!this.isDirected) {
      if (!this.adjacencyList[vertex2].includes(vertex1)) {
        this.adjacencyList[vertex2].push(vertex1);
      }
    }
  }

  // Remove an edge between two vertices
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (v) => v !== vertex2
      );
    }

    if (!this.isDirected && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (v) => v !== vertex1
      );
    }
  }

  // Check if an edge exists
  hasEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) return false;

    if (this.isDirected) {
      return this.adjacencyList[vertex1].includes(vertex2);
    }

    return (
      this.adjacencyList[vertex1].includes(vertex2) &&
      this.adjacencyList[vertex2]?.includes(vertex1)
    );
  }

  // Print the graph
  printGraph() {
    console.log("Graph:");
    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
    }
  }

  // Depth-First Search
  dfs(startVertex) {
    const visited = new Set();
    const result = [];

    const dfsHelper = (vertex) => {
      if (!vertex || visited.has(vertex)) return;

      visited.add(vertex);
      result.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(startVertex);
    console.log("DFS Traversal:", result.join(" -> "));
    return result;
  }

  // Breadth-First Search
  bfs(startVertex) {
    const visited = new Set();
    const queue = [];
    const result = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    console.log("BFS Traversal:", result.join(" -> "));
    return result;
  }
}

// -------------------------
// TESTING UNDIRECTED GRAPH
// -------------------------
console.log("UNDIRECTED GRAPH");
const graph = new Graph(false);

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

graph.printGraph();

console.log("Has edge A-B:", graph.hasEdge("A", "B"));
console.log("Has edge A-D:", graph.hasEdge("A", "D"));

graph.dfs("A");
graph.bfs("A");

graph.removeEdge("A", "C");
console.log("\nAfter removing edge A-C:");
graph.printGraph();

// -------------------------
// TESTING DIRECTED GRAPH
// -------------------------
console.log("\nDIRECTED GRAPH");
const directedGraph = new Graph(true);

directedGraph.addEdge("1", "2");
directedGraph.addEdge("1", "3");
directedGraph.addEdge("2", "4");

directedGraph.printGraph();

console.log("Has edge 1-2:", directedGraph.hasEdge("1", "2"));
console.log("Has edge 2-1:", directedGraph.hasEdge("2", "1"));

directedGraph.dfs("1");
directedGraph.bfs("1");