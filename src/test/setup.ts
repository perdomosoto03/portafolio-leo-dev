import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom no trae matchMedia: lo simulamos con un ancho de pantalla configurable por prueba.
type Listener = (e: MediaQueryListEvent) => void
const listeners = new Set<{ query: string; cb: Listener }>()
let viewportWidth = 390

const matches = (query: string) => {
  const min = /min-width:\s*(\d+)px/.exec(query)
  return min ? viewportWidth >= Number(min[1]) : false
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      media: query,
      get matches() {
        return matches(query)
      },
      onchange: null,
      addEventListener: (_type: string, cb: Listener) => listeners.add({ query, cb }),
      removeEventListener: (_type: string, cb: Listener) => {
        for (const l of listeners) if (l.cb === cb) listeners.delete(l)
      },
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: () => true,
    }) as unknown as MediaQueryList,
})

/** Cambia el ancho simulado y avisa a quien escucha media queries (como al girar una tablet). */
export function setViewportWidth(width: number) {
  viewportWidth = width
  for (const { query, cb } of [...listeners]) cb({ matches: matches(query), media: query } as MediaQueryListEvent)
}

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.className = ''
  document.documentElement.lang = 'es'
  viewportWidth = 390
})
