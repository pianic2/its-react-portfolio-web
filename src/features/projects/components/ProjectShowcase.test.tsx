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
          <ProjectShowcase variant={variant} />
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
    expect(
      projects.map((project) => within(project).getByRole('heading', { level: 3 }).textContent),
    ).toEqual(['HomeEdge AI Platform', 'ITS Library API', 'ITS Node.js Project'])
  })

  it('keeps the selected-project heading in two structural blocks', () => {
    renderShowcase('en', 'home')
    expect(screen.getByTestId('home-showcase-heading')).toContainElement(
      screen.getByRole('heading', { name: 'Three projects from different stages of my journey.' }),
    )
    expect(screen.getByTestId('home-showcase-description')).toHaveTextContent(
      'During the Full Stack Dev. course at ITS Prodigi, I developed several projects for my portfolio, including "Library API" (a REST backend with Laravel) and a "ToDo list" in Node.js.',
    )
  })

  it('renders origin and claim status once per project', () => {
    renderShowcase('en', 'projects')
    expect(screen.getByText('PERSONAL PROJECT')).toBeInTheDocument()
    expect(screen.getAllByText('ITS PROJECT')).toHaveLength(2)
    expect(screen.getAllByText('Backed by evidence')).toHaveLength(3)
  })

  it('renders explicit questions and supporting text for all cards', () => {
    renderShowcase('en', 'projects')
    for (const text of [
      'How can a room provide useful information without turning the home into an opaque system?',
      'How can books, authors and categories be organised in a backend that is easy to run and maintain?',
      'How complex does a backend need to be to manage lists and tasks?',
      'The project is still at an early stage, but it is not intended as a one-off experiment. I plan to keep developing it, adding backend and mobile capabilities only after their boundaries have been properly tested.',
      'This project helped me work on the relationship between API design, database entities and protected write operations.',
      'The goal was not to create a large architecture, but to keep the code understandable and the project easy to verify.',
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })

  it('renders project-page work and possible improvement copy', () => {
    renderShowcase('it', 'projects')
    expect(screen.getAllByRole('heading', { name: 'Cosa ho curato' })).toHaveLength(3)
    expect(screen.getAllByRole('heading', { name: 'Cosa vorrei migliorare' })).toHaveLength(3)
    expect(screen.getByText(/Ho definito la visione, i confini dell’MVP/)).toBeInTheDocument()
    expect(screen.getByText(/Una possibile evoluzione è aggiungere/)).toBeInTheDocument()
    expect(screen.getByText(/Potrei estendere la validazione/)).toBeInTheDocument()
  })

  it('uses valid detail and new-tab repository links', () => {
    renderShowcase('it', 'projects')
    expect(screen.getByRole('link', { name: /^Scopri HomeEdge$/ })).toHaveAttribute(
      'href',
      '/it/progetti/homeedge-ai-platform',
    )
    const repositories = screen.getAllByRole('link', { name: /Apri il repository/ })
    expect(repositories).toHaveLength(3)
    expect(repositories[2]).toHaveAttribute(
      'href',
      'https://github.com/pianic2/todo-list-manager-node',
    )
    for (const repository of repositories) {
      expect(repository).toHaveAttribute('target', '_blank')
      expect(repository).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('uses vertical full-width actions on Projects and keeps all public projects', () => {
    renderShowcase('en', 'projects')
    for (const id of ['homeedge-ai-platform', 'its-library-api-laravel', 'node-list-manager']) {
      expect(screen.getByTestId(`project-actions-${id}`)).toHaveAttribute(
        'data-layout',
        'vertical-full-width',
      )
    }
    expect(screen.queryByText('Restaurant Kitchef Brain')).not.toBeInTheDocument()
    expect(screen.queryByText('AI Social Agent')).not.toBeInTheDocument()
  })
})
