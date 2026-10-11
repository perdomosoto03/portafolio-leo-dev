import { useLang } from '../i18n/LangContext'
import { waLink } from '../lib/wa'
import { WhatsAppIcon } from './Icons'

export function FloatingWhatsApp() {
  const { t } = useLang()
  return (
    <a
      href={waLink(t.contact.waMsg)}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp ${t.projects.newTab}`}
      data-floating-wa
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-30 grid h-[52px] w-[52px] place-items-center bg-ink text-paper outline-solid outline-1 outline-paper/30 transition-colors hover:bg-signal hover:text-ink"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  )
}
