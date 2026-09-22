import { describe, expect, it, vi } from 'vitest'
import { createPortfolioBackend } from './adapter'

describe('portfolio backend blog lookup boundary', () => {
  it('uses slug and stable_id filters instead of a generic locale list for blog lookups', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(
      async () =>
        new Response(
          JSON.stringify({ items: [{ stable_id: 'post-1', meta: { slug: 'first-post' } }] }),
          {
            status: 200,
          },
        ),
    )
    const backend = createPortfolioBackend('https://api.example.test', fetcher)

    await backend.findBySlug('portfolio.BlogPostPage', 'it', 'first-post')
    await backend.findByStableId('portfolio.BlogPostPage', 'en', 'post-1')

    expect(fetcher.mock.calls[0]?.[0]).toContain('slug=first-post')
    expect(fetcher.mock.calls[1]?.[0]).toContain('stable_id=post-1')
  })
})
