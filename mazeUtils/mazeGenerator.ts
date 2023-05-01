function createMaze(numRows: number, numCols: number) {
  const maze: { isWall: boolean; x: number; y: number }[][] = []
  for (let y = 0; y < numRows; y++) {
    const row = []
    for (let x = 0; x < numCols; x++) {
      const randNum = Math.floor(Math.random() * 2)
      row.push({ isWall: randNum === 1, x, y })
    }
    maze.push(row)
  }

  return maze
}

export default createMaze
