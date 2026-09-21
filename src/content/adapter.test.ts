import { describe, expect, it, vi } from 'vitest'
import { rawContentRepository } from './data'
import { createHttpContentAdapter, createLocalContentAdapter } from './adapter'

describe('content adapters', () => {
  it('loads and validates the local repository behind the adapter boundary', async () => {
    await expect(createLocalContentAdapter().load()).resolves.toMatchObject({
      locales: { it: expect.any(Object), en: expect.any(Object) },
    })
  })

  it('rejects malformed backend payloads before consumers receive them', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(JSON.stringify({ ...rawContentRepository, projects: [] }), { status: 200 }),
      )

    await expect(createHttpContentAdapter('/content', fetcher).load()).rejects.toThrow(
      'Content validation failed',
    )
  })

  it('maps network failures to deterministic content errors', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new Error('offline'))

    await expect(createHttpContentAdapter('/content', fetcher).load()).rejects.toThrow(
      'Unable to load portfolio content',
    )
  })
})
