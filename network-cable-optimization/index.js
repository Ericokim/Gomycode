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

// Example usage
const graph = new Graph();

// Add cable connections: Computer1, Computer2, Cost
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
