import { useLang } from '../i18n/LangContext'
import { site, stack } from '../data/site'
import { NewTab, SectionHead } from './Common'

export function About() {
  const { t } = useLang()
  return (
    <section id="sobre-mi" className="section">
      <div className="wrap">
        <SectionHead title={t.about.title} label={t.about.label} />
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="grid content-start gap-5 text-lg leading-relaxed lg:col-span-7">
            <p className="m-0 max-w-[60ch]">{t.about.p1}</p>
            <p className="m-0 max-w-[60ch] text-ink-soft">{t.about.p2}</p>
            <div className="mt-2 flex flex-wrap gap-x-7 gap-y-3 text-base">
              {site.cvUrl && <a href={site.cvUrl} download className="link-cta">{t.about.cv}</a>}
              {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-cta">LinkedIn<NewTab /></a>}
              {site.github && <a href={site.github} target="_blank" rel="noreferrer" className="link-cta">GitHub<NewTab /></a>}
            </div>
          </div>
          <dl className="grid content-start grid-cols-2 gap-x-6 gap-y-10 lg:col-span-5">
            {(Object.keys(stack) as (keyof typeof stack)[]).map((g) => (
              <div key={g} className="border-t border-rule pt-3">
                <dt className="label">{t.about.groups[g]}</dt>
                <dd className="m-0 mt-3">
                  <ul className="grid gap-1 text-[15px]">
                    {stack[g].map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
