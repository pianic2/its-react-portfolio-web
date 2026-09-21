import { describe, expect, it } from 'vitest'
import type { PortfolioBackend } from '../../services/backend'
import { loadBlogPost, loadTranslatedBlogPost, parseBlogPost } from './blogContent'

const post = {
  stable_id: 'post-1',
  title: 'First post',
  meta: { slug: 'first-post' },
  excerpt: 'An excerpt',
  publication_date: '2026-09-21',
  body: 'The body',
}

function backendFor(postToReturn: typeof post): PortfolioBackend {
  return {
    listPages: async () => [postToReturn],
    getPage: async () => postToReturn,
    findBySlug: async () => postToReturn,
    findByStableId: async () => postToReturn,
  }
}

describe('blog content boundary', () => {
  it('rejects malformed posts before presentation', () => {
    expect(parseBlogPost({ title: 'missing stable identity' })).toBeNull()
  })

  it('resolves detail and translated detail through stable identity', async () => {
    const backend = backendFor(post)

    await expect(loadBlogPost(backend, 'it', 'first-post')).resolves.toMatchObject({
      stable_id: 'post-1',
    })
    await expect(loadTranslatedBlogPost(backend, 'en', 'post-1')).resolves.toMatchObject({
      meta: { slug: 'first-post' },
    })
  })
})
