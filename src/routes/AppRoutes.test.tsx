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
    expect(
      screen.getByRole('heading', { name: 'Portfolio di sviluppo software' }),
    ).toBeInTheDocument()
  })

  it('uses a valid stored language preference for the root route', async () => {
    window.localStorage.setItem('irpw.language-preference', 'en')
    renderRoute('/')

    expect(await screen.findByTestId('location')).toHaveTextContent('/en')
    expect(
      screen.getByRole('heading', { name: 'Software development portfolio' }),
    ).toBeInTheDocument()
  })

  it.each([
    ['/it', 'Portfolio di sviluppo software'],
    ['/it/progetti', 'Prima le evidenze, poi gli aggettivi'],
    ['/it/competenze', 'Competenze'],
    ['/it/metodo', 'Metodo'],
    ['/it/profilo', 'Profilo'],
    ['/it/contatti', 'Contatti'],
    ['/it/privacy', 'Privacy'],
    ['/en', 'Software development portfolio'],
    ['/en/projects', 'Evidence before adjectives'],
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
    renderRoute('/it/progetti/gestore-liste-node')

    await user.click(screen.getByRole('link', { name: "Passa all'inglese", hidden: true }))

    expect(screen.getByTestId('location')).toHaveTextContent('/en/projects/node-list-manager')
    expect(screen.getByRole('heading', { name: 'ITS Node.js Project' })).toBeInTheDocument()
    expect(window.localStorage.getItem('irpw.language-preference')).toBe('en')
  })

  it('keeps privacy discoverable from the footer, not the main navigation', () => {
    renderRoute('/en')

    const mainNavigation = screen.getByRole('navigation', {
      hidden: true,
      name: 'Main navigation',
    })
    expect(mainNavigation).not.toContainElement(screen.getByRole('link', { name: 'Privacy' }))
  })

  it('renders localized unknown routes inside the application shell', () => {
    renderRoute('/en/unknown')

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/en')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the localized Project Detail not-found state for an unknown slug', () => {
    renderRoute('/en/projects/unknown-project')

    expect(screen.getByRole('heading', { name: 'Project not found' })).toBeInTheDocument()
    expect(
      screen.getByText('The requested slug does not match a published project.'),
    ).toBeInTheDocument()
  })

  it('renders Project Detail from the localized content context with claims and evidence', () => {
    renderRoute('/en/projects/node-list-manager')

    expect(screen.getByRole('heading', { name: 'ITS Node.js Project' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Claims and evidence' })).toBeInTheDocument()
    expect(screen.getAllByText('Demonstrated')).toHaveLength(3)
    expect(screen.getByRole('link', { name: /Open repository/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node',
    )
  })

  it('exposes the complete design-system review surface only in development builds', () => {
    renderRoute('/__dev/design-system')

    expect(screen.getByRole('heading', { name: 'Pop! Digital Studio' })).toBeInTheDocument()
    expect(screen.getByText('Development only · IRPW-17')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Focus, disabled state and optional motion' }),
    ).toBeInTheDocument()
  })
})
