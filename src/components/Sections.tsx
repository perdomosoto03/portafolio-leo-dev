import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { useLang } from '../i18n/LangContext'
import { getTheme, setTheme, subscribeTheme, type Theme } from '../theme'
import { site, stack } from '../data/site'
import { projects, type Project } from '../data/projects'
import { CodeWindow, K, S, C } from './CodeWindow'
import {
  WhatsAppIcon, MailIcon, ArrowIcon, ExternalIcon, CheckIcon, LayoutIcon, GlobeIcon,
  CodeIcon, ServerIcon, MenuIcon, CloseIcon, DownloadIcon, SunIcon, MoonIcon,
} from './Icons'

export const waLink = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`

/* ───────────── HELPERS ───────────── */
function NewTab() {
  const { t } = useLang()
  return <span className="sr-only"> {t.projects.newTab}</span>
}

/* Aparece al entrar en pantalla (IntersectionObserver). Con "reducir movimiento" se muestra de inmediato. */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (shown || !ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [shown])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`transition duration-700 ease-out motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

export function SkipLink() {
  const { t } = useLang()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
    >
      {t.nav.skip}
    </a>
  )
}

/* ───────────── NAV ───────────── */
function LangToggle() {
  const { lang, setLang } = useLang()
  const opts = [['es', 'Español'], ['en', 'English']] as const
  return (
    <div role="group" aria-label="Idioma / Language" className="flex rounded-full border border-line p-0.5 font-mono text-xs">
      {opts.map(([l, name]) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={name}
          lang={l}
          className={`rounded-full px-2.5 py-1 uppercase transition ${lang === l ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { t } = useLang()
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme)
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export function Nav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const links = [
    ['#servicios', t.nav.services],
    ['#proyectos', t.nav.projects],
    ['#proceso', t.nav.process],
    ['#sobre-mi', t.nav.about],
    ['#contacto', t.nav.contact],
  ] as const

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="font-mono text-lg font-semibold text-ink">
          <span aria-hidden="true" className="text-accent">&lt;</span>Leo Dev<span aria-hidden="true" className="text-accent"> /&gt;</span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-muted transition hover:text-ink">{label}</a>
          ))}
          <ThemeToggle />
          <LangToggle />
          <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" className="btn-primary !py-2"><WhatsAppIcon className="h-4 w-4" />{t.nav.cta}<NewTab /></a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav.menuClose : t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center text-ink"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-line px-5 pb-5 lg:hidden">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-ink">{label}</a>
          ))}
          <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" className="btn-primary mt-2 w-full"><WhatsAppIcon className="h-4 w-4" />{t.nav.cta}<NewTab /></a>
        </div>
      )}
    </header>
  )
}

/* ───────────── HERO ───────────── */
export function Hero() {
  const { t } = useLang()
  const featured = projects.find((p) => p.id === 'mme')
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-20">
      <div>
        <p className="eyebrow animate-fade-up motion-reduce:animate-none">{t.hero.badge}</p>
        <h1 className="mt-5 animate-fade-up text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink motion-reduce:animate-none sm:text-5xl lg:text-6xl" style={{ animationDelay: '80ms' }}>
          {t.hero.title1} <span className="text-accent">{t.hero.title2}</span>
        </h1>
        <p className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-muted motion-reduce:animate-none" style={{ animationDelay: '160ms' }}>{t.hero.sub}</p>
        <div className="mt-9 flex animate-fade-up flex-wrap gap-3 motion-reduce:animate-none" style={{ animationDelay: '240ms' }}>
          <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" className="btn-primary">
            <WhatsAppIcon />{t.hero.primary}<NewTab />
          </a>
          <a href="#proyectos" className="btn-ghost">{t.hero.secondary} <ArrowIcon className="h-4 w-4" /></a>
        </div>
      </div>

      {featured && (
        <figure className="animate-fade-up motion-reduce:animate-none" style={{ animationDelay: '200ms' }}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_30px_60px_-30px_rgb(var(--accent)/0.5)]">
              <img
                src={featured.image}
                alt={t.hero.previewAlt}
                width={1200}
                height={630}
                fetchPriority="high"
                className="aspect-[1200/630] w-full rounded-xl object-cover"
              />
            </div>
            <CodeWindow title="landing.tsx" className="deco-float absolute -bottom-24 left-4 hidden w-56 md:block lg:-left-8">
              <K>const</K> proyecto = {'{'}{'\n'}
              {'  '}cliente: <S>'tu negocio'</S>,{'\n'}
              {'  '}meta: <S>'más clientes'</S>,{'\n'}
              {'  '}soporte: <S>'30 días'</S>,{'\n'}
              {'}'}
            </CodeWindow>
          </div>
          <figcaption className="mt-5 flex items-center justify-between gap-4 text-sm md:mt-28">
            <span className="text-muted">{t.hero.latest}: <span className="font-medium text-ink">Multiservicios Manuel Esteban</span></span>
            {featured.liveUrl && (
              <a href={featured.liveUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-medium text-accent hover:underline">
                {t.projects.live}<NewTab /><ExternalIcon className="h-4 w-4" />
              </a>
            )}
          </figcaption>
        </figure>
      )}
    </section>
  )
}

/* ───────────── SERVICES (bento) ───────────── */
const serviceIcons = [LayoutIcon, GlobeIcon, CodeIcon, ServerIcon]
const tiles = [
  { box: 'lg:col-span-2 bg-gradient-to-br from-accent to-accent-deep text-on-accent dark:to-accent-deep', desc: 'text-on-accent/90', icon: 'bg-on-accent/15 text-on-accent', title: 'text-2xl md:text-3xl', tag: 'border-on-accent/30 bg-on-accent/10 text-on-accent' },
  { box: 'border border-line bg-gradient-to-br from-surface to-tint text-ink', desc: 'text-muted', icon: 'bg-surface text-accent', title: 'text-xl', tag: 'border-line bg-surface text-ink' },
  { box: 'lg:col-start-3 lg:row-span-2 lg:row-start-1 bg-gradient-to-b from-ink via-ink to-accent-deep text-canvas dark:border dark:border-line dark:from-tint dark:via-tint dark:to-accent-deep/60 dark:text-ink', desc: 'text-canvas/80 dark:text-muted', icon: 'bg-canvas/10 text-canvas dark:bg-surface dark:text-accent', title: 'text-2xl', tag: 'border-canvas/25 bg-canvas/10 text-canvas dark:border-line dark:bg-surface dark:text-ink' },
  { box: 'border border-line bg-gradient-to-br from-tint to-accent/15 text-ink', desc: 'text-muted', icon: 'bg-surface text-accent', title: 'text-xl', tag: 'border-line bg-surface text-ink' },
]
const snippet = 'public class Automatizacion\n  : BackgroundService\n{\n  // tu proceso, solo\n}'
export function Services() {
  const { t } = useLang()
  return (
    <section id="servicios" className="section">
      <Reveal><h2 className="h2 max-w-xl">{t.services.title}</h2></Reveal>
      <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
        {t.services.items.map((s, i) => {
          const Icon = serviceIcons[i]
          const st = tiles[i]
          return (
            <Reveal key={s.t} delay={i * 70} className={`flex flex-col justify-between gap-8 rounded-2xl p-7 md:p-8 ${st.box}`}>
              <div className={`grid h-11 w-11 place-items-center rounded-full ${st.icon}`}><Icon className="h-6 w-6" /></div>
              {i === 2 && (
                <pre aria-hidden="true" className="hidden overflow-hidden rounded-xl border border-canvas/15 bg-canvas/5 p-4 font-mono text-[13px] leading-relaxed text-canvas/80 dark:border-line dark:bg-surface dark:text-muted lg:block"><code>{snippet}</code></pre>
              )}
              <div>
                <h3 className={`font-semibold tracking-tight ${st.title}`}>{s.t}</h3>
                <p className={`mt-3 max-w-md leading-relaxed ${st.desc}`}>{s.d}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (<li key={tag} className={`rounded-full border px-3 py-1 font-mono text-xs ${st.tag}`}>{tag}</li>))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ───────────── PROJECTS ───────────── */
function ProjectCard({ p, reverse }: { p: Project; reverse: boolean }) {
  const { t, lang } = useLang()
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className={`grid lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className={`relative min-h-[260px] ${p.highlight && !p.image ? 'bg-gradient-to-br from-accent to-accent-deep text-on-accent' : 'bg-tint'}`}>
          {p.image ? (
            <img src={p.image} alt={p.title} width={1200} height={630} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-4" />
          ) : p.highlight ? (
            <div className="absolute inset-0 grid place-items-center p-8 text-center">
              <div>
                <p className="text-8xl font-semibold tracking-tight md:text-9xl">{p.highlight.value}</p>
                <p className="mt-2 text-base font-medium text-on-accent/90">{p.highlight.label[lang]}</p>
              </div>
            </div>
          ) : (
            <pre className="absolute inset-0 overflow-hidden p-5 font-mono text-[13px] leading-relaxed text-ink"><code>{p.codeSnippet}</code></pre>
          )}
        </div>
        <div className="p-7 md:p-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-medium text-accent">{p.category[lang]}</span>
            <span className="text-muted">{p.year}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{p.title}</h3>
          <p className="mt-3 text-muted">{p.summary[lang]}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-ink">{t.projects.problem}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.problem[lang]}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">{t.projects.solution}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.solution[lang]}</p>
            </div>
          </div>

          <h4 className="mt-6 text-sm font-semibold text-ink">{t.projects.results}</h4>
          <ul className="mt-2 space-y-2">
            {p.results[lang].map((r) => (
              <li key={r} className="flex gap-2 text-sm text-ink">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {r}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.tech.map((x) => <span key={x} className="tag">{x}</span>)}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {p.liveUrl ? (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-primary !py-2.5">{t.projects.live}<NewTab /> <ExternalIcon className="h-4 w-4" /></a>
            ) : p.type === 'client' ? (
              <span className="btn border border-dashed border-line !py-2.5 text-muted">{t.projects.soon}</span>
            ) : null}
            {p.repoUrl && (
              <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5">{t.projects.repo}<NewTab /> <CodeIcon className="h-4 w-4" /></a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

type Filter = 'all' | 'client' | 'software'
function initialFilter(): Filter {
  try {
    const f = new URLSearchParams(window.location.search).get('filter')
    if (f === 'client' || f === 'software') return f
  } catch { /* ignore */ }
  return 'all'
}

export function Projects() {
  const { t } = useLang()
  const [filter, setFilterState] = useState<Filter>(initialFilter)
  const setFilter = (f: Filter) => {
    setFilterState(f)
    try {
      const u = new URL(window.location.href)
      if (f === 'all') u.searchParams.delete('filter'); else u.searchParams.set('filter', f)
      window.history.replaceState(null, '', u)
    } catch { /* ignore */ }
  }
  const list = projects.filter((p) => filter === 'all' || p.type === filter)
  return (
    <section id="proyectos" className="section">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow">{t.projects.eyebrow}</p>
          <h2 className="h2 mt-3">{t.projects.title}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.projects.sub}</p>
        </Reveal>
        <div className="flex gap-2">
          {(['all', 'client', 'software'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === f ? 'bg-ink text-canvas' : 'border border-line text-muted hover:text-ink'}`}
            >
              {t.projects.filters[f]}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 space-y-6">
        {list.map((p, i) => <Reveal key={p.id}><ProjectCard p={p} reverse={i % 2 === 1} /></Reveal>)}
      </div>
    </section>
  )
}

/* ───────────── PROCESS ───────────── */
export function Process() {
  const { t } = useLang()
  return (
    <section id="proceso" className="section">
      <Reveal><h2 className="h2 max-w-xl">{t.process.title}</h2></Reveal>
      <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
        {t.process.steps.map((s, i) => (
          <li key={s.t} className="border-t-2 border-ink pt-5">
            <Reveal delay={i * 90}>
              <h3 className="text-lg font-semibold tracking-tight text-ink">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ───────────── ABOUT ───────────── */
export function About() {
  const { t } = useLang()
  return (
    <section id="sobre-mi" className="section">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="h2">{t.about.title}</h2>
          <p className="mt-6 leading-relaxed text-muted">{t.about.p1}</p>
          <p className="mt-4 leading-relaxed text-muted">{t.about.p2}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.cvUrl && <a href={site.cvUrl} download className="btn-ghost"><DownloadIcon className="h-4 w-4" /> {t.about.cv}</a>}
            {site.github && <a href={site.github} target="_blank" rel="noreferrer" className="btn-ghost">GitHub<NewTab /></a>}
            {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn<NewTab /></a>}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <dl className="divide-y divide-line border-y border-line">
            {(Object.keys(stack) as (keyof typeof stack)[]).map((g) => (
              <div key={g} className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]">
                <dt className="text-sm font-medium text-ink">{t.about.groups[g]}</dt>
                <dd className="flex flex-wrap gap-2">
                  {stack[g].map((x) => <span key={x} className="tag">{x}</span>)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── CONTACT + FOOTER ───────────── */
export function Contact() {
  const { t } = useLang()
  return (
    <section id="contacto" className="section">
      <Reveal className="grid items-center gap-10 rounded-2xl bg-gradient-to-br from-accent to-accent-deep p-8 text-on-accent md:p-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{t.contact.title}</h2>
          <p className="mt-4 max-w-md text-on-accent/85">{t.contact.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={waLink(t.contact.waMsg)} target="_blank" rel="noreferrer" className="btn-inverse">
              <WhatsAppIcon />{t.nav.cta}<NewTab />
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all text-sm font-medium text-on-accent underline-offset-4 hover:underline">
              <MailIcon className="h-5 w-5 shrink-0" />{site.email}
            </a>
          </div>
        </div>
        <CodeWindow title="contacto.ts" className="hidden lg:block">
          <K>const</K> contacto = {'{'}{'\n'}
          {'  '}whatsapp: <S>{`'${site.whatsappLabel}'`}</S>,{'\n'}
          {'  '}correo: <S>{`'${site.email.toLowerCase()}'`}</S>,{'\n'}
          {'  '}disponible: <K>true</K>,{'\n'}
          {'}'}{'\n'}
          <C>// escríbeme y cotizamos</C>
        </CodeWindow>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-muted md:flex-row">
        <span>© {new Date().getFullYear()} {site.brand} · {site.name}</span>
        <span>{t.footer}</span>
      </div>
    </footer>
  )
}

/* ───────────── FLOATING WHATSAPP ───────────── */
export function FloatingWhatsApp() {
  const { t } = useLang()
  return (
    <a
      href={waLink(t.contact.waMsg)}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp ${t.projects.newTab}`}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-on-accent shadow-[0_12px_30px_-10px_rgb(var(--accent)/0.6)] transition active:scale-95 motion-safe:hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
