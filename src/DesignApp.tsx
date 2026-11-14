import { LangProvider } from './i18n/LangContext'
import { SkipLink } from './components/Common'
import { Nav } from './components/Nav'
import { Pricing } from './components/Pricing'
import { Process } from './components/Process'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { DesignCase, DesignClosing, DesignFaq, DesignHeader, DesignNeed, DesignOptions } from './components/Design'

// Página /diseno-web-republica-dominicana. Los precios y el proceso salen de los mismos componentes
// de la portada para que las cifras no se contradigan.
export default function DesignApp() {
  return (
    <LangProvider>
      <div id="top">
        <SkipLink />
        <Nav base="/" />
        <main id="main" tabIndex={-1} className="outline-hidden">
          <DesignHeader />
          <DesignOptions />
          <Pricing />
          <DesignNeed />
          <Process />
          <DesignCase />
          <DesignFaq />
          <DesignClosing />
        </main>
        <Footer base="/" />
        <FloatingWhatsApp />
      </div>
    </LangProvider>
  )
}
