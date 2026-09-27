import { render, screen, within } from '@testing-library/react'
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

  it('shows project contribution and direct claim-to-evidence links', async () => {
    renderRoute('/en/projects/its-library-api-laravel')

    expect(await screen.findByRole('heading', { name: 'What I worked on' })).toBeInTheDocument()
    expect(screen.getByText(/I worked on the API structure/)).toBeInTheDocument()
    expect(screen.getByText('Implemented project')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /Original relationship diagram connecting books/ }),
    ).toBeInTheDocument()
    const claim = screen.getByText(
      'The repository documents REST resources for books, authors and categories.',
    )
    const claimRow = claim.closest('li')
    expect(claimRow).not.toBeNull()
    expect(
      within(claimRow as HTMLElement).getByRole('link', { name: 'Documented REST endpoints' }),
    ).toHaveAttribute('href', '#project-evidence-library-rest-endpoints')
    expect(document.getElementById('project-evidence-library-rest-endpoints')).toBeInTheDocument()
  })

  it('reveals linked evidence with native pointer and keyboard-operable disclosure', async () => {
    const user = userEvent.setup()
    renderRoute('/en/projects/its-library-api-laravel')

    const label = await screen.findByRole('heading', { name: 'Documented REST endpoints' })
    const disclosure = label.closest('summary') as HTMLElement
    expect(disclosure).not.toBeNull()
    const details = disclosure.closest('details')
    expect(details).not.toBeNull()
    expect(details).not.toHaveAttribute('open')

    await user.click(disclosure)
    expect(details).toHaveAttribute('open')
    expect(screen.getByText(/The README lists public and protected operations/)).toBeVisible()

    disclosure.focus()
    expect(disclosure).toHaveFocus()
  })

  it.each([
    ['/it/competenze', 'Dal problema al software che puoi usare, capire e verificare.'],
    ['/it/metodo', 'Prima la direzione. Poi la velocità.'],
    [
      '/it/profilo',
      'Ho trovato nell’informatica il modo di trasformare curiosità e logica in qualcosa di concreto.',
    ],
    ['/it/contatti', 'Raccontami su cosa stai lavorando.'],
    ['/it/privacy', 'Informazioni sul form di contatto.'],
    ['/en/skills', 'From a problem to software people can use, understand and verify.'],
    ['/en/method', 'Direction first. Then speed.'],
    [
      '/en/profile',
      'I found in software the way to turn curiosity and logic into something concrete.',
    ],
    ['/en/contact', 'Tell me what you are working on.'],
    ['/en/privacy', 'How the contact form handles your data.'],
  ])('renders %s as %s', async (path, heading) => {
    renderRoute(path)

    // The lazy Italian Method route can take longer to settle under full-suite load.
    const renderedHeading =
      path === '/it/metodo'
        ? await screen.findByRole('heading', { name: heading }, { timeout: 5_000 })
        : await screen.findByRole('heading', { name: heading })

    expect(renderedHeading).toBeInTheDocument()
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
    expect(
      screen.getByRole('heading', { name: 'From code to a complete product.' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('learning-items').children).toHaveLength(5)
    expect(
      screen.getByRole('heading', { name: 'Three projects from different stages of my journey.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Different tools for different projects.' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('skill-groups').children).toHaveLength(6)
    expect(screen.getByRole('link', { name: 'View my skill' })).toHaveAttribute(
      'href',
      '/en/skills',
    )
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

  it('keeps the Home signature readable, shows project proof and a single primary route', async () => {
    renderRoute('/en')

    await screen.findByRole('heading', {
      name: 'I build projects to understand how things really work.',
    })
    expect(getComputedStyle(screen.getByText('FULL STACK DEVELOPER')).color).toBe(
      'var(--mui-palette-text-primary)',
    )
    expect(screen.getByTestId('home-hero-project-proof')).toHaveTextContent('HomeEdge AI Platform')
    expect(screen.getByTestId('home-hero-project-proof').querySelector('img')).toHaveAttribute(
      'data-project-artwork',
      'homeedge-ai-platform',
    )
    expect(screen.getByTestId('home-hero-primary-cta')).toHaveAttribute('href', '/en/projects')
    expect(screen.getByTestId('home-hero')).not.toHaveTextContent('See how I work')
  })

  it('keeps Home learning articles at the standard structural surface level', async () => {
    renderRoute('/en')

    const articles = (await screen.findByTestId('learning-items')).querySelectorAll('article')
    expect(articles).toHaveLength(5)
    expect(screen.getByText('Preferred Stack')).toBeInTheDocument()
    expect(
      screen.getByText('Preferred Stack').closest('[data-capability-kind="preference"]'),
    ).toBeInTheDocument()

    for (const article of articles) {
      expect(getComputedStyle(article).borderRadius).toBe('12px')
      expect(getComputedStyle(article).boxShadow).toBe('none')
    }
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
    expect(
      screen.getByRole('heading', { name: 'Dal codice al prodotto completo.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Tecnologie diverse, scelte in base al progetto.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esplora le mie competenze' })).toHaveAttribute(
      'href',
      '/it/competenze',
    )
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
    expect(screen.queryByRole('heading', { name: 'What I worked on' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'What I would improve' })).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'What changes from one project to another?' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'These are not perfect projects. They are projects that are helping me grow.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Want to see the work behind the projects?' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/en/contact')
    expect(screen.getByRole('link', { name: 'Read about my approach' })).toHaveAttribute(
      'href',
      '/en/method',
    )
    expect(screen.getByRole('link', { name: /Visit my GitHub profile/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
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
    expect(screen.queryByRole('heading', { name: 'Cosa ho curato' })).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Cosa vorrei migliorare' }),
    ).not.toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('places project identity before informative artwork in the Projects index', async () => {
    renderRoute('/en/projects')

    const guide = await screen.findByRole('complementary', {
      name: 'Projects with different goals',
    })
    const firstProject = screen.getByRole('article', { name: 'HomeEdge AI Platform' })
    const artwork = within(firstProject).getByRole('img')
    const title = within(firstProject).getByRole('heading', { name: 'HomeEdge AI Platform' })

    expect(guide).toContainElement(
      screen.getByText(
        'The badge on each card explains where the project comes from. HomeEdge is a personal project I intend to keep developing; the other two were created through ITS assignments and exercises.',
      ),
    )
    expect(artwork).toHaveAttribute('data-artwork-provenance', 'original')
    expect(title.compareDocumentPosition(artwork) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('opens HomeEdge evidence and shows the transparency narrative in English', async () => {
    const user = userEvent.setup()
    renderRoute('/en/projects/homeedge-ai-platform')

    const details = screen.getByTestId('project-evidence-details-homeedge-product-vision')
    const summary = within(details)
      .getByText('Product vision and MVP boundaries')
      .closest('summary') as HTMLElement
    expect(
      summary.parentElement?.querySelector('[data-evidence-disclosure-indicator]'),
    ).not.toBeNull()
    await user.click(summary)
    expect(
      screen
        .getAllByText(
          'The Product Vision explains what HomeEdge is intended to become, which capabilities belong to the current MVP and which ideas remain outside its present scope.',
        )
        .some((element) => element.closest('details')?.open),
    ).toBe(true)
    expect(screen.getByRole('link', { name: /Read the Product Vision/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/homeedge-ai-platform/blob/main/docs/product/product-vision.md',
    )
    expect(
      screen.getByText(/The public repository is the technical source of truth/),
    ).toBeInTheDocument()
  })

  it('opens HomeEdge evidence and shows the transparency narrative in Italian', async () => {
    const user = userEvent.setup()
    renderRoute('/it/progetti/homeedge-ai-platform')

    const details = screen.getByTestId('project-evidence-details-homeedge-product-vision')
    const summary = within(details)
      .getByText('Visione del prodotto e confini dell’MVP')
      .closest('summary') as HTMLElement
    await user.click(summary)
    expect(
      screen
        .getAllByText(/La Product Vision spiega cosa intende diventare HomeEdge/)
        .some((element) => element.closest('details')?.open),
    ).toBe(true)
    expect(screen.getByRole('link', { name: /Leggi la Product Vision/ })).toBeInTheDocument()
    expect(
      screen.getByText(/Il repository pubblico è la fonte tecnica di riferimento/),
    ).toBeInTheDocument()
  })

  it('switches to the equivalent localized project detail route and stores the preference', async () => {
    const user = userEvent.setup()
    renderRoute('/it/progetti/gestore-liste-node')

    await user.click(screen.getByRole('link', { name: "Passa all'inglese", hidden: true }))

    expect(screen.getByTestId('location')).toHaveTextContent('/en/projects/node-list-manager')
    expect(
      screen.getByRole('heading', { name: 'Node.js List and Task Manager' }),
    ).toBeInTheDocument()
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

    expect(
      screen.getByRole('heading', { name: 'Node.js List and Task Manager' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The idea' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What has been built' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Why it matters' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Where it stands today' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What you can verify' })).toBeInTheDocument()
    expect(screen.getByText('Implemented project')).toBeInTheDocument()
    expect(screen.getAllByText('Backed by evidence')).toHaveLength(2)
    expect(screen.getByRole('link', { name: /GitHub repository/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node',
    )
    expect(
      screen
        .getAllByRole('link', { name: /Modular Express routes/ })
        .find((link) => link.getAttribute('href')?.startsWith('https://')),
    ).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node/blob/main/src/server.js',
    )
    expect(
      screen.getByText(
        'The backend separates the endpoints used to manage lists and tasks into focused route modules.',
      ),
    ).toBeInTheDocument()
    expect(
      screen
        .getAllByRole('link', { name: /SQLite persistence/ })
        .some((link) => link.getAttribute('href')?.startsWith('https://')),
    ).toBe(true)
    expect(
      screen
        .getAllByRole('link', { name: /Automated test workflow/ })
        .some((link) => link.getAttribute('href')?.startsWith('https://')),
    ).toBe(true)
    expect(
      screen.getByText(
        'Application data is stored in a local SQLite database instead of disappearing when the server restarts.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'The CI workflow configures automated tests. This file shows the test setup, not a completed test run or its result.',
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
    expect(screen.getByText('Progetto implementato')).toBeInTheDocument()
    expect(screen.getAllByText('Supportato da evidenze')).toHaveLength(2)
  })

  it('does not expose the internal unvalidated marker on the HomeEdge detail page', () => {
    renderRoute('/en/projects/homeedge-ai-platform')

    expect(screen.queryByText(/\[UNVALIDATED\]/)).not.toBeInTheDocument()
    const title = screen.getByRole('heading', { name: 'HomeEdge AI Platform', level: 1 })
    const artwork = screen.getByRole('img', { name: /Original diagram of the documented HomeEdge/ })
    expect(title.compareDocumentPosition(artwork) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(
      screen.getByText(/does not present the node firmware, backend or mobile app as integrated/),
    ).toBeInTheDocument()
  })

  it('exposes the complete design-system review surface only in development builds', async () => {
    renderRoute('/__dev/design-system')

    expect(await screen.findByRole('heading', { name: 'Pop! Digital Studio' })).toBeInTheDocument()
    expect(screen.getByText('Development only · IRPW-17')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Focus, disabled state and optional motion' }),
    ).toBeInTheDocument()
  })
})
