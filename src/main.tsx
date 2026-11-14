import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/instrument-sans'
import './index.css'
import App from './App.tsx'
import DesignApp from './DesignApp.tsx'
import CaseApp from './CaseApp.tsx'
import { designPath, mmeCasePath } from './pages.ts'

// Cada página tiene su HTML estático (scripts/prerender.mjs); aquí se monta la que corresponde a la URL.
const apps: Record<string, typeof App> = { [designPath]: DesignApp, [mmeCasePath]: CaseApp }
const Page = apps[location.pathname.replace(/\/$/, '')] ?? App

createRoot(document.getElementById('root')!).render(
  <StrictMode><Page /></StrictMode>,
)
