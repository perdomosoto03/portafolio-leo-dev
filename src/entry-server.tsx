import { renderToString } from 'react-dom/server'
import App from './App'
import DesignApp from './DesignApp'
import CaseApp from './CaseApp'

const apps = { home: App, design: DesignApp, 'case-mme': CaseApp }

// Lo usa scripts/prerender.mjs en el build: devuelve el HTML de cada página en español.
export const render = (page: keyof typeof apps = 'home') => {
  const Page = apps[page]
  return renderToString(<Page />)
}
