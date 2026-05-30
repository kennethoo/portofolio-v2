import { useRef } from 'react'
import styled from 'styled-components'
import { SectionWrapper } from '../../ui/SectionWrapper'
import { useContainerWidth } from '../../../hooks/useContainerWidth'
import { useWindowDimensions } from '../../../hooks/useWindowDimensions'
import { calculateBestLayout, fitCellSize } from './pathUtils'
import { TraversePath } from './TraversePath'

const Shell = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadows.card};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.cyan}60,
      transparent
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 28px;
  }
`

const Hint = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 20px;
  line-height: 1.6;
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

const Swatch = styled.span<{ $color: string; $round?: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: ${({ $round }) => ($round ? '50%' : '3px')};
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

export function PathVisualizer() {
  const shellRef = useRef<HTMLDivElement>(null)
  const containerWidth = useContainerWidth(shellRef)
  const { width, height } = useWindowDimensions()
  const layoutWidth = containerWidth > 0 ? containerWidth : width
  const { rows, cols } = calculateBestLayout(layoutWidth, height)
  const cellSize = fitCellSize(cols, layoutWidth)

  return (
    <SectionWrapper
      id="path-visualizer"
      label="algorithms"
      title="Path Visualizer"
      subtitle="Interactive BFS & DFS — same vibes as the lab bench, built for the browser."
    >
      <Hint>
        {'// pick start → end → obstacles, then run bfs() or dfs()'}
      </Hint>
      <Shell ref={shellRef}>
        <Legend>
          <LegendItem>
            <Swatch $color="linear-gradient(135deg, #0891b2, #7c3aed)" />
            Start
          </LegendItem>
          <LegendItem>
            <Swatch $color="#059669" />
            End
          </LegendItem>
          <LegendItem>
            <Swatch $color="#7c3aed" />
            Visited
          </LegendItem>
          <LegendItem>
            <Swatch $color="#0891b2" />
            Path
          </LegendItem>
          <LegendItem>
            <Swatch $color="#d97706" $round />
            Block
          </LegendItem>
        </Legend>
        <TraversePath rows={rows} cols={cols} cellSize={cellSize} />
      </Shell>
    </SectionWrapper>
  )
}
