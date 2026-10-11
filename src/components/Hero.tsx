import { useLang } from '../i18n/LangContext'
import { waLink } from '../lib/wa'
import { NewTab } from './Common'
import { ArrowIcon } from './Icons'

export function Hero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <section className="wrap pb-16 pt-7 md:pb-24">
      <div className="grid grid-cols-12 gap-x-[clamp(16px,3.2vw,40px)]">
        <div className="col-span-12 flex flex-wrap justify-between gap-x-6 gap-y-2 pb-5">
          <span className="label">
            <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-signal align-[1px]" />
            {h.available}
          </span>
          <span className="label">{h.where}</span>
        </div>

        <h1 className="col-span-12 m-0 font-display text-[clamp(72px,24vw,160px)] font-black uppercase leading-[0.82] tracking-[-0.02em] condensed lg:col-span-8 lg:text-[clamp(88px,15.4vw,230px)]">
          <span className="block animate-rise">{h.first}</span>{' '}
          <span className="outline-text block animate-rise [animation-delay:80ms]">{h.last}</span>
        </h1>

        <figure className="order-1 col-span-12 m-0 mt-10 self-start lg:order-0 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-2 lg:mt-0">
          <img
            src="/leandro-900.webp"
            srcSet="/leandro-480.webp 480w, /leandro-640.webp 640w, /leandro-900.webp 900w"
            sizes="(min-width: 1024px) 30vw, 100vw"
            alt={h.photoAlt}
            width={900}
            height={1200}
            fetchPriority="high"
            className="block aspect-4/5 w-full object-cover object-[50%_20%] grayscale lg:aspect-3/4"
          />
          <figcaption className="mt-2.5 flex justify-between gap-3">
            <span className="label">{h.caption1}</span>
            <span className="label text-right">{h.caption2}</span>
          </figcaption>
        </figure>

        <div className="col-span-12 mt-8 grid content-start gap-5 lg:col-span-7 lg:mt-10">
          <p className="m-0 max-w-[22ch] text-balance font-display text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.12] tracking-[-0.015em]">
            {h.claimA}<em className="mark not-italic">{h.claimEm}</em>{h.claimB}
          </p>
          <p className="m-0 max-w-[54ch] text-ink-soft">{h.lede}</p>
          <div className="mt-1 flex flex-wrap items-center gap-6">
            <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" className="btn-block">
              {h.primary}<NewTab /> <ArrowIcon className="h-4 w-4" />
            </a>
            <a href="#proyectos" className="link-cta">{h.secondary}</a>
          </div>
        </div>

        <dl className="order-2 col-span-12 mt-16 grid border-t lg:order-0 border-ink md:grid-cols-3">
          {h.facts.map((f, i) => (
            <div
              key={f.v}
              className={`flex flex-col-reverse justify-end gap-1.5 py-4 md:px-5 md:first:pl-0 ${i > 0 ? 'border-t border-rule md:border-l md:border-t-0' : ''}`}
            >
              <dt className="max-w-[28ch] text-sm text-ink-soft">{f.d}</dt>
              <dd className="m-0 font-display text-[56px] font-extrabold leading-none tracking-[-0.01em] tabular-nums condensed">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
