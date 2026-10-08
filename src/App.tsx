import { LangProvider } from './i18n/LangContext'
import { SkipLink, Nav, Hero, Services, Projects, Process, About, Contact, Footer, FloatingWhatsApp } from './components/Sections'
import CodeBackground from './components/CodeBackground'

export default function App() {
  return (
    <LangProvider>
      <SkipLink />
      <Nav />
      <div className="relative">
        <CodeBackground />
        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          <Hero />
          <Services />
          <Projects />
          <Process />
          <About />
          <Contact />
        </main>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </LangProvider>
  )
}
