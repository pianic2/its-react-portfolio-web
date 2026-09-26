import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { PortfolioContentProvider } from '../content/context'
import { BackendContext } from '../services/backend/BackendContext'
import type { BackendPage, PortfolioBackend } from '../services/backend'
import { DigitalStudioProvider } from '../theme'
import { BlogPage } from './BlogPage'

function backendFor(
  listPages: PortfolioBackend['listPages'],
  getPage: PortfolioBackend['getPage'],
) {
  return {
    listPages,
    getPage,
    findBySlug: vi.fn<PortfolioBackend['findBySlug']>(async () => null),
    findByStableId: vi.fn<PortfolioBackend['findByStableId']>(async () => null),
    resolveAssetUrl: (path: string) => new URL(path, 'https://api.example.test').toString(),
  } satisfies PortfolioBackend
}

function renderBlog(backend: PortfolioBackend | null, path = '/en/blog') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[path]}>
        <PortfolioContentProvider language="en">
          <BackendContext.Provider value={backend}>
            <Routes>
              <Route element={<BlogPage />} path="/:language/blog/:slug?" />
            </Routes>
          </BackendContext.Provider>
        </PortfolioContentProvider>
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('BlogPage backend states', () => {
  it('renders an empty state only when the backend returns a valid zero count', async () => {
    const backend = backendFor(
      vi.fn(async () => []),
      vi.fn(async () => ({}) as BackendPage),
    )

    renderBlog(backend)

    expect(await screen.findByText('No articles are available yet.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows a configuration error when the backend is not configured', async () => {
    renderBlog(null)

    expect(await screen.findByRole('alert')).toHaveTextContent('Blog service is not configured.')
    expect(screen.queryByText('No articles are available yet.')).not.toBeInTheDocument()
  })

  it('shows an integration error when a returned detail is malformed', async () => {
    const summary = {
      id: 19,
      title: 'MCP article',
      meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug: 'mcp-article' },
    }
    const backend = backendFor(
      vi.fn(async () => [summary]),
      vi.fn(async () => ({ id: 19, title: 'Missing stable id' })),
    )

    renderBlog(backend)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'The Blog response could not be read.',
    )
    expect(screen.queryByText('No articles are available yet.')).not.toBeInTheDocument()
  })

  it('renders a missing slug as not found', async () => {
    const backend = backendFor(
      vi.fn(async () => []),
      vi.fn(async () => ({}) as BackendPage),
    )

    renderBlog(backend, '/en/blog/missing-article')

    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
