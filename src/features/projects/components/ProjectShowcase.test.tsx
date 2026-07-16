import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PortfolioContentProvider } from '../../../content/context'
import type { Language } from '../../../content/schema'
import { DigitalStudioProvider } from '../../../theme'
import { ProjectShowcase } from './ProjectShowcase'

function renderShowcase(language: Language, variant: 'home' | 'projects') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter>
        <PortfolioContentProvider language={language}>
          <ProjectShowcase headingLevel={variant === 'projects' ? 'h1' : 'h2'} variant={variant} />
        </PortfolioContentProvider>
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('ProjectShowcase', () => {
  it('renders exactly three projects in deterministic order', () => {
    renderShowcase('en', 'projects')

    const projects = screen.getAllByRole('article')
    expect(projects).toHaveLength(3)
    expect(projects.map((project) => within(project).getByRole('heading').textContent)).toEqual([
      'HomeEdge AI Platform',
      'ITS Library API',
      'ITS Node.js Project',
    ])
  })

  it('uses the compact Home composition and links to the project index', () => {
    renderShowcase('it', 'home')

    expect(
      screen.getByRole('heading', {
        name: 'Origini diverse, un solo modo di lavorare.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esplora tutti i progetti' })).toHaveAttribute(
      'href',
      '/it/progetti',
    )
  })

  it('keeps heading and description in two distinct structural areas', () => {
    renderShowcase('en', 'home')

    expect(screen.getByTestId('home-showcase-heading-area')).toContainElement(
      screen.getByRole('heading', { name: 'Different origins, one way of working.' }),
    )
    expect(screen.getByTestId('home-showcase-description-area')).toHaveTextContent(
      'Two projects were developed during my ITS training.',
    )
  })

  it('keeps the Projects heading and description in distinct structural areas', () => {
    renderShowcase('it', 'projects')

    expect(screen.getByTestId('projects-showcase-heading-area')).toContainElement(
      screen.getByRole('heading', { name: 'Progetti costruiti per imparare e per durare.' }),
    )
    expect(screen.getByTestId('projects-showcase-description-area')).toHaveTextContent(
      'I progetti ITS mostrano come rispondo a requisiti didattici definiti.',
    )
  })

  it('renders localized origin labels independently from claim status', () => {
    renderShowcase('en', 'projects')

    expect(screen.getByText('Personal long-term project')).toBeInTheDocument()
    expect(screen.getAllByText('ITS training project')).toHaveLength(2)
    expect(screen.getAllByText('Backed by evidence')).toHaveLength(3)
  })

  it('uses vertical full-width action zones on the Projects variant', () => {
    renderShowcase('en', 'projects')

    for (const id of ['homeedge-ai-platform', 'its-library-api-laravel', 'node-list-manager']) {
      const actions = screen.getByTestId(`project-actions-${id}`)
      expect(actions).toHaveAttribute('data-layout', 'vertical-full-width')
      expect(within(actions).getAllByRole('link')).toHaveLength(2)
    }
  })

  it('keeps repository actions in a new tab', () => {
    renderShowcase('en', 'projects')

    const repository = screen.getAllByRole('link', { name: /Open the repository/ })[0]
    expect(repository).toHaveAttribute('target', '_blank')
    expect(repository).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders localized detail paths, repository links and visible claim statuses', () => {
    renderShowcase('it', 'projects')

    expect(screen.getByRole('link', { name: /^Scopri HomeEdge$/ })).toHaveAttribute(
      'href',
      '/it/progetti/homeedge-ai-platform',
    )
    expect(screen.getAllByText('Supportato da evidenze')).toHaveLength(3)
    expect(screen.getAllByRole('link', { name: /Apri il repository/ })[2]).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node',
    )
  })

  it('renders English content without removed public projects', () => {
    renderShowcase('en', 'home')

    expect(screen.getByText('ITS Node.js Project')).toBeInTheDocument()
    expect(screen.queryByText('Restaurant Kitchef Brain')).not.toBeInTheDocument()
    expect(screen.queryByText('AI Social Agent')).not.toBeInTheDocument()
  })

  it('renders the exact English summary and value for every project card', () => {
    renderShowcase('en', 'projects')

    expect(
      screen.getByText(
        'A modular smart-home platform designed to understand what is happening in a room while keeping data collection local, limited and transparent.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'It brings together physical sensors, software architecture and responsible data use in one project.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'A complete educational backend for organising books, authors and categories through a documented and protected REST API.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'It shows how authentication, validation, data relationships and file management work together in a real backend.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'A compact backend for managing lists and tasks, built with clear Express routes, persistent SQLite data and automated tests.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'It demonstrates how to keep a small application organised, testable and easy to extend without unnecessary complexity.',
      ),
    ).toBeInTheDocument()
  })

  it('renders the exact Italian summary and value for every project card', () => {
    renderShowcase('it', 'projects')

    expect(
      screen.getByText(
        'Una piattaforma smart home modulare pensata per capire cosa accade in una stanza, mantenendo la raccolta dei dati locale, limitata e trasparente.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Unisce sensori fisici, architettura software e uso responsabile dei dati in un unico progetto.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Un backend didattico completo per organizzare libri, autori e categorie attraverso una API REST documentata e protetta.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Mostra come autenticazione, validazione, relazioni tra dati e gestione dei file lavorano insieme in un backend reale.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Un backend compatto per gestire liste e attività, costruito con route Express chiare, dati persistenti in SQLite e test automatici.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Mostra come mantenere una piccola applicazione ordinata, verificabile e facile da estendere senza introdurre complessità inutile.',
      ),
    ).toBeInTheDocument()
  })
})
