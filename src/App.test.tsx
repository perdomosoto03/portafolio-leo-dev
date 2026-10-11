import { describe, expect, it } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { setViewportWidth } from './test/setup'

const renderApp = () => {
  const user = userEvent.setup()
  render(<App />)
  return user
}

describe('Portafolio', () => {
  it('muestra el nombre y todas las secciones', () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Leandro\s*Perdomo/i)
    for (const id of ['main', 'proyectos', 'servicios', 'proceso', 'sobre-mi', 'contacto']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
  })

  it('cambia a inglés y lo recuerda', async () => {
    const user = renderApp()
    await user.click(screen.getAllByRole('button', { name: /EN \(English\)/ })[0]!)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
  })

  it('activa el modo oscuro y lo guarda', async () => {
    const user = renderApp()
    await user.click(screen.getAllByRole('button', { name: 'Cambiar a modo oscuro' })[0]!)
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('el acordeón de proyectos abre y cierra cada proyecto', async () => {
    const user = renderApp()
    const rows = within(document.getElementById('proyectos')!).getAllByRole('button', { expanded: true })
    expect(rows).toHaveLength(1) // el primero empieza abierto

    const second = within(document.getElementById('proyectos')!).getAllByRole('button', { expanded: false })[0]!
    const panel = document.getElementById(second.getAttribute('aria-controls')!)!
    expect(panel).not.toBeVisible()
    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(panel).toBeVisible()
  })
})

describe('Menú móvil', () => {
  it('abre, deja el fondo inactivo y se cierra con Escape devolviendo el foco', async () => {
    const user = renderApp()
    const menuButton = screen.getByRole('button', { name: 'Menú' })
    await user.click(menuButton)

    const dialog = screen.getByRole('dialog', { name: 'Menú del sitio' })
    expect(dialog).toBeInTheDocument()
    expect(document.getElementById('main')!.inert).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.getElementById('main')!.inert).toBe(false)
    expect(document.body.style.overflow).toBe('')
    expect(menuButton).toHaveFocus()
  })

  it('se cierra solo si la pantalla pasa a tamaño escritorio', async () => {
    const user = renderApp()
    await user.click(screen.getByRole('button', { name: 'Menú' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    act(() => setViewportWidth(1280))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
