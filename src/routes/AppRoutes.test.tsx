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
        name: 'Costruisco progetti per capire come funzionano davvero le cose.',
      }),
    ).toBeInTheDocument()
  })

  it('uses a valid stored language preference for the root route', async () => {
    window.localStorage.setItem('irpw.language-preference', 'en')
    renderRoute('/')

    expect(await screen.findByTestId('location')).toHaveTextContent('/en')
    expect(
      screen.getByRole('heading', {
        name: 'I build projects to understand how things really work.',
      }),
    ).toBeInTheDocument()
  })

  it.each([
    ['/it/competenze', 'Competenze'],
    ['/it/metodo', 'Metodo'],
    ['/it/profilo', 'Profilo'],
    ['/it/contatti', 'Contatti'],
    ['/it/privacy', 'Privacy'],
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

    expect(screen.getByText('FULL STACK DEVELOPER')).toBeInTheDocument()
    expect(screen.getByText('IN TRAINING')).toBeInTheDocument()
    expect(screen.getByText(/I’m Niccolò, a Full Stack Development student at/)).toBeInTheDocument()
    const trainingLink = screen.getByRole('link', { name: /ITS Prodigi/ })
    expect(trainingLink).toHaveAttribute('href', 'https://www.itsprodigi.it/')
    expect(trainingLink).toHaveAttribute('target', '_blank')
    expect(trainingLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link', { name: 'View my projects' })).toHaveAttribute(
      'href',
      '/en/projects',
    )
    expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
    expect(screen.getByRole('link', { name: 'See how I work' })).toHaveAttribute(
      'href',
      '/en/method',
    )
    expect(
      screen.getByRole('heading', { name: 'From code to a complete product.' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('learning-items').children).toHaveLength(6)
    expect(
      screen.getByRole('heading', { name: 'Three projects from different parts of my journey.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Different tools for different projects.' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('skill-groups').children).toHaveLength(6)
    expect(
      screen.getByRole('heading', { name: 'Understand first, then build.' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('process-steps').children).toHaveLength(4)
    expect(
      screen.getByRole('heading', {
        name: 'I’m looking for opportunities to learn, contribute and challenge myself.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('renders the exact Italian Home narrative and actions', () => {
    renderRoute('/it')

    expect(screen.getByText('FULL STACK DEVELOPER')).toBeInTheDocument()
    expect(screen.getByText('IN FORMAZIONE')).toBeInTheDocument()
    expect(
      screen.getByText(/Mi chiamo Niccolò e studio sviluppo Full Stack presso/),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Guarda i progetti' })).toHaveAttribute(
      'href',
      '/it/progetti',
    )
    expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
    expect(screen.getByRole('link', { name: 'Scopri il mio metodo' })).toHaveAttribute(
      'href',
      '/it/metodo',
    )
    expect(
      screen.getByRole('heading', { name: 'Dal codice al prodotto completo.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Tecnologie diverse, scelte in base al progetto.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Prima capire, poi costruire.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Sto cercando occasioni per imparare, contribuire e mettermi alla prova.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('renders the exact English and Italian Projects introductions', () => {
    const english = renderRoute('/en/projects')

    expect(screen.getByText('MY PROJECTS')).toBeInTheDocument()
    expect(
      screen.getByText(
        'This page brings together three projects with very different goals: a personal product that is still evolving and two projects developed during my ITS training.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Each project explains where it started, what has been built, its current stage and where to inspect the work.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Projects with different goals' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: 'What I worked on' })).toHaveLength(3)
    expect(screen.getAllByRole('heading', { name: 'What I would improve' })).toHaveLength(3)
    expect(
      screen.getByRole('heading', { name: 'What changes from one project to another?' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('project-comparison')).toHaveAttribute(
      'data-layout',
      'responsive-panels',
    )
    expect(
      screen.getByRole('heading', {
        name: 'These are not perfect projects. They are projects that are helping me grow.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Want to see the work behind the projects?' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open HomeEdge' })).toHaveAttribute(
      'href',
      '/en/projects/homeedge-ai-platform',
    )
    expect(screen.getByRole('link', { name: 'Read about my approach' })).toHaveAttribute(
      'href',
      '/en/method',
    )
    expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/en/contact')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.queryByText('[UNVALIDATED]')).not.toBeInTheDocument()

    english.unmount()
    renderRoute('/it/progetti')

    expect(screen.getByText('I MIEI PROGETTI')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Questa pagina raccoglie tre progetti con obiettivi molto diversi: un prodotto personale ancora in evoluzione e due lavori sviluppati durante il percorso ITS.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Per ogni progetto trovi il problema di partenza, ciò che è stato realizzato, lo stato attuale e i collegamenti per approfondire.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Progetti con obiettivi diversi' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: 'Cosa ho curato' })).toHaveLength(3)
    expect(screen.getAllByRole('heading', { name: 'Cosa vorrei migliorare' })).toHaveLength(3)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('renders the expanded HomeEdge evidence and transparency narrative in English', () => {
    renderRoute('/en/projects/homeedge-ai-platform')

    expect(
      screen.getByRole('heading', { name: 'Product vision and MVP boundaries' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Read the Product Vision/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/homeedge-ai-platform/blob/main/docs/product/product-vision.md',
    )
    expect(
      screen.getByRole('heading', { name: 'Project progress and stakeholder review' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Open the HomeEdge stakeholder space/ }),
    ).toHaveAttribute('href', 'https://niccolopiazzi01.atlassian.net/wiki/spaces/IEHAP/overview')
    expect(
      screen.getByText(/The project is managed transparently across GitHub, Jira and Confluence/),
    ).toBeInTheDocument()
  })

  it('renders the expanded HomeEdge evidence and transparency narrative in Italian', () => {
    renderRoute('/it/progetti/homeedge-ai-platform')

    expect(
      screen.getByRole('heading', { name: 'Visione del prodotto e confini dell’MVP' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Leggi la Product Vision/ })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Avanzamento del progetto e stakeholder review' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Apri lo spazio stakeholder di HomeEdge/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Il progetto viene gestito in modo trasparente attraverso GitHub, Jira e Confluence/,
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
