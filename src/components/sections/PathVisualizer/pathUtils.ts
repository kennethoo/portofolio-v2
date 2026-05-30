export interface GridNode {
  key: string
  row: number
  col: number
  isActive: boolean
  isStartNode: boolean
  isEndGoal: boolean
  isVisited: boolean
  delayTransition: number
  zIndex: number
  isOb: boolean
  lightPath: boolean
}

export type Coord = [number, number]

export const CELL_BASE = 50

/** Same layout logic as the original Portofolio site. */
export function calculateBestLayout(
  screenWidth: number,
  screenHeight: number,
  cellWidth = CELL_BASE,
  cellHeight = CELL_BASE,
) {
  const rows = Math.floor(screenHeight / cellHeight) - 1
  const cols = Math.floor(screenWidth / cellWidth) - 1

  return {
    rows: Math.max(rows, 5),
    cols: Math.max(cols, 5),
  }
}

/** Shrink cells so the full grid fits inside the container width. */
export function fitCellSize(cols: number, containerWidth: number, baseSize = CELL_BASE) {
  if (!containerWidth || cols <= 0) return baseSize

  const available = containerWidth - 32
  const maxFit = Math.floor(available / cols)

  if (maxFit >= baseSize) return baseSize

  return Math.max(24, maxFit)
}

export function buildMatrix(rows: number, cols: number): GridNode[][] {
  const matrix: GridNode[][] = []
  for (let nRow = 0; nRow < rows; nRow++) {
    matrix[nRow] = []
    for (let nCol = 0; nCol < cols; nCol++) {
      matrix[nRow][nCol] = {
        key: `${nRow},${nCol}`,
        row: nRow,
        col: nCol,
        isActive: false,
        isStartNode: false,
        isEndGoal: false,
        isVisited: false,
        delayTransition: 0,
        zIndex: 0,
        isOb: false,
        lightPath: false,
      }
    }
  }
  return matrix
}

export function isInBound(row: number, col: number, grid: GridNode[][]): boolean {
  if (row < 0 || row >= grid.length) return false
  if (col < 0 || col >= grid[0].length) return false
  return true
}
