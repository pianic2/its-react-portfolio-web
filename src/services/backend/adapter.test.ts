import { describe, expect, it, vi } from 'vitest'
import { createPortfolioBackend } from './adapter'

const summary = (id: number, slug: string) => ({
  id,
  title: `Post ${id}`,
  meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug },
})

const detail = (id: number, slug: string, stableId: string) => ({
  id,
  title: `Post ${id}`,
  stable_id: stableId,
  meta: { type: 'portfolio.BlogPostPage', locale: 'en', slug },
})

const jsonResponse = (value: unknown) =>
  new Response(JSON.stringify(value), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })

describe('Wagtail v3 portfolio backend adapter', () => {
  it('parses list summaries without requesting page details or fields projection', async () => {
    const pageSummary = summary(19, 'first-post')
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ count: 1, items: [pageSummary] }))
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(backend.listPages('portfolio.BlogPostPage', 'en')).resolves.toEqual([pageSummary])

    expect(fetcher).toHaveBeenCalledTimes(1)
    const url = new URL(String(fetcher.mock.calls[0]?.[0]))
    expect(url.pathname).toBe('/api/v3/pages/')
    expect(url.searchParams.get('type')).toBe('portfolio.BlogPostPage')
    expect(url.searchParams.get('locale')).toBe('en')
    expect(url.searchParams.get('limit')).toBe('20')
    expect(url.searchParams.get('offset')).toBe('0')
    expect(url.searchParams.has('fields')).toBe(false)
  })

  it('loads every list page using count, limit, and offset', async () => {
    const firstPage = Array.from({ length: 20 }, (_, index) =>
      summary(index + 1, `post-${index + 1}`),
    )
    const secondPage = [summary(21, 'post-21')]
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async (input) => {
      const url = new URL(String(input))
      return jsonResponse({
        count: 21,
        items: url.searchParams.get('offset') === '20' ? secondPage : firstPage,
      })
    })
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(backend.listPages('portfolio.BlogPostPage', 'en')).resolves.toHaveLength(21)

    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(new URL(String(fetcher.mock.calls[1]?.[0])).searchParams.get('offset')).toBe('20')
  })

  it('uses a matching summary slug to request only that page detail', async () => {
    const first = summary(19, 'first-post')
    const second = summary(20, 'second-post')
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async (input) => {
      const url = new URL(String(input))
      if (url.pathname.endsWith('/19/')) return jsonResponse(detail(19, 'first-post', 'post-1'))
      return jsonResponse({ count: 2, items: [first, second] })
    })
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(
      backend.findBySlug('portfolio.BlogPostPage', 'en', 'first-post'),
    ).resolves.toMatchObject({
      id: 19,
      stable_id: 'post-1',
    })

    expect(fetcher).toHaveBeenCalledTimes(2)
    const listUrl = new URL(String(fetcher.mock.calls[0]?.[0]))
    expect(listUrl.searchParams.has('fields')).toBe(false)
    expect(listUrl.searchParams.has('slug')).toBe(false)
    expect(String(fetcher.mock.calls[1]?.[0])).toBe(
      'https://api.example.test/api/v3/pages/19/?rich_text_format=html',
    )
  })

  it('resolves stable-ID translations by hydrating list summaries', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async (input) => {
      const url = new URL(String(input))
      if (url.pathname.endsWith('/19/')) return jsonResponse(detail(19, 'first-post', 'post-1'))
      if (url.pathname.endsWith('/20/')) return jsonResponse(detail(20, 'second-post', 'post-2'))
      return jsonResponse({
        count: 2,
        items: [summary(19, 'first-post'), summary(20, 'second-post')],
      })
    })
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(
      backend.findByStableId('portfolio.BlogPostPage', 'en', 'post-2'),
    ).resolves.toMatchObject({ id: 20, stable_id: 'post-2' })

    const listUrl = new URL(String(fetcher.mock.calls[0]?.[0]))
    expect(listUrl.searchParams.has('stable_id')).toBe(false)
    expect(fetcher.mock.calls).toHaveLength(3)
  })

  it('rejects malformed list summaries as an invalid backend response', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ count: 1, items: [{ title: 'Missing id and meta' }] }))
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(backend.listPages('portfolio.BlogPostPage', 'en')).rejects.toHaveProperty(
      'kind',
      'invalid-response',
    )
  })

  it('rejects a page detail whose ID does not match the requested numeric page ID', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse(detail(19, 'first-post', 'post-1')))
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(backend.getPage(20)).rejects.toHaveProperty('kind', 'invalid-response')
  })

  it('reports network failures as backend unavailable errors', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await expect(backend.listPages('portfolio.BlogPostPage', 'en')).rejects.toHaveProperty(
      'kind',
      'unavailable',
    )
  })

  it('deduplicates concurrent requests for the same list page', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ count: 0, items: [] }))
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await Promise.all([
      backend.listPages('portfolio.BlogPostPage', 'en'),
      backend.listPages('portfolio.BlogPostPage', 'en'),
    ])

    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})
