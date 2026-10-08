import type { ReactNode } from 'react'

/* Símbolos de programación muy tenues detrás de la página. Solo decoración. */
function Sym({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`absolute select-none font-mono font-semibold text-accent ${className}`}>{children}</span>
}

export default function CodeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Sym className="right-[6%] top-[66%] text-7xl opacity-[0.06] md:text-9xl">{'=>'}</Sym>
      <Sym className="left-[5%] top-[88%] text-7xl opacity-[0.06] md:text-9xl">{'01'}</Sym>
    </div>
  )
}
