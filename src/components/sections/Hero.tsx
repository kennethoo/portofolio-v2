import styled, { keyframes } from 'styled-components'
import { portfolio } from '../../data/portfolio'
import { StatusBadge } from '../ui/StatusBadge'
import { TerminalTyping } from '../ui/TerminalTyping'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`

const HeroSection = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 24px 80px;
  max-width: 1100px;
  margin: 0 auto;
`

const Content = styled.div`
  flex: 1;
`

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Name = styled.h1`
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
`

const NameAccent = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.cyan},
    ${({ theme }) => theme.colors.purple}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.green};
  margin-bottom: 24px;
`

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 540px;
  line-height: 1.7;
  margin-bottom: 8px;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
`

const Button = styled.a<{ $primary?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.25s;

  ${({ $primary, theme }) =>
    $primary
      ? `
    background: rgba(8, 145, 178, 0.08);
    border: 1px solid ${theme.colors.cyan};
    color: ${theme.colors.cyan};
    &:hover {
      background: rgba(8, 145, 178, 0.14);
      box-shadow: ${theme.shadows.glow};
    }
  `
      : `
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.textMuted};
    &:hover {
      border-color: ${theme.colors.borderHover};
      color: ${theme.colors.text};
    }
  `}
`

const Visual = styled.div`
  display: none;
  flex: 0 0 280px;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`

const ChipStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${float} 4s ease-in-out infinite;
`

const Chip = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  padding: 10px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.cyan};
  white-space: nowrap;

  &:nth-child(2) {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.green};
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    margin-left: 12px;
    color: ${({ theme }) => theme.colors.amber};
    animation-delay: 1s;
  }
`

const terminalLines = [
  `whoami → ${portfolio.name}`,
  `role → ${portfolio.title}`,
  `stack → ${portfolio.skills.slice(0, 4).join(' | ')}`,
  `status → ready_to_build()`,
]

export function Hero() {
  return (
    <HeroSection id="hero">
      <Content>
        <Eyebrow>
          <Greeting>{'// init portfolio_v1.0'}</Greeting>
          <StatusBadge variant="online" />
        </Eyebrow>
        <Name>
          Hi, I'm <NameAccent>{portfolio.name}</NameAccent>
        </Name>
        <Title>{portfolio.title}</Title>
        <Description>{portfolio.tagline}</Description>
        <Description>{portfolio.description}</Description>
        <TerminalTyping lines={terminalLines} />
        <Actions>
          <Button $primary href="#projects">
            view_projects()
          </Button>
        </Actions>
      </Content>
      <Visual>
        <ChipStack>
          <Chip>{'⚙ compile() → OK'}</Chip>
          <Chip>{'⚡ latency: 12ms'}</Chip>
          <Chip>{'🔧 uptime: 99.9%'}</Chip>
        </ChipStack>
      </Visual>
    </HeroSection>
  )
}
