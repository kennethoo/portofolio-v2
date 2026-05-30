import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { portfolio } from '../../data/portfolio'
import { StatusBadge } from '../ui/StatusBadge'

const Nav = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.navScrolled : 'transparent'};
  border-bottom: 1px solid
    ${({ $scrolled, theme }) => ($scrolled ? theme.colors.border : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.cyan};
`

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  padding: 8px 14px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
    background: rgba(8, 145, 178, 0.08);
  }
`

const StatusWrap = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const links = [
  { href: '#about', label: 'about' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Nav $scrolled={scrolled}>
      <Logo href="#">
        {'<'}
        {portfolio.name}
        {' />'}
      </Logo>
      <NavLinks>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </NavLinks>
      <StatusWrap>
        <StatusBadge variant="online" />
      </StatusWrap>
    </Nav>
  )
}
