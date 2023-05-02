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
  const [path, setPath] = useState<CellCoords[]>([])
  const [showDialog, setShowDialog] = useState(false)

  const [mazeVersion, setMazeVersion] = useState(0)
  const maze = useMemo(
    () => createMaze(numRows, numCols),
    [numRows, numCols, mazeVersion]
  )

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAlgorithm(event.target.value as "bfs" | "dfs")
  }

  const handleCellClick = (row: number, col: number) => {
    if (!pointsSet) {
      if (!startPoint) {
        setStartPoint({ x: col, y: row })
      } else if (!endPoint) {
        setEndPoint({ x: col, y: row })
        setPointsSet(true)
      }
    } else {
      const isStartPoint =
        startPoint && startPoint.x === col && startPoint.y === row
      const isEndPoint = endPoint && endPoint.x === col && endPoint.y === row

      if (isStartPoint) {
        setStartPoint(null)
      } else if (isEndPoint) {
        setEndPoint(null)
        setPointsSet(false)
      }
    }
  }

  const handleStartClick = () => {
    if (startPoint && endPoint) {
      const pathFinder = algorithm === "bfs" ? bfs : dfs
      const foundPath = pathFinder(maze, startPoint, endPoint)
      console.log(foundPath)
      setPath(foundPath)

      if (foundPath.length === 0) {
        setShowDialog(true)
      } else {
        setShowDialog(false)
      }
    }
  }

  const handleResetClick = () => {
    setStartPoint(null)
    setEndPoint(null)
    setPath([])
    setPointsSet(false)
    setMazeVersion((prevVersion) => prevVersion + 1) // Generate a new maze
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
              path={path}
            />
          </div>
        </div>
        <div className="py-4">
          <ol>
            <li>Select the desired algorithm from the dropdown menu.</li>
            <li>Click on a white cell to set the starting point.</li>
            <li>Click on another white cell to set the end point.</li>
            <li>Press the "Start" button to solve the maze.</li>
            <li>
              To compare results, change the algorithm from the dropdown menu
              and press "Start" again.
            </li>
            <li>
              If you wish to clear the maze and start over, press the "Reset"
              button.
            </li>
          </ol>
        </div>
      </div>
      {showDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Path not found
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    The algorithm couldn't find a path between the start and end
                    points.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MazeSolver
