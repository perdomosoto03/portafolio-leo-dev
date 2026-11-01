import { LangProvider } from './i18n/LangContext'
import { SkipLink } from './components/Common'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Pricing } from './components/Pricing'
import { Process } from './components/Process'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'

export default function App() {
  return (
    <LangProvider>
      <div id="top">
        <SkipLink />
        <Nav />
        <main id="main" tabIndex={-1} className="outline-hidden">
          <Hero />
          <Projects />
          <Services />
          <Pricing />
          <Process />
          <About />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LangProvider>
  )
}
