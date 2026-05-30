import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const Terminal = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(0.85rem, 2vw, 1rem);
  color: ${({ theme }) => theme.colors.green};
  background: ${({ theme }) => theme.colors.terminalBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px 20px;
  max-width: 520px;
  margin-top: 24px;
`

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background: ${({ theme }) => theme.colors.green};
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
`

interface TerminalTypingProps {
  lines: string[]
  speed?: number
}

export function TerminalTyping({ lines, speed = 40 }: TerminalTypingProps) {
  const fullText = lines.join('\n')
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayed(fullText.slice(0, index))
        index++
      } else {
        setDone(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [fullText, speed])

  const renderedLines = displayed.split('\n')

  return (
    <Terminal>
      {renderedLines.map((line, i) => (
        <div key={i}>
          <Prompt>{'> '}</Prompt>
          {line}
        </div>
      ))}
      {!done && <Cursor />}
    </Terminal>
  )
}
