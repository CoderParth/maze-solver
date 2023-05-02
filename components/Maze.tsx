import React, { useState } from "react"

type CellCoords = {
  x: number
  y: number
}

type Props = {
  maze: { isWall: boolean; x: number; y: number }[][]
  startPoint: CellCoords | null
  endPoint: CellCoords | null
  handleCellClick: (row: number, col: number) => void
  path: CellCoords[]
}

const Maze = ({ maze, startPoint, endPoint, handleCellClick, path }: Props) => {
  const [pointsSet, setPointsSet] = useState(false)

  const handleClick = (row: number, col: number) => {
    if (!maze[row][col].isWall) {
      handleCellClick(row, col)
    }
  }

  const isPathCell = (x: number, y: number) => {
    return path?.some((cell) => cell.x === x && cell.y === y)
  }

  return (
    <div
      key={pointsSet ? "maze-solved" : "maze-unsolved"}
      className={`grid w-auto grid-cols-${maze[0].length} gap-1`}
      style={{
        gridTemplateColumns: `repeat(${maze[0].length}, minmax(0, 1fr))`,
      }}
    >
      {maze.map((row, y) =>
        row.map((cell, x) => {
          const isStartPoint =
            startPoint && startPoint.x === x && startPoint.y === y
          const isEndPoint = endPoint && endPoint.x === x && endPoint.y === y
          const cellClass = cell.isWall
            ? "bg-black"
            : isStartPoint
            ? "bg-green-400"
            : isEndPoint
            ? "bg-red-400"
            : isPathCell(x, y)
            ? "bg-green-200"
            : "bg-gray-200"

          return (
            <div
              key={`${x}-${y}`}
              className={`h-6 w-6 ${cellClass}`}
              data-x={x}
              data-y={y}
              onClick={() => handleClick(y, x)}
              suppressHydrationWarning={true}
            />
          )
        })
      )}
    </div>
  )
}

export default Maze
