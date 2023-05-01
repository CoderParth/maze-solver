import React, { useMemo, useState } from "react"
import createMaze from "@/mazeUtils/mazeGenerator"
import Maze from "./Maze"
import { bfs, dfs } from "@/mazeUtils/shortestPathAlgorithms"

type CellCoords = {
  x: number
  y: number
}

function MazeSolver() {
  const numRows = 10
  const numCols = 27

  const [startPoint, setStartPoint] = useState<CellCoords | null>(null)
  const [endPoint, setEndPoint] = useState<CellCoords | null>(null)

  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs">("bfs")
  const [pointsSet, setPointsSet] = useState(false)

  const maze = useMemo(() => createMaze(numRows, numCols), [numRows, numCols])

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAlgorithm(event.target.value as "bfs" | "dfs")
  }

  const handleCellClick = (row: number, col: number) => {
    if (!pointsSet) {
      if (!startPoint) {
        setStartPoint({ x: col, y: row }) // Update to use CellCoords
      } else if (!endPoint) {
        setEndPoint({ x: col, y: row }) // Update to use CellCoords
        setPointsSet(true)
      }
    }
  }

  const handleStartClick = () => {
    if (startPoint && endPoint) {
      const pathFinder = algorithm === "bfs" ? bfs : dfs
      const path = pathFinder(maze, startPoint, endPoint)
      console.log(path)
      // Update the maze with the path
    }
  }

  const handleResetClick = () => {
    setStartPoint(null)
    setEndPoint(null)
    setPointsSet(false)
    // Reset the maze
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <label htmlFor="algorithm-select" className="mr-2">
              Select algorithm:
            </label>
            <select
              id="algorithm-select"
              onChange={handleAlgorithmChange}
              className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="bfs">Breadth-First Search</option>
              <option value="dfs">Depth-First Search</option>
            </select>
            <button
              id="start-button"
              onClick={handleStartClick}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start
            </button>
            <button
              id="reset-button"
              onClick={handleResetClick}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div id="maze" className="h-96">
            <Maze
              maze={maze}
              startPoint={startPoint}
              endPoint={endPoint}
              handleCellClick={handleCellClick}
            />
          </div>
        </div>
        <div className="py-4">
          <p>
            First select the algorithm. Then click on a white cell to create the
            starting point. Click again to create the end point. After that
            click on "Start" button. Maze will be solved. Press reset to clear
            the maze.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MazeSolver
