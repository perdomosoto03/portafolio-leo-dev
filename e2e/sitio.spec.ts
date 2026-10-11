import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Junta los errores de consola y de página para que ninguna prueba los pase por alto.
const collectErrors = (page: Page) => {
  const errors: string[] = []
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
  page.on('pageerror', (err) => errors.push(err.message))
  return errors
}

// Solo fallan los problemas de accesibilidad graves o críticos (WCAG 2.1 A/AA).
// Se mide cuando terminan las animaciones de entrada: a media animación el texto aún está semitransparente.
const seriousA11y = async (page: Page) => {
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)))
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  return violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)
}

test('carga sin errores y muestra todas las secciones', async ({ page }) => {
  const errors = collectErrors(page)
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Leandro/i)
  for (const id of ['proyectos', 'servicios', 'proceso', 'sobre-mi', 'contacto']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForLoadState('networkidle')
  expect(errors).toEqual([])
})

test('sin problemas graves de accesibilidad en modo claro', async ({ page }) => {
  await page.goto('/')
  expect(await seriousA11y(page)).toEqual([])
})

test('sin problemas graves de accesibilidad en modo oscuro', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await seriousA11y(page)).toEqual([])
})

test('el enlace de WhatsApp lleva el número correcto', async ({ page }) => {
  await page.goto('/')
  const href = await page.locator('[data-floating-wa]').getAttribute('href')
  expect(href).toContain('https://wa.me/18294775920')
})

test('menú móvil: abre, navega a una sección y se cierra', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'el menú de pantalla completa es solo para celular')
  await page.goto('/')
  await page.getByRole('button', { name: 'Menú' }).click()
  const dialog = page.getByRole('dialog', { name: 'Menú del sitio' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('link', { name: 'Proyectos' }).click()
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(/#proyectos$/)
})
