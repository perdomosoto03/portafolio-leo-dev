import { useLang } from '../i18n/LangContext'
import { SectionHead } from './Common'

export function Process() {
  const { t } = useLang()
  return (
    <section id="proceso" className="section">
      <div className="wrap">
        <SectionHead title={t.process.title} label={t.process.label} />
        <ol className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.process.steps.map((s, i) => (
            <li key={s.t} className="border-t border-ink pt-5">
              <span aria-hidden="true" className="outline-text block font-display text-[88px] font-black leading-none condensed">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.01em] font-stretch-85%">{s.t}</h3>
              <p className="mt-2 text-ink-soft">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
