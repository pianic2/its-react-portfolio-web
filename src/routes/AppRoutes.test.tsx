import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { DigitalStudioProvider } from '../theme'
import { AppRoutes } from './AppRoutes'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}</output>
}

function renderRoute(path: string) {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
        <LocationProbe />
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('localized application routes', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('redirects the root to the deterministic Italian default', async () => {
    renderRoute('/')

    expect(await screen.findByTestId('location')).toHaveTextContent('/it')
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })

  it('uses a valid stored language preference for the root route', async () => {
    window.localStorage.setItem('irpw.language-preference', 'en')
    renderRoute('/')

    expect(await screen.findByTestId('location')).toHaveTextContent('/en')
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })

  it.each([
    ['/it', 'Home'],
    ['/it/progetti', 'Progetti'],
    ['/it/competenze', 'Competenze'],
    ['/it/metodo', 'Metodo'],
    ['/it/profilo', 'Profilo'],
    ['/it/contatti', 'Contatti'],
    ['/it/privacy', 'Privacy'],
    ['/en', 'Home'],
    ['/en/projects', 'Projects'],
    ['/en/skills', 'Skills'],
    ['/en/method', 'Method'],
    ['/en/profile', 'Profile'],
    ['/en/contact', 'Contact'],
    ['/en/privacy', 'Privacy'],
  ])('renders %s as %s', (path, heading) => {
    renderRoute(path)

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })

  it('switches to the equivalent localized project detail route and stores the preference', async () => {
    const user = userEvent.setup()
    renderRoute('/it/progetti/domain-modeling')

    await user.click(screen.getByRole('link', { name: 'English' }))

    expect(screen.getByTestId('location')).toHaveTextContent('/en/projects/domain-modeling')
    expect(screen.getByRole('heading', { name: 'Project detail' })).toBeInTheDocument()
    expect(window.localStorage.getItem('irpw.language-preference')).toBe('en')
  })

  it('keeps privacy discoverable from the footer, not the main navigation', () => {
    renderRoute('/en')

    const mainNavigation = screen.getByRole('navigation', {
      name: 'Main navigation',
    })
    expect(mainNavigation).not.toContainElement(screen.getByRole('link', { name: 'Privacy' }))
  })

  it('renders an accessible localized not-found page', () => {
    renderRoute('/en/unknown')

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/en')
  })

  it('exposes the design-system review surface only in development builds', () => {
    renderRoute('/__dev/design-system')

    expect(screen.getByRole('heading', { name: 'Pop! Digital Studio' })).toBeInTheDocument()
    expect(screen.getByText('Development only · IRPW-15')).toBeInTheDocument()
  })
})
