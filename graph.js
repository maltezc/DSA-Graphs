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

  /*
  depthFirstSearch(start, visited = new Set([start])) {
    for (let neighbour of start.adjacent) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        this.depthFirstSearch(neighbour, visited);
      }
    }
    return Array.from(visited).map((v) => v.value);
  } */

  /** find the distance of the shortest path from the start vertex to the end vertex */
  // distanceOfShortestPath(
  //   start,
  //   end,
  //   visited = new Set([start]),
  //   shortestRoute,
  //   route
  // ) {
  //   let toVisitQueue = [start];
  //   let route = [start];
  //   let current = start;

  //   let shortestRoute = [];

  //   if (current.adjacent.size !== 0) {
  //     /* continue going / append to path*/
  //     for (let neighbour of start.adjacent) {
  //       if (!visited.has(neighbour)) {
  //         visited.add(neighbour);

  //         if (this.distanceOfShortestPath(neighbour, visited)) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return shortestRoute.length;
  // }

  // out put: length of shortest path from start to end
  /* distanceOfShortestPath(start, end) {
    // create a queue where start is in the queue
    // current node = start
    // current route = []
    // shortest route length

    // while tovisitqueue > 0
    // iterate through ajacent neighbours,
    // remove current node from queue,
    // add neighbours to visited set,
    // add neighbours to toVisit queue
    // add current neighbour to route

    // if current node == end ,
    // check to see if route length < shortestroutelength ||
    // if shortest route length === null then set shortest route length to route length
    let current = start;
    let currentRoute = [current];
    let shortestRouteLength = null;

    let toVisitQueue = [start];
    let visited = new Set(toVisitQueue);
    // BFS
    // need to track previous node and all nodes that we've seen.
    // object with key of vertex and value of previous one that we have seen.
    // once you have reached end, turn into the path.
    // make sure you dont hit same index

    while (toVisitQueue.length > 0) {
      current = toVisitQueue.shift();

      for (let neighbour of current.adjacent) {
        if (!visited.has(neighbour)) {
          visited.add(neighbour);
          toVisitQueue.push(neighbour);
          currentRoute.push(neighbour); // bug

        }
        if (current === end) {
          if (
            shortestRouteLength === null ||
            currentRoute.length < shortestRouteLength
          ) {
            shortestRouteLength = currentRoute.length;
          }
        }
      }
    }

    return shortestRouteLength;
  } */

  // start
  // end
  // visited
  // shortestRouteFoundThusFar

  distanceOfShortestPathNew(
    start,
    end,
    visited = new Set([start]),
    currentCountRoute = 0,
    shortestRouteFoundThusFar = 0
  ) {
    // for loop here
    for (let neighbour of start.adjacent) {
      // if not visited yet,
      if (!visited.has(neighbour)) {
        // if value is what we're looking for || there are no children,
        if (neighbour === end) {
          // if (start === end) {
          if (
            currentCountRoute < shortestRouteFoundThusFar ||
            shortestRouteFoundThusFar === 0
          ) {
            shortestRouteFoundThusFar = currentCountRoute;
            currentCountRoute = 0;
            // add path to visited
          }
        }
        if (start.adjacent.size === 0) {
          currentCountRoute = 0;
        }
        /* if (start === end || start.adjacent.size === 0) {
          //    compare this path to shortest & zero out count route
          if (currentCountRoute < shortestRouteFoundThusFar) {
            //    if shorter, replace value.
            shortestRouteFoundThusFar = currentCountRoute;
          }
          currentCountRoute = 0;
        } */
        // add to visited,
        visited.add(neighbour);

        // increment current count route
        currentCountRoute++;

        // and recurse
        this.distanceOfShortestPathNew(
          neighbour,
          end,
          visited,
          currentCountRoute,
          shortestRouteFoundThusFar
        );
      }
      // end of for loop
    }

    // return shortest value at the end.
    return shortestRouteFoundThusFar;
  }

  distanceOfShortestPathNew(
    start,
    end,
    ogStart,
    visited = new Set([start]),
    currentCountRoute = new Set([start]),
    shortestRouteFoundThusFar = new Set()
  ) {
    // for loop here
    for (let neighbour of start.adjacent) {
      // if path not visited yet,
      // if index(1) is not in any visited[1]
      if (!visited.has(neighbour)) {
        // if value is what we're looking for || there are no children,
        if (neighbour === end) {
          // if (start === end) {
          if (
            currentCountRoute < shortestRouteFoundThusFar ||
            shortestRouteFoundThusFar === 0
          ) {
            shortestRouteFoundThusFar = currentCountRoute;
            currentCountRoute = 0;
            // add path to visited
            // reset start to R
          }
        }
        if (start.adjacent.size === 0) {
          currentCountRoute = 0;
        }

        // add path to visited,
        visited.add(neighbour);

        // increment current count route
        currentCountRoute++;

        // and recurse
        this.distanceOfShortestPathNew(
          neighbour,
          end,
          ogStart,
          visited,
          currentCountRoute,
          shortestRouteFoundThusFar
        );
      }
      // end of for loop
    }

    // return shortest value at the end.
    return shortestRouteFoundThusFar;
  }
}

module.exports = { Graph, Node };
