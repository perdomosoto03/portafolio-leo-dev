import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { strings } from '../i18n/strings'

// Devuelve la "forma" de un objeto: rutas de claves y largo de las listas, sin los textos.
const shape = (value: unknown, path = ''): string[] => {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))]
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => [`${path}.${k}`, ...shape(v, `${path}.${k}`)])
  return []
}

const publicFile = (url: string) => join(process.cwd(), 'public', url)

describe('Contenido', () => {
  it('español e inglés tienen exactamente los mismos textos', () => {
    expect(shape(strings.en)).toEqual(shape(strings.es))
  })

  it('ningún texto está vacío', () => {
    const empty: string[] = []
    const walk = (v: unknown, path: string) => {
      if (typeof v === 'string') { if (!v.trim()) empty.push(path) }
      else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, `${path}.${k}`))
    }
    walk(strings, 'strings')
    walk(projects, 'projects')
    expect(empty).toEqual([])
  })

  it('cada proyecto tiene id único y su contenido en ES y EN', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const p of projects) {
      for (const field of [p.category, p.summary, p.problem, p.solution]) {
        expect(field.es.trim(), p.id).not.toBe('')
        expect(field.en.trim(), p.id).not.toBe('')
      }
      expect(p.results.es.length, p.id).toBe(p.results.en.length)
    }
  })

  it('todas las imágenes de los proyectos existen en public/', () => {
    for (const p of projects) {
      const urls = [p.image, ...(p.imageSrcSet?.split(',').map((s) => s.trim().split(' ')[0]) ?? [])]
      for (const url of urls.filter((u): u is string => Boolean(u))) {
        expect(existsSync(publicFile(url)), `${p.id}: ${url}`).toBe(true)
      }
    }
  })
})
