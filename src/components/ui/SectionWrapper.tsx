import styled from 'styled-components'
import type { ReactNode } from 'react'

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: 100px 24px;
  max-width: 1100px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 120px 32px;
  }
`

const Label = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 12px;
`

const Title = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.text}, ${({ theme }) => theme.colors.cyan});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.05rem;
  max-width: 560px;
  margin-bottom: 48px;
`

interface SectionWrapperProps {
  id: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function SectionWrapper({ id, label, title, subtitle, children }: SectionWrapperProps) {
  return (
    <Section id={id}>
      <Label>{`// ${label}`}</Label>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Section>
  )
}
