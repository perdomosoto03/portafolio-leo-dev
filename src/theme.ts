export type Theme = 'light' | 'dark'

export const getTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function setTheme(t: Theme) {
  document.documentElement.classList.toggle('dark', t === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#101114' : '#F6F6F4')
  try { localStorage.setItem('theme', t) } catch { /* ignore */ }
  window.dispatchEvent(new Event('themechange'))
}

export const subscribeTheme = (cb: () => void) => {
  window.addEventListener('themechange', cb)
  return () => window.removeEventListener('themechange', cb)
}
