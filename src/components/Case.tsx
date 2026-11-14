import { useLang } from '../i18n/LangContext'
import { projects } from '../data/projects'
import { waLink } from '../lib/wa'
import { designPath } from '../pages'
import { NewTab, SectionHead } from './Common'
import { ArrowIcon } from './Icons'

const mme = projects.find((p) => p.id === 'mme')!

// Nombres tal como salen en el sitio del cliente (src/data/services.ts de su repo).
const mmeServices = [
  'Saneamiento del Medio Ambiente',
  'Control de plagas urbanas',
  'Control del comején',
  'Control de las ratas',
  'Control de las moscas',
]

function WhatsAppButton({ lugar }: { lugar: string }) {
  const { t } = useLang()
  return (
    <a href={waLink(t.mmeCase.waMsg)} target="_blank" rel="noreferrer" data-umami-event="whatsapp" data-umami-event-lugar={lugar} className="btn-block">
      {t.mmeCase.cta}<NewTab /> <ArrowIcon className="h-4 w-4" />
    </a>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2">
      {items.map((r) => (
        <li key={r} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-signal" />
          {r}
        </li>
      ))}
    </ul>
  )
}

// Página /proyectos/multiservicios-manuel-esteban. Problema, solución, resultados y tecnología salen de
// data/projects.ts para que no contradigan la portada.
export function MmeCase() {
  const { t, lang } = useLang()
  const c = t.mmeCase
  const multiPage = t.pricing.items[1]! // «Sitio de varias páginas», mismo precio que en la portada
  return (
    <>
      <section className="wrap pb-14 pt-7 md:pb-20">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap gap-2">
          <a href="/" className="hover:text-signal">{c.home}</a>
          <span aria-hidden="true">/</span>
          <a href="/#proyectos" className="hover:text-signal">{t.nav.projects}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{mme.title}</span>
        </nav>
        <p className="label mt-8">{c.kicker}</p>
        <h1 className="m-0 mt-4 max-w-[18ch] text-balance font-display text-[clamp(40px,7vw,104px)] font-black uppercase leading-[0.9] tracking-[-0.02em] condensed">
          {c.h1}
        </h1>
        <p className="mt-8 max-w-[58ch] text-lg text-ink-soft">{mme.summary[lang]} {c.coverage}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a href={mme.liveUrl} target="_blank" rel="noreferrer" className="link-cta">
            {c.visit}<NewTab />
          </a>
        </div>
        <img
          src={mme.image}
          srcSet={mme.imageSrcSet}
          sizes="(min-width: 1024px) 80vw, 100vw"
          alt={c.alt}
          width={1200}
          height={630}
          decoding="async"
          className="mt-12 block aspect-1200/630 w-full border border-rule bg-paper-2 object-contain p-4"
        />
      </section>

      <section id="encargo" className="section">
        <div className="wrap">
          <SectionHead title={c.brief.title} label={c.brief.label} />
          <p className="mt-8 max-w-[60ch] text-lg text-ink-soft">{mme.problem[lang]}</p>
        </div>
      </section>

      <section id="solucion" className="section">
        <div className="wrap">
          <SectionHead title={c.built.title} label={c.built.label} />
          <p className="mt-8 max-w-[60ch] text-lg text-ink-soft">{mme.solution[lang]}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-x-10">
            <div>
              <h3 className="label m-0">{c.built.pages}</h3>
              <Bullets items={c.built.pageList} />
            </div>
            <div>
              <h3 className="label m-0">{c.built.services}</h3>
              <Bullets items={mmeServices} />
            </div>
          </div>
        </div>
      </section>

      <section id="tecnica" className="section">
        <div className="wrap">
          <SectionHead title={c.inside.title} label={c.inside.label} />
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-10">
            <div>
              <h3 className="label m-0">{t.projects.results}</h3>
              <Bullets items={mme.results[lang]} />
            </div>
            <div>
              <h3 className="label m-0">{t.projects.tech}</h3>
              <p className="mt-3 text-ink-soft">{mme.tech.join(' · ')}</p>
              <p className="mt-4 max-w-[54ch] text-ink-soft">{c.inside.tests}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="m-0 max-w-[16ch] text-balance font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.015em] font-stretch-85%">{c.closing.t}</h2>
          <p className="mt-4 max-w-[54ch] text-ink-soft">{c.closing.d} {multiPage.price} {c.closing.tax}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <WhatsAppButton lugar="caso-mme" />
            <a href={designPath} className="link-cta">{c.design}</a>
            <a href="/#proyectos" className="link-cta">{c.back}</a>
          </div>
        </div>
      </section>
    </>
  )
}
