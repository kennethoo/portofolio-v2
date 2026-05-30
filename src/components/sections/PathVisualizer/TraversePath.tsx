import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { BiLocationPlus, BiTargetLock } from 'react-icons/bi'
import {
  buildMatrix,
  isInBound,
  type Coord,
  type GridNode,
} from './pathUtils'

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`

const ControlButton = styled.button<{ $primary?: boolean; $active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s;
  touch-action: manipulation;
  min-width: 88px;

  ${({ $active, $primary, theme }) => {
    if ($active || $primary) {
      return css`
        background: rgba(8, 145, 178, 0.1);
        border: 1px solid ${theme.colors.cyan};
        color: ${theme.colors.cyan};
        box-shadow: ${theme.shadows.glow};

        &:hover {
          background: rgba(8, 145, 178, 0.16);
        }
      `
    }

    return css`
      background: ${theme.colors.bg};
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.textMuted};

      &:hover {
        border-color: ${theme.colors.borderHover};
        color: ${theme.colors.text};
      }
    `
  }}
`

const GridPanel = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 10px;
  overflow: auto;
  max-height: min(70vh, 720px);
  -webkit-overflow-scrolling: touch;
  background: ${({ theme }) => theme.colors.terminalBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-image:
    linear-gradient(rgba(8, 145, 178, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(8, 145, 178, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px;
    max-height: min(75vh, 820px);
  }
`

const Board = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
`

const Row = styled.div`
  display: flex;
  width: 100%;
`

const Cell = styled.div<{
  $size: number
  $variant: 'default' | 'start' | 'end' | 'active' | 'obstacle' | 'path'
  $delay?: number
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background-color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
  transition-delay: ${({ $delay }) => ($delay !== undefined ? `${$delay}ms` : '0ms')};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 52%;
    height: 52%;
  }

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'start':
        return css`
          background: linear-gradient(135deg, ${theme.colors.cyan}, ${theme.colors.purple});
          border: 1px solid ${theme.colors.cyan};
          color: #ffffff;
          box-shadow: 0 0 12px rgba(8, 145, 178, 0.25);
        `
      case 'end':
        return css`
          background: ${theme.colors.green};
          border: 1px solid rgba(5, 150, 105, 0.5);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(5, 150, 105, 0.2);
        `
      case 'active':
        return css`
          background: rgba(124, 58, 237, 0.35);
          border: 1px solid rgba(124, 58, 237, 0.45);
          color: ${theme.colors.purple};
        `
      case 'obstacle':
        return css`
          background: rgba(217, 119, 6, 0.2);
          border: 1px solid rgba(217, 119, 6, 0.45);
          border-radius: 50%;
          color: ${theme.colors.amber};
        `
      case 'path':
        return css`
          background: rgba(8, 145, 178, 0.25);
          border: 1px solid ${theme.colors.cyan};
          color: ${theme.colors.cyan};
          box-shadow: inset 0 0 8px rgba(8, 145, 178, 0.15);
        `
      default:
        return css`
          background: ${theme.colors.bg};
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.textDim};

          &:hover {
            border-color: ${theme.colors.borderHover};
            background: rgba(8, 145, 178, 0.04);
          }
        `
    }
  }}
