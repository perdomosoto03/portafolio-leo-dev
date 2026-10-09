import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useLang } from '../i18n/LangContext'
import { getTheme, setTheme, subscribeTheme, type Theme } from '../theme'
import { site } from '../data/site'
import { waLink } from '../lib/wa'
import { NewTab } from './Common'
import { SunIcon, MoonIcon } from './Icons'

function LangToggle({ className = '' }: { className?: string }) {
  const { t, lang, setLang } = useLang()
  const opts = [['es', 'Español'], ['en', 'English']] as const
  return (
    <div role="group" aria-label={t.nav.lang} className={`items-center gap-1.5 ${className}`}>
      {opts.map(([l, name], i) => (
        <span key={l} className="contents">
          {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={`${l.toUpperCase()} (${name})`}
            lang={l}
            className={`uppercase transition-opacity ${lang === l ? 'font-semibold' : 'opacity-70 hover:opacity-100'}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}

function ThemeToggle({ className = '' }: { className?: string }) {
  const { t } = useLang()
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme)
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
      className={`grid h-8 w-8 place-items-center rounded-full border border-[color:color-mix(in_srgb,currentColor_25%,transparent)] transition-colors hover:text-signal ${className}`}
    >
      {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  )
}

type Links = readonly (readonly [string, string])[]

/* Menú móvil a pantalla completa: Esc cierra, el foco queda atrapado dentro y vuelve al botón al cerrar. */
function MobileMenu({ links, onClose }: { links: Links; onClose: () => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    el.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const items = el.querySelectorAll<HTMLElement>('a, button')
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow }
  }, [onClose])

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menuLabel}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-[clamp(16px,3.2vw,40px)] pb-8 pt-[calc(env(safe-area-inset-top,0px)+8px)] text-paper dark:bg-paper-2 dark:text-ink"
    >
      <div className="flex h-12 items-center justify-between">
        <span className="font-display text-xl font-extrabold uppercase condensed">{site.brand}</span>
        <button type="button" onClick={onClose} className="py-2 font-semibold">{t.nav.close}</button>
      </div>
      <nav className="mt-auto grid gap-1 pt-10">
        {links.map(([href, label]) => (
          <a
            key={href}
            href={href}
            onClick={onClose}
            className="font-display text-[clamp(56px,17vw,120px)] font-extrabold uppercase leading-[0.9] condensed transition-colors hover:text-signal"
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="mt-10 flex items-center gap-5 text-sm">
        <LangToggle className="flex" />
        <ThemeToggle />
      </div>
      <p className="mt-6 grid gap-1 text-sm opacity-70">
        <span>WhatsApp {site.whatsappLabel}</span>
        <span>{site.email}</span>
      </p>
    </div>
  )
}

export function Nav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const links: Links = [
    ['#proyectos', t.nav.projects],
    ['#servicios', t.nav.services],
    ['#proceso', t.nav.process],
    ['#sobre-mi', t.nav.about],
    ['#contacto', t.nav.contact],
  ]

  // Al cerrar el menú, el foco vuelve al botón "Menú".
  useEffect(() => {
    if (wasOpen.current && !open) menuBtn.current?.focus({ preventScroll: true })
    wasOpen.current = open
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <nav className="wrap grid h-14 grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="justify-self-start font-display text-xl font-extrabold uppercase tracking-[-0.01em] condensed">
          {site.brand}<sup className="ml-0.5 text-[10px] font-medium">®</sup>
        </a>
        <ul className="hidden gap-7 text-sm lg:flex">
          {links.slice(0, 4).map(([href, label]) => (
            <li key={href}><a href={href} className="underline-offset-4 hover:underline">{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center justify-end gap-5 text-sm">
          <LangToggle className="hidden lg:flex" />
          <ThemeToggle className="hidden lg:grid" />
          <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" className="link-cta hidden lg:inline">
            {t.nav.cta}<NewTab />
          </a>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="py-2 font-semibold lg:hidden"
          >
            {t.nav.menu}
          </button>
        </div>
      </nav>
      {open && <MobileMenu links={links} onClose={close} />}
    </header>
  )
}
