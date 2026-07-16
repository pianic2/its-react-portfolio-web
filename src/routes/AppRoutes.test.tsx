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
      screen.getByRole('heading', {
        name: 'Trasformo idee complesse in prodotti utili e comprensibili.',
      }),
    ).toBeInTheDocument()
  })

  it('uses a valid stored language preference for the root route', async () => {
    window.localStorage.setItem('irpw.language-preference', 'en')
    renderRoute('/')

    expect(await screen.findByTestId('location')).toHaveTextContent('/en')
    expect(
      screen.getByRole('heading', {
        name: 'I turn complex ideas into useful, understandable products.',
      }),
    ).toBeInTheDocument()
  })

  it.each([
    ['/it', 'Trasformo idee complesse in prodotti utili e comprensibili.'],
    ['/it/progetti', 'Partiamo dal problema, non dalla tecnologia.'],
    ['/it/competenze', 'Competenze'],
    ['/it/metodo', 'Metodo'],
    ['/it/profilo', 'Profilo'],
    ['/it/contatti', 'Contatti'],
    ['/it/privacy', 'Privacy'],
    ['/en', 'I turn complex ideas into useful, understandable products.'],
    ['/en/projects', 'Start with the problem, not the technology.'],
    ['/en/skills', 'Skills'],
    ['/en/method', 'Method'],
    ['/en/profile', 'Profile'],
    ['/en/contact', 'Contact'],
    ['/en/privacy', 'Privacy'],
  ])('renders %s as %s', (path, heading) => {
    renderRoute(path)

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })

  it('renders the exact English Home narrative and actions', () => {
    renderRoute('/en')

    expect(screen.getByText('SOFTWARE, HARDWARE AND REAL PROBLEMS')).toBeInTheDocument()
    expect(
      screen.getByText(
        'I build projects that connect code, devices and people — from smart-home sensors to web APIs. Every project explains what works today, what still needs to be built and why the technical choices matter.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore the projects' })).toHaveAttribute(
      'href',
      '/en/projects',
    )
    expect(screen.getByRole('link', { name: /View GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
    expect(screen.getByRole('link', { name: 'Let’s talk' })).toHaveAttribute('href', '/en/contact')
  })

  it('renders the exact Italian Home narrative and actions', () => {
    renderRoute('/it')

    expect(screen.getByText('SOFTWARE, HARDWARE E PROBLEMI REALI')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Realizzo progetti che collegano codice, dispositivi e persone — dai sensori per la casa intelligente alle API web. Ogni progetto spiega cosa funziona oggi, cosa deve ancora essere costruito e perché le scelte tecniche sono importanti.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esplora i progetti' })).toHaveAttribute(
      'href',
      '/it/progetti',
    )
    expect(screen.getByRole('link', { name: /Vedi GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
    expect(screen.getByRole('link', { name: 'Parliamone' })).toHaveAttribute('href', '/it/contatti')
  })

  it('renders the exact English and Italian Projects introductions', () => {
    const english = renderRoute('/en/projects')

    expect(screen.getByText('PROJECT INDEX')).toBeInTheDocument()
    expect(
      screen.getByText(
        'These projects are not presented as a list of frameworks. Each one starts from a concrete need and shows the solution, the decisions behind it and the current limits.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Choose a project to understand what it is for, how it works and what stage it has reached.',
      ),
    ).toBeInTheDocument()

    english.unmount()
    renderRoute('/it/progetti')

    expect(screen.getByText('INDICE DEI PROGETTI')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Questi progetti non sono presentati come un elenco di framework. Ognuno parte da un bisogno concreto e mostra la soluzione, le decisioni adottate e i limiti attuali.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Scegli un progetto per capire a cosa serve, come funziona e a quale fase è arrivato.',
      ),
    ).toBeInTheDocument()
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
    expect(screen.getByRole('heading', { name: 'The idea' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What has been built' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Why it matters' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Where it stands today' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What you can verify' })).toBeInTheDocument()
    expect(screen.getAllByText('Backed by evidence')).toHaveLength(1)
    expect(screen.getByRole('link', { name: /Open the repository/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node',
    )
    expect(screen.getByRole('link', { name: /Modular Express routes/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node/blob/main/src/server.js',
    )
    expect(
      screen.getByText(
        'The backend separates the endpoints used to manage lists and tasks into focused route modules.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /SQLite persistence/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Automated tests/ })).toBeInTheDocument()
    expect(
      screen.getByText(
        'Application data is stored in a local SQLite database instead of disappearing when the server restarts.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'The test suite verifies the expected behaviour of the main backend operations.',
      ),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Documented scope' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Limitations' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Claims and evidence' })).not.toBeInTheDocument()
  })

  it('renders the Italian Project Detail narrative through the same context contract', () => {
    renderRoute('/it/progetti/gestore-liste-node')

    expect(screen.getByRole('heading', { name: 'L’idea' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cosa è stato costruito' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Perché conta' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'A che punto è oggi' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cosa puoi verificare' })).toBeInTheDocument()
    expect(screen.getAllByText('Supportato da evidenze')).toHaveLength(1)
  })

  it('does not expose the internal unvalidated marker on the HomeEdge detail page', () => {
    renderRoute('/en/projects/homeedge-ai-platform')

    expect(screen.queryByText(/\[UNVALIDATED\]/)).not.toBeInTheDocument()
    expect(
      screen.getByText(/planned directions that have not been demonstrated yet/),
    ).toBeInTheDocument()
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