`

interface TraversePathProps {
  rows: number
  cols: number
  cellSize: number
}

export function TraversePath({ rows, cols, cellSize }: TraversePathProps) {
  const [isTraverseBegin, setIsTraverseBegin] = useState(false)
  const [beginNode, setBeginNode] = useState<Coord | null>(null)
  const [matrix, setMatrix] = useState<GridNode[][]>(() => buildMatrix(rows, cols))
  const [endNode, setEndNode] = useState<Coord | null>(null)
  const [isBfs, setIsBfs] = useState(false)
  const [isDfs, setIsDfs] = useState(false)

  const boardWidth = cols * cellSize

  const handleClick = (row: number, col: number) => {
    if (isTraverseBegin) return
    const { isEndGoal, isStartNode, isOb } = matrix[row][col]

    if (isStartNode) {
      const newMatrix = matrix.slice()
      newMatrix[row][col].isStartNode = false
      setMatrix(newMatrix)
      setBeginNode(null)
    } else if (isEndGoal) {
      const newMatrix = matrix.slice()
      newMatrix[row][col].isEndGoal = false
      setMatrix(newMatrix)
      setEndNode(null)
    } else if (!beginNode && !isOb) {
      const newMatrix = matrix.slice()
      newMatrix[row][col].isStartNode = true
      setMatrix(newMatrix)
      setBeginNode([row, col])
    } else if (!endNode && !isOb) {
      const newMatrix = matrix.slice()
      newMatrix[row][col].isEndGoal = true
      setMatrix(newMatrix)
      setEndNode([row, col])
    } else if (isOb) {
      const newMatrix = matrix.slice()
      newMatrix[row][col].isOb = false
      setMatrix(newMatrix)
    } else if (endNode && beginNode) {
      const newMatrix = matrix.slice()
      newMatrix[row][col].isOb = true
      setMatrix(newMatrix)
    }
  }

  useEffect(() => {
    setIsBfs(false)
    setIsDfs(false)
    setMatrix(buildMatrix(rows, cols))
    setBeginNode(null)
    setEndNode(null)
    setIsTraverseBegin(false)
  }, [rows, cols, cellSize])

  function showPath(pathCoords: string[]) {
    pathCoords.pop()
    for (const path of pathCoords) {
      const [row, col] = path.split(',').map(Number)
      const newMatrix = matrix.slice()
      newMatrix[row][col].lightPath = true
      setMatrix(newMatrix)
    }
  }

  function traverseMatrixUsingBFS() {
    if (!beginNode || !endNode) return
    const path = [`${beginNode[0]},${beginNode[1]}`]
    if (isTraverseBegin) return

    const queue: [number, number, string[]][] = [[...beginNode, path.slice()]]
    setIsTraverseBegin(true)
    setIsBfs(true)
    let count = 0
    let found = false
    const [endRow, endCol] = endNode
    const direction = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ]

    while (queue.length) {
      if (found) break

      const [row, col, currentPath] = queue.shift()!
      count += 15

      if (row === endRow && col === endCol) {
        found = true
        showPath(currentPath)
        return
      }

      const newMatrix = matrix.slice()
      newMatrix[row][col].isActive = true
      newMatrix[row][col].delayTransition = count
      setMatrix(newMatrix)

      for (const [directionRow, directionCol] of direction) {
        const newRow = row + directionRow
        const newCol = col + directionCol
        const pathCo = `${newRow},${newCol}`

        if (
          isInBound(newRow, newCol, matrix) &&
          !matrix[newRow][newCol].isVisited &&
          !matrix[newRow][newCol].isOb
        ) {
          queue.push([newRow, newCol, [...currentPath, pathCo]])
          const visitedMatrix = matrix.slice()
          visitedMatrix[newRow][newCol].isVisited = true
          setMatrix(visitedMatrix)
        }
      }
    }
  }

  function traverseMatrixUsingDFS() {
    if (!beginNode || !endNode) return
    const [startRow, startCol] = beginNode
    const [endRow, endCol] = endNode
    let count = 0
    const direction = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ]

    let found = false
    setIsDfs(true)
    setIsTraverseBegin(true)

    const dfs = (row: number, col: number) => {
      if (found) return
      if (!isInBound(row, col, matrix)) return
      if (matrix[row][col].isVisited) return
      if (matrix[row][col].isOb) return
      if (matrix[row][col].isEndGoal) {
        found = true
        return
      }

      count += 20

      if (row === endRow && col === endCol) {
        found = true
        return
      }

      const newMatrix = matrix.slice()
      newMatrix[row][col].isActive = true
      newMatrix[row][col].isVisited = true
      newMatrix[row][col].delayTransition = count
      setMatrix(newMatrix)

      for (const [directionRow, directionCol] of direction) {
        dfs(row + directionRow, col + directionCol)
      }
    }

    dfs(startRow, startCol)
  }

  function resetVisualizer() {
    setIsBfs(false)
    setIsDfs(false)
    setMatrix(buildMatrix(rows, cols))
    setBeginNode(null)
    setEndNode(null)
    setIsTraverseBegin(false)
  }

  function getCellVariant(node: GridNode): 'default' | 'start' | 'end' | 'active' | 'obstacle' | 'path' {
    if (node.lightPath) return 'path'
    if (node.isStartNode) return 'start'
    if (node.isEndGoal) return 'end'
    if (node.isActive) return 'active'
    if (node.isOb) return 'obstacle'
    return 'default'
  }

  return (
    <Wrapper>
      <Controls>
        <ControlButton $active={isBfs} onClick={traverseMatrixUsingBFS}>
          bfs()
        </ControlButton>
        <ControlButton $active={isDfs} onClick={traverseMatrixUsingDFS}>
          dfs()
        </ControlButton>
        <ControlButton onClick={resetVisualizer}>reset()</ControlButton>
      </Controls>

      <GridPanel>
        <Board $width={boardWidth}>
          {matrix.map((rowNodes, rowIndex) => (
            <Row key={rowIndex}>
              {rowNodes.map((node) => (
                <Cell
                  key={node.key}
                  $size={cellSize}
                  $variant={getCellVariant(node)}
                  $delay={node.isActive ? node.delayTransition : undefined}
                  onClick={() => handleClick(node.row, node.col)}
                >
                  {node.isStartNode && <BiLocationPlus />}
                  {node.isEndGoal && <BiTargetLock />}
                </Cell>
              ))}
            </Row>
          ))}
        </Board>
      </GridPanel>
    </Wrapper>
  )
}
