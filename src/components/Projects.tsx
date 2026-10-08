import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { projects, type Project } from '../data/projects'
import { NewTab, SectionHead } from './Common'
import { ExternalIcon } from './Icons'

/* Imagen, cifra destacada o fragmento de código: lo que tenga el proyecto. */
function ProjectMedia({ p }: { p: Project }) {
  const { lang } = useLang()
  if (p.image) {
    return (
      <img
        src={p.image}
        alt={p.title}
        width={1200}
        height={630}
        loading="lazy"
        decoding="async"
        className="block aspect-[4/3] w-full border border-rule bg-paper-2 object-contain p-4"
      />
    )
  }
  if (p.highlight) {
    return (
      <div className="grid aspect-[4/3] w-full content-center justify-items-center gap-2 bg-ink p-6 text-center text-paper">
        <span className="font-display text-[clamp(96px,14vw,180px)] font-black leading-[0.85] condensed">{p.highlight.value}</span>
        <span className="label !text-paper/70">{p.highlight.label[lang]}</span>
      </div>
    )
  }
  return (
    <pre className="aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-2 p-5 text-[13px] leading-relaxed">
      <code>{p.codeSnippet}</code>
    </pre>
  )
}

function ProjectRow({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  const { t, lang } = useLang()
  const panelId = `proyecto-${p.id}`
  return (
    <li className="border-b border-rule">
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group relative grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 py-6 text-left transition-[padding] duration-300 md:grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,1fr)_auto] [@media(hover:hover)]:hover:pl-3"
        >
          <span className="row-title transition-colors group-hover:text-signal">{p.title}</span>
          <span className="label col-start-1 row-start-2 md:col-start-auto md:row-start-auto">{p.category[lang]}</span>
          <span className="label hidden md:block">{p.year}</span>
          <span aria-hidden="true" className="col-start-2 row-start-1 w-6 text-center font-display text-3xl leading-none md:col-start-auto md:row-start-auto">
            {open ? '−' : '+'}
          </span>
          {!open && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-20 top-1/2 hidden aspect-[4/3] w-56 -translate-y-1/2 -rotate-2 place-items-center border border-rule bg-paper-2 bg-cover bg-center font-display text-7xl font-black opacity-0 transition-opacity condensed group-hover:opacity-100 [@media(hover:hover)]:grid"
              style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
            >
              {!p.image && p.highlight?.value}
            </span>
          )}
        </button>
      </h3>

      <div id={panelId} hidden={!open} className="pb-12 pt-2">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5"><ProjectMedia p={p} /></div>
          <div className="grid content-start gap-7 lg:col-span-7">
            <p className="m-0 max-w-[60ch] text-lg">{p.summary[lang]}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="label m-0">{t.projects.problem}</h4>
                <p className="mt-2 text-ink-soft">{p.problem[lang]}</p>
              </div>
              <div>
                <h4 className="label m-0">{t.projects.solution}</h4>
                <p className="mt-2 text-ink-soft">{p.solution[lang]}</p>
              </div>
            </div>
            <div>
              <h4 className="label m-0">{t.projects.results}</h4>
              <ul className="mt-3 grid gap-2">
                {p.results[lang].map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-signal" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="label m-0">{t.projects.tech}</h4>
              <p className="mt-2 text-ink-soft">{p.tech.join(' · ')}</p>
            </div>
            <div className="flex flex-wrap gap-6">
              {p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="link-cta inline-flex items-center gap-1">
                  {t.projects.live}<NewTab /><ExternalIcon className="h-4 w-4" />
                </a>
              ) : p.type === 'client' ? (
                <span className="label">{t.projects.soon}</span>
              ) : null}
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noreferrer" className="link-cta inline-flex items-center gap-1">
                  {t.projects.repo}<NewTab /><ExternalIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export function Projects() {
  const { t } = useLang()
  // Estado por id: sobrevive al cambio de idioma. El primero empieza abierto.
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(projects.slice(0, 1).map((p) => p.id)))
  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })

  return (
    <section id="proyectos" className="section">
      <div className="wrap">
        <SectionHead title={t.projects.title} label={t.projects.label} />
        <ul>
          {projects.map((p) => (
            <ProjectRow key={p.id} p={p} open={openIds.has(p.id)} onToggle={() => toggle(p.id)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
