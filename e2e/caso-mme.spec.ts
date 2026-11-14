import { expect, test } from '@playwright/test'
import { collectErrors, seriousA11y } from './helpers'

const path = '/proyectos/multiservicios-manuel-esteban'

// Si el servidor no sirviera la ruta, caería en la portada: por eso las pruebas miran el H1 de esta página.
test('el caso de Multiservicios carga con su propio título y canonical', async ({ page }) => {
  const errors = collectErrors(page)
  await page.goto(path)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sitio web de Multiservicios Manuel Esteban')
  await expect(page).toHaveTitle('Caso: sitio web de Multiservicios Manuel Esteban | Leo Dev')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://leodevrd.com${path}`)
  for (const id of ['encargo', 'solucion', 'tecnica', 'contacto']) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForLoadState('networkidle')
  expect(errors).toEqual([])
})

test('la portada enlaza al caso desde el proyecto', async ({ page }) => {
  await page.goto('/')
  await page.locator(`#proyectos a[href="${path}"]`).click()
  await expect(page).toHaveURL(new RegExp(`${path}$`))
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Multiservicios')
})

test('el caso enlaza a la página de diseño web', async ({ page }) => {
  await page.goto(path)
  await page.locator('main a[href="/diseno-web-republica-dominicana"]').click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Diseño web para negocios en República Dominicana')
})

test('el enlace de WhatsApp del caso lleva el número correcto', async ({ page }) => {
  await page.goto(path)
  const href = await page.locator('[data-umami-event-lugar="caso-mme"]').getAttribute('href')
  expect(href).toContain('https://wa.me/18294775920')
})

test('caso sin problemas graves de accesibilidad en modo claro', async ({ page }) => {
  await page.goto(path)
  expect(await seriousA11y(page)).toEqual([])
})

test('caso sin problemas graves de accesibilidad en modo oscuro', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  await page.goto(path)
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await seriousA11y(page)).toEqual([])
})
