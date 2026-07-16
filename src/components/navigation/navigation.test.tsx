import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { DigitalStudioProvider } from '../../theme'
import { LanguageSwitch } from './LanguageSwitch'
import { PrimaryNavigation } from './PrimaryNavigation'
import { SiteHeader } from './SiteHeader'
import { ThemeToggle } from './ThemeToggle'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}</output>
}

function renderWithProviders(children: ReactNode, initialPath = '/it') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        {children}
        <LocationProbe />
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('shared navigation primitives', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('marks the current route structurally and with aria-current', () => {
    renderWithProviders(<PrimaryNavigation language="it" />, '/it/progetti')

    expect(screen.getByRole('link', { name: 'Progetti' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('switches through one destination-language flag control and stores the preference', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LanguageSwitch />, '/it/progetti/gestore-liste-node')

    expect(screen.getByTestId('language-flag-en')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: "Passa all'inglese" }))

    expect(screen.getByTestId('location')).toHaveTextContent('/en/projects/node-list-manager')
    expect(window.localStorage.getItem('irpw.language-preference')).toBe('en')
  })

  it('exposes the active theme as a pressed toggle state', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ThemeToggle language="it" />)

    const lightControl = screen.getByRole('button', { name: 'Attiva il tema scuro' })
    expect(lightControl).toHaveAttribute('aria-pressed', 'false')

    await user.click(lightControl)

    expect(screen.getByRole('button', { name: 'Attiva il tema chiaro' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('opens and closes the mobile navigation drawer', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SiteHeader language="it" />)

    fireEvent.click(screen.getByRole('button', { name: 'Apri navigazione', hidden: true }))

    expect(screen.getByRole('heading', { name: 'Navigazione' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Chiudi navigazione' }))
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Navigazione' })).not.toBeInTheDocument()
    })
  })
})
