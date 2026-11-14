import { describe, expect, it } from 'vitest'
import { render } from './entry-server'
import { designHead, mmeCaseHead } from './pages'

describe('Prerender', () => {
  it('genera el contenido de la portada sin JavaScript', () => {
    const html = render()
    expect(html).toMatch(/<h1[\s\S]*diseño web y software a medida en República Dominicana[\s\S]*<\/h1>/)
    expect(html).toContain('Precios')
    expect(html).toContain('wa.me/')
  })

  it('genera la página de diseño web sin JavaScript', () => {
    const html = render('design')
    expect(html).toMatch(/<h1[^>]*>Diseño web para negocios en República Dominicana<\/h1>/)
    expect(html).toContain('RD$ 15,000')
    expect(html).toContain('RD$ 25,000')
    expect(html).toContain('wa.me/')
    // En esta página los enlaces a secciones deben apuntar a la portada, no a un ancla que no existe.
    expect(html).toContain('href="/#proyectos"')
    expect(html).not.toContain('href="#proyectos"')
  })

  it('el head de la página de diseño web cabe en los límites de Google', () => {
    expect(designHead.title.length).toBeLessThanOrEqual(60)
    expect(designHead.description.length).toBeLessThanOrEqual(160)
    expect(designHead.url).toBe('https://leodevrd.com/diseno-web-republica-dominicana')
  })

  it('genera la página del caso de Multiservicios sin JavaScript', () => {
    const html = render('case-mme')
    expect(html.match(/<h1/g)).toHaveLength(1)
    expect(html).toMatch(/<h1[^>]*>Sitio web de Multiservicios Manuel Esteban<\/h1>/)
    expect(html).toContain('Control del comején')
    expect(html).toContain('RD$ 25,000')
    expect(html).toContain('href="/diseno-web-republica-dominicana"')
    expect(html).toContain('wa.me/')
    expect(html).not.toContain('href="#proyectos"')
  })

  it('la portada y la página de diseño web enlazan al caso', () => {
    expect(render()).toContain('href="/proyectos/multiservicios-manuel-esteban"')
    expect(render('design')).toContain('href="/proyectos/multiservicios-manuel-esteban"')
  })

  it('el head del caso cabe en los límites de Google', () => {
    expect(mmeCaseHead.title.length).toBeLessThanOrEqual(60)
    expect(mmeCaseHead.description.length).toBeLessThanOrEqual(160)
    expect(mmeCaseHead.url).toBe('https://leodevrd.com/proyectos/multiservicios-manuel-esteban')
  })
})
