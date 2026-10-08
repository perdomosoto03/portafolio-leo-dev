import type { ReactNode } from 'react'

/* Ventana de código decorativa. Muestra un fragmento real de datos del sitio, no una interfaz falsa.
   Un solo color de acento: palabras clave en acento, comentarios en gris. */
export function CodeWindow({ title, className = '', children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_50px_-24px_rgb(var(--ink)/0.35)] ${className}`}>
      <div className="border-b border-line bg-tint px-4 py-2 font-mono text-[11px] text-muted">{title}</div>
      <pre className="overflow-hidden px-4 py-3 font-mono text-[12px] leading-relaxed text-ink"><code>{children}</code></pre>
    </div>
  )
}

export const K = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>
export const S = ({ children }: { children: ReactNode }) => <span className="font-medium">{children}</span>
export const C = ({ children }: { children: ReactNode }) => <span className="text-muted">{children}</span>
