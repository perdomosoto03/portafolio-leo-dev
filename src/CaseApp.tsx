import { LangProvider } from './i18n/LangContext'
import { SkipLink } from './components/Common'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { MmeCase } from './components/Case'

// Página /proyectos/multiservicios-manuel-esteban.
export default function CaseApp() {
  return (
    <LangProvider>
      <div id="top">
        <SkipLink />
        <Nav base="/" />
        <main id="main" tabIndex={-1} className="outline-hidden">
          <MmeCase />
        </main>
        <Footer base="/" />
        <FloatingWhatsApp />
      </div>
    </LangProvider>
  )
}
