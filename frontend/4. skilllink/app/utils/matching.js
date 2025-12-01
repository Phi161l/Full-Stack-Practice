// // Build a graph where each user is a node
// // Edge exists if: "A wants something B can teach and vice versa"

export function buildGraph(users) {
  const graph = {};

  for (const u of users) {
    graph[u.name] = [];
  }

  for (const a of users) {
    for (const b of users) {
      if (a.name === b.name) continue;

      const aWantsBTeaches = a.wantToLearn.some(skill =>
        b.canTeach.includes(skill)
      );

      const bWantsATeaches = b.wantToLearn.some(skill =>
        a.canTeach.includes(skill)
      );
      
      if (aWantsBTeaches && bWantsATeaches) {
        graph[a.name].push(b.name);
      }
    }
  }

  console.log(graph)

  return graph;
}




// BFS to find closest matching users
export function bfsMatches(startUser, graph, users) {
  const visited = new Set();
  const queue = [startUser];
  const matches = [];

  const usersMap = Object.fromEntries(users.map(u => [u.name, u]));


  visited.add(startUser);

  while (queue.length > 0) {
    const current = queue.shift();

    for (let neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        matches.push(usersMap[neighbor]);
      }
    }
  }

  return matches;
}