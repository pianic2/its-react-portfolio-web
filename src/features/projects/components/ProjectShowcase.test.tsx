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
      'ITS Library API in Laravel',
      'ITS Node.js Project',
    ])
  })

  it('uses the compact Home composition and links to the project index', () => {
    renderShowcase('it', 'home')

    expect(
      screen.getByRole('heading', { name: 'Tre sistemi, tre vincoli distinti' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esplora tutti i progetti' })).toHaveAttribute(
      'href',
      '/it/progetti',
    )
  })

  it('renders localized detail paths, repository links and visible claim statuses', () => {
    renderShowcase('it', 'projects')

    expect(screen.getAllByRole('link', { name: /^Leggi il progetto$/ })[0]).toHaveAttribute(
      'href',
      '/it/progetti/homeedge-ai-platform',
    )
    expect(screen.getAllByText('Dimostrato')).toHaveLength(3)
    expect(screen.getAllByRole('link', { name: /Repository GitHub/ })[2]).toHaveAttribute(
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
})
