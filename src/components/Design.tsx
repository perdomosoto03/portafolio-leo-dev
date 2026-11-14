import { useLang } from '../i18n/LangContext'
import { projects } from '../data/projects'
import { waLink } from '../lib/wa'
import { NewTab, SectionHead } from './Common'
import { ArrowIcon } from './Icons'

const mme = projects.find((p) => p.id === 'mme')!

function WhatsAppButton({ lugar }: { lugar: string }) {
  const { t } = useLang()
  return (
    <a href={waLink(t.design.waMsg)} target="_blank" rel="noreferrer" data-umami-event="whatsapp" data-umami-event-lugar={lugar} className="btn-block">
      {t.design.cta}<NewTab /> <ArrowIcon className="h-4 w-4" />
    </a>
  )
}

export function DesignHeader() {
  const { t } = useLang()
  const d = t.design
  return (
    <section className="wrap pb-14 pt-7 md:pb-20">
      <nav aria-label="Breadcrumb" className="label flex gap-2">
        <a href="/" className="hover:text-signal">{d.home}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{d.kicker}</span>
      </nav>
      <h1 className="m-0 mt-8 max-w-[18ch] text-balance font-display text-[clamp(44px,8.4vw,128px)] font-black uppercase leading-[0.9] tracking-[-0.02em] condensed">
        {d.h1}
      </h1>
      <p className="mt-8 max-w-[58ch] text-lg text-ink-soft">{d.lede}</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <WhatsAppButton lugar="diseno-web-inicio" />
        <a href="/" className="link-cta">{d.back}</a>
      </div>
    </section>
  )
}

export function DesignOptions() {
  const { t } = useLang()
  const o = t.design.options
  return (
    <section id="incluye" className="section">
      <div className="wrap">
        <SectionHead title={o.title} label={o.label} />
        <ul>
          {o.items.map((i) => (
            <li key={i.t} className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-x-10">
              <h3 className="row-title md:col-span-5">{i.t}</h3>
              <div className="md:col-span-6 md:col-start-7">
                <p className="m-0 max-w-[54ch] text-ink-soft">{i.d}</p>
                <p className="label mt-4">{i.tags.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function DesignNeed() {
  const { t } = useLang()
  const n = t.design.need
  return (
    <section id="material" className="section">
      <div className="wrap">
        <SectionHead title={n.title} label={n.label} />
        <p className="mt-8 max-w-[60ch] text-lg text-ink-soft">{n.p}</p>
      </div>
    </section>
  )
}

export function DesignCase() {
  const { t, lang } = useLang()
  const c = t.design.case
  return (
    <section id="caso" className="section">
      <div className="wrap">
        <SectionHead title={c.title} label={c.label} />
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-x-10">
          <img
            src={mme.image}
            srcSet={mme.imageSrcSet}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt={c.alt}
            width={1200}
            height={630}
            loading="lazy"
            decoding="async"
            className="block aspect-4/3 w-full border border-rule bg-paper-2 object-contain p-4 md:col-span-6"
          />
          <div className="md:col-span-6">
            <h3 className="row-title">{mme.title}</h3>
            <p className="mt-3 max-w-[54ch] text-ink-soft">{mme.summary[lang]}</p>
            <ul className="mt-5 grid max-w-[54ch] gap-2 text-ink-soft">
              {mme.results[lang].map((r) => (
                <li key={r} className="border-t border-rule pt-2">{r}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-6">
              <a href={mme.casePath} className="link-cta">{t.projects.caseStudy}</a>
              <a href={mme.liveUrl} target="_blank" rel="noreferrer" className="link-cta">
                {c.visit}<NewTab />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DesignFaq() {
  const { t } = useLang()
  const f = t.design.faq
  return (
    <section id="preguntas" className="section">
      <div className="wrap">
        <SectionHead title={f.title} label={f.label} />
        <ul>
          {f.items.map((i) => (
            <li key={i.q} className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-x-10">
              <h3 className="row-title md:col-span-5">{i.q}</h3>
              <p className="m-0 max-w-[54ch] text-ink-soft md:col-span-6 md:col-start-7">{i.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function DesignClosing() {
  const { t } = useLang()
  const c = t.design.closing
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="m-0 max-w-[16ch] text-balance font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.015em] font-stretch-85%">{c.t}</h2>
        <p className="mt-4 max-w-[54ch] text-ink-soft">{c.d}</p>
        <div className="mt-8">
          <WhatsAppButton lugar="diseno-web-final" />
        </div>
      </div>
    </section>
  )
}
