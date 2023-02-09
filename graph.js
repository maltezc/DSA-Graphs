/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, visited = new Set([start])) {
    for (let neighbour of start.adjacent) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        this.depthFirstSearch(neighbour, visited);
      }
    }
    return Array.from(visited).map((v) => v.value);
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let visited = new Set(toVisitQueue);

    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();

      for (let neighbour of currNode.adjacent) {
        if (!visited.has(neighbour)) {
          toVisitQueue.push(neighbour);
          visited.add(neighbour);
        }
      }
    }
    return Array.from(visited).map((v) => v.value);
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let toVisitQueue = [start];
    let visited = new Set (toVisitQueue);
    let path = [start]
  }
}

module.exports = { Graph, Node };
