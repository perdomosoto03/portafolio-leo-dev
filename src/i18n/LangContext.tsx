import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../data/projects'
import { strings, type Strings } from './strings'

interface Ctx { lang: Lang; t: Strings; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* storage bloqueado */ }
  return 'es' // español por defecto; el visitante cambia con el botón ES/EN
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
  }, [lang])
  return <LangContext.Provider value={{ lang, t: strings[lang], setLang }}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang debe usarse dentro de LangProvider')
  return ctx
}
