import { useState } from 'react'
import styled from 'styled-components'
import type { Project } from '../../data/portfolio'
import { StatusBadge } from './StatusBadge'

const Card = styled.article`
  position: relative;
  padding: 28px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;

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
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-4px);

    &::before {
      opacity: 1;
    }
  }
`

const LogoSlot = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  margin-bottom: 18px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px dashed ${({ theme }) => theme.colors.border};
`

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
`

const LogoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cyan};
  text-transform: uppercase;
`

const LogoHint = styled.span`
  font-size: 0.45rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.02em;
  text-transform: none;
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`

const TitleBlock = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};
`

const Tagline = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.purple};
  font-weight: 500;
  margin-top: 4px;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.65;
  margin-bottom: 20px;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`

const Tag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(8, 145, 178, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.cyan};
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.green};
  padding: 6px 12px;
  border: 1px solid rgba(5, 150, 105, 0.25);
  border-radius: 6px;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(5, 150, 105, 0.08);
    border-color: rgba(5, 150, 105, 0.45);
  }
`

interface ProjectCardProps {
  project: Project
}

function ProjectLogo({ project }: ProjectCardProps) {
  const [logoError, setLogoError] = useState(false)
  const showImage = project.logo && !logoError

  return (
    <LogoSlot title={project.logo ? `${project.title} logo` : 'Add logo to src/assets/'}>
      {showImage ? (
        <LogoImage
          src={project.logo}
          alt={`${project.title} logo`}
          onError={() => setLogoError(true)}
        />
      ) : (
        <LogoPlaceholder>
          {project.title.slice(0, 2)}
          <LogoHint>logo</LogoHint>
        </LogoPlaceholder>
      )}
    </LogoSlot>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <ProjectLogo project={project} />
      <Header>
        <TitleBlock>
          <Title>{project.title}</Title>
          {project.tagline && <Tagline>{project.tagline}</Tagline>}
        </TitleBlock>
        <StatusBadge variant={project.status} />
      </Header>
      <Description>{project.description}</Description>
      <TagList>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagList>
      {project.links && (
        <Links>
          {project.links.app && (
            <Link href={project.links.app} target="_blank" rel="noopener noreferrer">
              ios app →
            </Link>
          )}
          {project.links.demo && (
            <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
              web →
            </Link>
          )}
          {project.links.repo && (
            <Link href={project.links.repo} target="_blank" rel="noopener noreferrer">
              repo →
            </Link>
          )}
        </Links>
      )}
    </Card>
  )
}
