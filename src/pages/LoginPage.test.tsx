import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LoginPage } from './LoginPage'

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  )
}

describe('LoginPage (funcional)', () => {
  it('muestra la marca y la pestaña de login', () => {
    renderLoginPage()

    expect(screen.getByText('El Pedregal')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})

describe('LoginPage (no funcional - accesibilidad básica)', () => {
  it('expone un landmark main', () => {
    renderLoginPage()
    expect(screen.getAllByRole('main').length).toBeGreaterThanOrEqual(1)
  })
})
