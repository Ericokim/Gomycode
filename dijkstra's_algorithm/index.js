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
  D: { B: 10, C: 3 }
};

// Run the algorithm
const result = dijkstra(graph, "A");
console.log("Shortest distances from A:");
console.log(result);