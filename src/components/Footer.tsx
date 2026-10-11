import { useLang } from '../i18n/LangContext'
import { site } from '../data/site'
import { waLink } from '../lib/wa'
import { NewTab } from './Common'

const year = new Date().getFullYear()

/* Footer = contacto. Bloque de tinta en modo claro, superficie oscura en modo oscuro. */
export function Footer() {
  const { t } = useLang()
  const muted = 'text-paper/60 dark:text-ink-soft'
  const col = 'grid content-start gap-2 text-[15px]'
  const lbl = 'label mb-1 text-paper/60! dark:text-ink-soft!'
  return (
    <footer id="contacto" className="scroll-mt-16 overflow-hidden bg-ink text-paper dark:bg-paper-2 dark:text-ink">
      <div className="wrap pt-20">
        <div className="grid grid-cols-2 gap-x-[clamp(16px,3.2vw,40px)] gap-y-10 lg:grid-cols-12">
          <p className="col-span-2 m-0 max-w-[14ch] text-balance font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.015em] font-stretch-85% lg:col-span-5">
            {t.footer.ask}
          </p>
          <div className={`${col} col-span-2 sm:col-span-1 lg:col-span-3`}>
            <span className={lbl}>{t.footer.contact}</span>
            <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" data-umami-event="whatsapp" data-umami-event-lugar="footer" className="hover:text-signal">WhatsApp {site.whatsappLabel}<NewTab /></a>
            <a href={`mailto:${site.email}`} className="break-all hover:text-signal lg:break-normal">{site.email}</a>
          </div>
          <div className={`${col} lg:col-span-2`}>
            <span className={lbl}>{t.footer.online}</span>
            {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-signal">LinkedIn ↗<NewTab /></a>}
            {site.github && <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-signal">GitHub ↗<NewTab /></a>}
            {site.cvUrl && <a href={site.cvUrl} download className="hover:text-signal">CV (PDF)</a>}
          </div>
          <div className={`${col} lg:col-span-2`}>
            <span className={lbl}>{t.footer.site}</span>
            <a href="#proyectos" className="hover:text-signal">{t.nav.projects}</a>
            <a href="#servicios" className="hover:text-signal">{t.nav.services}</a>
            <a href="#sobre-mi" className="hover:text-signal">{t.nav.about}</a>
          </div>
        </div>

        <div className={`mt-16 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-paper/20 pt-4 text-[13px] dark:border-rule ${muted}`}>
          <span>© {year} {site.name} · {site.location}</span>
          <a href="#top" className="hover:text-signal">{t.footer.top} ↑</a>
        </div>

        <p aria-hidden="true" className="mb-[-5.5vw] mt-6 select-none whitespace-nowrap text-center font-display text-[31vw] font-black uppercase leading-[0.78] tracking-[-0.03em] condensed">
          {site.brand}<span className="text-signal">.</span>
        </p>
      </div>
    </footer>
  )
}
