import styled, { keyframes } from 'styled-components'

const scan = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`

const GridLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%);
`

const ScanLine = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.cyan}40,
    transparent
  );
  animation: ${scan} 8s linear infinite;
`

const GlowOrb = styled.div<{ $x: string; $y: string; $color: string; $delay: string }>`
  position: fixed;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  filter: blur(120px);
  opacity: 0.08;
  z-index: 0;
  pointer-events: none;
  animation: ${pulse} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay};
`

export function GridBackground() {
  return (
    <>
      <GridLayer />
      <ScanLine />
      <GlowOrb $x="10%" $y="20%" $color="#0891b2" $delay="0s" />
      <GlowOrb $x="70%" $y="60%" $color="#7c3aed" $delay="2s" />
      <GlowOrb $x="50%" $y="80%" $color="#059669" $delay="4s" />
    </>
  )
}
