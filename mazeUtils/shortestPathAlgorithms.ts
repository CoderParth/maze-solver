type CellCoords = {
  x: number
  y: number
}

type Cell = {
  x: number
  y: number
  isWall: boolean
}

function getNeighbors(maze: Cell[][], cell: CellCoords): CellCoords[] {
  const neighbors: CellCoords[] = []
  const { x, y } = cell

  if (x > 0 && !maze[y][x - 1].isWall) {
    neighbors.push({ x: x - 1, y })
  }
  if (x < maze[0].length - 1 && !maze[y][x + 1].isWall) {
    neighbors.push({ x: x + 1, y })
  }
  if (y > 0 && !maze[y - 1][x].isWall) {
    neighbors.push({ x, y: y - 1 })
  }
  if (y < maze.length - 1 && !maze[y + 1][x].isWall) {
    neighbors.push({ x, y: y + 1 })
  }

  return neighbors
}

function bfs(
  maze: Cell[][],
  startPoint: CellCoords,
  endPoint: CellCoords
): CellCoords[] {
  const queue: CellCoords[] = [startPoint]
  const visited = new Map<string, CellCoords | null>()
  visited.set(JSON.stringify(startPoint), null)

  while (queue.length > 0) {
    const cell = queue.shift()!
    if (JSON.stringify(cell) === JSON.stringify(endPoint)) {
      const shortestPath: CellCoords[] = [cell]
      let parent: CellCoords | null | undefined = visited.get(
        JSON.stringify(cell)
      )
      while (parent) {
        shortestPath.push(parent)
        parent = visited.get(JSON.stringify(parent)) ?? null
      }
      return shortestPath.reverse()
    }
    const neighbors = getNeighbors(maze, cell)
    neighbors.forEach((neighbor) => {
      if (!visited.has(JSON.stringify(neighbor))) {
        queue.push(neighbor)
        visited.set(JSON.stringify(neighbor), cell)
      }
    })
  }

  return []
}

function dfs(
  maze: Cell[][],
  startPoint: CellCoords,
  endPoint: CellCoords
): CellCoords[] {
  const stack: CellCoords[] = [startPoint]
  const visited = new Map<string, CellCoords | null>()
  visited.set(JSON.stringify(startPoint), null)

  while (stack.length > 0) {
    const cell = stack.pop()!
    if (JSON.stringify(cell) === JSON.stringify(endPoint)) {
      const shortestPath: CellCoords[] = [cell]
      let parent: CellCoords | null | undefined = visited.get(
        JSON.stringify(cell)
      )
      while (parent) {
        shortestPath.push(parent)
        parent = visited.get(JSON.stringify(parent)) ?? null
      }
      return shortestPath.reverse()
    }
    const neighbors = getNeighbors(maze, cell)
    neighbors.forEach((neighbor) => {
      if (!visited.has(JSON.stringify(neighbor))) {
        stack.push(neighbor)
        visited.set(JSON.stringify(neighbor), cell)
      }
    })
  }

  return []
}

export { bfs, dfs }
