import { expect, test } from '@playwright/test'
import { collectErrors, seriousA11y } from './helpers'

const path = '/diseno-web-republica-dominicana'

// Si el servidor no sirviera la ruta, caería en la portada: por eso todas las pruebas miran el H1 de esta página.
test('la página de diseño web carga con su propio título y canonical', async ({ page }) => {
  const errors = collectErrors(page)
  await page.goto(path)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Diseño web para negocios en República Dominicana')
  await expect(page).toHaveTitle('Diseño web para negocios en República Dominicana | Leo Dev')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://leodevrd.com/diseno-web-republica-dominicana')
  for (const id of ['incluye', 'precios', 'proceso', 'caso', 'preguntas', 'contacto']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForLoadState('networkidle')
  expect(errors).toEqual([])
})

test('la portada enlaza a la página de diseño web', async ({ page }) => {
  await page.goto('/')
  await page.locator(`#servicios a[href="${path}"]`).click()
  await expect(page).toHaveURL(new RegExp(`${path}$`))
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Diseño web')
})

test('los enlaces a secciones llevan a la portada', async ({ page }) => {
  await page.goto(path)
  await expect(page.locator('footer a[href="/#proyectos"]')).toBeAttached()
})

test('el enlace de WhatsApp lleva el número correcto', async ({ page }) => {
  await page.goto(path)
  const href = await page.locator('[data-floating-wa]').getAttribute('href')
  expect(href).toContain('https://wa.me/18294775920')
})

test('sin problemas graves de accesibilidad en modo claro', async ({ page }) => {
  await page.goto(path)
  expect(await seriousA11y(page)).toEqual([])
})

test('sin problemas graves de accesibilidad en modo oscuro', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  await page.goto(path)
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await seriousA11y(page)).toEqual([])
})
