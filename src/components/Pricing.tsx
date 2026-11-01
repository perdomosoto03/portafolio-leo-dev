import { useLang } from '../i18n/LangContext'
import { waLink } from '../lib/wa'
import { NewTab, SectionHead } from './Common'
import { ArrowIcon } from './Icons'

export function Pricing() {
  const { t } = useLang()
  const p = t.pricing
  return (
    <section id="precios" className="section">
      <div className="wrap">
        <SectionHead title={p.title} label={p.label} />
        <ul>
          {p.items.map((i) => (
            <li key={i.t} className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-x-10">
              <h3 className="row-title md:col-span-5">{i.t}</h3>
              <div className="md:col-span-6 md:col-start-7">
                <p className="m-0 flex items-baseline gap-3 font-display text-4xl font-extrabold condensed">
                  <span className="label">{p.from}</span>{i.price}
                </p>
                <p className="mt-2 max-w-[54ch] text-ink-soft">{i.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[60ch] text-sm text-ink-soft">{p.note}</p>
        <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" data-umami-event="whatsapp" data-umami-event-lugar="precios" className="btn-block mt-8 inline-flex items-center gap-2">
          {p.cta}<NewTab /> <ArrowIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
