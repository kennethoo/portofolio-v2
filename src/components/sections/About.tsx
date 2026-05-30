import styled from 'styled-components'
import { portfolio } from '../../data/portfolio'
import { SectionWrapper } from '../ui/SectionWrapper'

const Layout = styled.div`
  display: grid;
  gap: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.2fr 1fr;
    gap: 48px;
  }
`

const Intro = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  margin-bottom: 28px;
`

const Subheading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;

  &::before {
    content: '→';
    color: ${({ theme }) => theme.colors.green};
    font-family: ${({ theme }) => theme.fonts.mono};
    flex-shrink: 0;
  }
`

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const Skill = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  padding: 8px 14px;
  border-radius: 6px;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.2);
  color: ${({ theme }) => theme.colors.purple};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(124, 58, 237, 0.12);
  }
`

const FunFacts = styled.div`
  padding: 28px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
`

const FactList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Fact = styled.li`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  padding-left: 4px;
`

const CodeBlock = styled.pre`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  line-height: 1.7;
  padding: 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.terminalBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.green};
  overflow-x: auto;
  margin-bottom: 24px;
`

export function About() {
  const { about, skills, name, title } = portfolio

  return (
    <SectionWrapper
      id="about"
      label="about"
      title="A Little About Me"
      subtitle="Engineer at heart. Problem-solver by trade."
    >
      <Layout>
        <div>
          <Intro>{about.intro}</Intro>
          <Subheading>Highlights</Subheading>
          <List>
            {about.highlights.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <Subheading>Tech Stack</Subheading>
          <SkillsGrid>
            {skills.map((skill) => (
              <Skill key={skill}>{skill}</Skill>
            ))}
          </SkillsGrid>
        </div>
        <div>
          <CodeBlock>{`{
  "name": "${name}",
  "role": "${title}",
  "passion": "building cool stuff",
  "coffee_level": "critical",
  "open_to": ["collabs", "hard problems"]
}`}</CodeBlock>
          <FunFacts>
            <Subheading>Fun Facts</Subheading>
            <FactList>
              {about.funFacts.map((fact) => (
                <Fact key={fact}>{fact}</Fact>
              ))}
            </FactList>
          </FunFacts>
        </div>
      </Layout>
    </SectionWrapper>
  )
}
