import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`

const Badge = styled.span<{ $variant: 'live' | 'building' | 'archived' | 'online' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 1px solid
    ${({ $variant, theme }) => {
      const map = {
        live: theme.colors.green,
        building: theme.colors.amber,
        archived: theme.colors.textDim,
        online: theme.colors.cyan,
      }
      return map[$variant]
    }};
  color: ${({ $variant, theme }) => {
    const map = {
      live: theme.colors.green,
      building: theme.colors.amber,
      archived: theme.colors.textMuted,
      online: theme.colors.cyan,
    }
    return map[$variant]
  }};
  background: ${({ $variant }) => {
    const map = {
      live: 'rgba(5, 150, 105, 0.1)',
      building: 'rgba(217, 119, 6, 0.1)',
      archived: 'rgba(148, 163, 184, 0.2)',
      online: 'rgba(8, 145, 178, 0.1)',
    }
    return map[$variant]
  }};
`

const Dot = styled.span<{ $pulse?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: ${({ $pulse }) => ($pulse ? blink : 'none')} 2s ease-in-out infinite;
`

const labels = {
  live: 'Live',
  building: 'Building',
  archived: 'Archived',
  online: 'Online',
}

interface StatusBadgeProps {
  variant: 'live' | 'building' | 'archived' | 'online'
}

export function StatusBadge({ variant }: StatusBadgeProps) {
  return (
    <Badge $variant={variant}>
      <Dot $pulse={variant === 'online' || variant === 'live'} />
      {labels[variant]}
    </Badge>
  )
}
