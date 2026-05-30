export const theme = {
  colors: {
    bg: '#ffffff',
    bgElevated: '#f8fafc',
    bgCard: 'rgba(255, 255, 255, 0.9)',
    terminalBg: '#f1f5f9',
    navScrolled: 'rgba(255, 255, 255, 0.92)',
    border: 'rgba(15, 23, 42, 0.1)',
    borderHover: 'rgba(8, 145, 178, 0.35)',
    cyan: '#0891b2',
    green: '#059669',
    amber: '#d97706',
    purple: '#7c3aed',
    text: '#0f172a',
    textMuted: '#64748b',
    textDim: '#94a3b8',
  },
  fonts: {
    mono: '"JetBrains Mono", "Fira Code", "SF Mono", monospace',
    sans: '"Space Grotesk", system-ui, sans-serif',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  shadows: {
    glow: '0 4px 24px rgba(8, 145, 178, 0.12)',
    glowStrong: '0 8px 32px rgba(8, 145, 178, 0.18)',
    card: '0 4px 24px rgba(15, 23, 42, 0.06)',
  },
} as const

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
