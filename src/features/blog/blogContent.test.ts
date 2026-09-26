import { describe, expect, it, vi } from 'vitest'
import type { BackendPage, BackendPageSummary, PortfolioBackend } from '../../services/backend'
import { loadBlogPost, loadBlogPosts, loadTranslatedBlogPost } from './blogContent'

const summaries: BackendPageSummary[] = [
  {
    id: 19,
    title: 'Production MCP article',
    meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug: 'production-mcp-article' },
  },
  {
    id: 20,
    title: 'Second article',
    meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug: 'second-article' },
  },
]

const firstDetail: BackendPage = {
  id: 19,
  stable_id: 'mcp-article',
  title: 'Production MCP article',
  meta: {
    type: 'portfolio.BlogPostPage',
    locale: 'en',
    slug: 'production-mcp-article',
    first_published_at: '2026-09-21T10:30:00',
  },
  excerpt: 'An article from production.',
  publication_date: '2026-09-21',
  body: '<p>Production article body.</p>',
  featured_image: {
    id: 42,
    meta: {
      type: 'wagtailimages.Image',
      detail_url: 'https://api.example.test/api/v3/images/42/',
      download_url: '/media/blog/mcp.jpg',
      tags: [],
    },
    title: 'MCP article cover',
    width: 1600,
    height: 900,
  },
}

const secondDetail: BackendPage = {
  id: 20,
  stable_id: 'second-article',
  title: 'Second article',
  meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug: 'second-article' },
  excerpt: null,
  publication_date: null,
  body: null,
  featured_image: null,
}

function backendFor(
  pages: BackendPageSummary[] = summaries,
  details: Record<number, BackendPage> = { 19: firstDetail, 20: secondDetail },
): PortfolioBackend {
  const getPage = vi.fn<PortfolioBackend['getPage']>(async (id) => details[id] ?? {})
  return {
    listPages: vi.fn<PortfolioBackend['listPages']>(async () => pages),
    getPage,
    findBySlug: vi.fn<PortfolioBackend['findBySlug']>(async () => firstDetail),
    findByStableId: vi.fn<PortfolioBackend['findByStableId']>(async () => firstDetail),
    resolveAssetUrl: (path: string) => new URL(path, 'https://api.example.test').toString(),
  }
}

describe('blog content boundary', () => {
  it('hydrates each Wagtail list summary before parsing posts', async () => {
    const backend = backendFor()

    await expect(loadBlogPosts(backend, 'en')).resolves.toMatchObject([
      { stable_id: 'mcp-article', title: 'Production MCP article' },
      { stable_id: 'second-article', title: 'Second article' },
    ])

    expect(backend.listPages).toHaveBeenCalledWith('portfolio.BlogPostPage', 'en')
    expect(backend.getPage).toHaveBeenCalledTimes(2)
    expect(backend.getPage).toHaveBeenNthCalledWith(1, 19)
    expect(backend.getPage).toHaveBeenNthCalledWith(2, 20)
  })

  it('keeps a legitimate empty list distinct from failures', async () => {
    const backend = backendFor([])

    await expect(loadBlogPosts(backend, 'en')).resolves.toEqual([])
    expect(backend.getPage).not.toHaveBeenCalled()
  })

  it('rejects the whole list when a detail response is malformed', async () => {
    const backend = backendFor([summaries[0]!], { 19: { id: 19, title: 'Missing stable id' } })

    await expect(loadBlogPosts(backend, 'en')).rejects.toHaveProperty('kind', 'invalid-response')
  })

  it('reports a missing backend as configuration failure', async () => {
    await expect(loadBlogPosts(null, 'en')).rejects.toHaveProperty('kind', 'not-configured')
  })

  it('adapts Wagtail image metadata into a resolved view-model URL and alt text', async () => {
    const backend = backendFor([summaries[0]!], { 19: firstDetail })

    await expect(loadBlogPosts(backend, 'en')).resolves.toMatchObject([
      {
        featured_image: {
          url: 'https://api.example.test/media/blog/mcp.jpg',
          alt: 'MCP article cover',
        },
      },
    ])
  })

  it('loads detail by slug and resolves translations by stable identity', async () => {
    const backend = backendFor()

    await expect(loadBlogPost(backend, 'en', 'production-mcp-article')).resolves.toMatchObject({
      stable_id: 'mcp-article',
    })
    await expect(loadTranslatedBlogPost(backend, 'it', 'mcp-article')).resolves.toMatchObject({
      meta: { slug: 'production-mcp-article' },
    })
  })

  it('keeps a requested slug that has no matching page not found', async () => {
    const backend = backendFor()
    vi.mocked(backend.findBySlug).mockResolvedValue(null)

    await expect(loadBlogPost(backend, 'en', 'missing-article')).resolves.toBeNull()
  })
})
