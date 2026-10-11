import { useLang } from '../i18n/LangContext'

/* Texto solo para lectores de pantalla en enlaces que abren pestaña nueva. */
export function NewTab() {
  const { t } = useLang()
  return <span className="sr-only"> {t.projects.newTab}</span>
}

/* Cabecera de sección: título gigante condensado + etiqueta, con línea de tinta debajo. */
export function SectionHead({ title, label }: { title: string; label: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-3.5">
      <h2 className="sec-title">{title}</h2>
      <span className="label">{label}</span>
    </div>
  )
}

export function SkipLink() {
  const { t } = useLang()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
    >
      {t.nav.skip}
    </a>
  )
}
