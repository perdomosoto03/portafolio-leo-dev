import { useLang } from '../i18n/LangContext'
import { SectionHead } from './Common'

export function Services() {
  const { t } = useLang()
  return (
    <section id="servicios" className="section">
      <div className="wrap">
        <SectionHead title={t.services.title} label={t.services.label} />
        <ul>
          {t.services.items.map((s) => (
            <li key={s.t} className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-x-10">
              <h3 className="row-title md:col-span-5">{s.t}</h3>
              <div className="md:col-span-6 md:col-start-7">
                <p className="m-0 max-w-[54ch] text-ink-soft">{s.d}</p>
                <p className="label mt-4">{s.tags.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
