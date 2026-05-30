import styled from 'styled-components'
import { portfolio } from '../../data/portfolio'

const FooterEl = styled.footer`
  position: relative;
  z-index: 1;
  padding: 48px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textDim};
`

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
`

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
  }
`

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <FooterEl id="contact">
      <Links>
        <Link href={`mailto:${portfolio.email}`}>email</Link>
        {portfolio.github && (
          <Link href={portfolio.github} target="_blank" rel="noopener noreferrer">
            github
          </Link>
        )}
        {portfolio.linkedin && (
          <Link href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin
          </Link>
        )}
      </Links>
      <Text>
        {'// '}
        {portfolio.name} · {year} · built with React + Vite + TypeScript
      </Text>
    </FooterEl>
  )
}
