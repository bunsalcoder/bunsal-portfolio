import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Projects from './components/Projects'
import Skills from './components/Skills'
import CustomCursor from './components/ui/CustomCursor'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="bg-page min-h-screen text-text">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[110] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
