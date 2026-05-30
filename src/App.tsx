import { ThemeProvider } from 'styled-components'
import { GridBackground } from './components/ui/GridBackground'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { PathVisualizer } from './components/sections/PathVisualizer/PathVisualizer'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GridBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <PathVisualizer />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
