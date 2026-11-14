import type { Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Junta los errores de consola y de página para que ninguna prueba los pase por alto.
export const collectErrors = (page: Page) => {
  const errors: string[] = []
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
  page.on('pageerror', (err) => errors.push(err.message))
  return errors
}

// Solo fallan los problemas de accesibilidad graves o críticos (WCAG 2.1 A/AA).
// Se mide cuando terminan las animaciones de entrada: a media animación el texto aún está semitransparente.
export const seriousA11y = async (page: Page) => {
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)))
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  return violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)
}
