import { fireEvent, render, screen } from '@testing-library/react'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { PortfolioContentProvider } from '../content/context'
import { BackendContext } from '../services/backend/BackendContext'
import type { PortfolioBackend } from '../services/backend'
import { DigitalStudioProvider } from '../theme'
import { BlogPage } from './BlogPage'

const firstArticle = {
  id: 7,
  stable_id: 'article-7',
  title: 'First article',
  meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug: 'first-article' },
  excerpt: 'First excerpt',
  body: 'First article body.',
}

function renderBlog(backend: PortfolioBackend, path = '/en/blog') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[path]}>
        <PortfolioContentProvider language="en">
          <BackendContext.Provider value={backend}>
            <Link to="/en/blog/next-article">Next article</Link>
            <Routes>
              <Route element={<BlogPage />} path="/:language/blog/:slug?" />
            </Routes>
          </BackendContext.Provider>
        </PortfolioContentProvider>
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('BlogPage route state', () => {
  it('hides the previous article while the next slug loads and after it fails', async () => {
    let rejectNext: ((reason: Error) => void) | undefined
    const backend: PortfolioBackend = {
      listPages: vi.fn<PortfolioBackend['listPages']>(async () => []),
      getPage: vi.fn<PortfolioBackend['getPage']>(async () => firstArticle),
      findBySlug: vi.fn<PortfolioBackend['findBySlug']>(async (_type, _language, slug) => {
        if (slug === 'first-article') return firstArticle
        return new Promise((_resolve, reject) => {
          rejectNext = reject
        })
      }),
      findByStableId: vi.fn<PortfolioBackend['findByStableId']>(async () => null),
      resolveAssetUrl: (path) => new URL(path, 'https://api.example.test').toString(),
    }

    renderBlog(backend, '/en/blog/first-article')
    expect(await screen.findByRole('heading', { name: 'First article' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Next article' }))
    expect(await screen.findByLabelText('Loading Blog')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'First article' })).not.toBeInTheDocument()

    rejectNext?.(new Error('request failed'))
    expect(await screen.findByRole('alert')).toHaveTextContent('The Blog could not be loaded.')
    expect(screen.queryByRole('heading', { name: 'First article' })).not.toBeInTheDocument()
  })

  it('keeps the detail loading state when navigating from an empty index', async () => {
    const backend: PortfolioBackend = {
      listPages: vi.fn<PortfolioBackend['listPages']>(async () => []),
      getPage: vi.fn<PortfolioBackend['getPage']>(async () => ({})),
      findBySlug: vi.fn<PortfolioBackend['findBySlug']>(async () => new Promise(() => {})),
      findByStableId: vi.fn<PortfolioBackend['findByStableId']>(async () => null),
      resolveAssetUrl: (path) => path,
    }

    renderBlog(backend)
    expect(await screen.findByText('No articles are available yet.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'Next article' }))

    expect(await screen.findByLabelText('Loading Blog')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Page not found' })).not.toBeInTheDocument()
  })
})
