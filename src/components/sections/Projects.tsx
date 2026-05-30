import styled from 'styled-components'
import { portfolio } from '../../data/portfolio'
import { SectionWrapper } from '../ui/SectionWrapper'
import { ProjectCard } from '../ui/ProjectCard'

const Grid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const EmptyNote = styled.p`
  grid-column: 1 / -1;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textDim};
  text-align: center;
  padding: 32px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`

export function Projects() {
  const projects = portfolio.projects

  return (
    <SectionWrapper
      id="projects"
      label="projects"
      title="Things I've Built"
      subtitle="New projects get added here as they ship. Edit src/data/portfolio.ts to update."
    >
      <Grid>
        {projects.length === 0 ? (
          <EmptyNote>{'// no projects yet — add your first one in portfolio.ts'}</EmptyNote>
        ) : (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        )}
      </Grid>
    </SectionWrapper>
  )
}
