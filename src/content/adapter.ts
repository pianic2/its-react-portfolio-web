import { rawContentRepository } from './data'
import { validateContentRepository } from './validation'
import type { ContentRepository } from './schema'

export type ContentAdapter = { load: () => Promise<ContentRepository> }
type FetchLike = typeof fetch

export function createLocalContentAdapter(): ContentAdapter {
  return { load: async () => validateContentRepository(rawContentRepository) }
}

export function createHttpContentAdapter(
  endpoint: string,
  fetcher: FetchLike = fetch,
): ContentAdapter {
  return {
    async load() {
      let response: Response
      try {
        response = await fetcher(endpoint, { headers: { Accept: 'application/json' } })
      } catch {
        throw new Error('Unable to load portfolio content from the configured backend.')
      }
      if (!response.ok)
        throw new Error(`Portfolio content backend responded with HTTP ${response.status}.`)
      let payload: unknown
      try {
        payload = await response.json()
      } catch {
        throw new Error('Portfolio content backend returned invalid JSON.')
      }
      return validateContentRepository(payload)
    },
  }
}

export function createContentAdapter(
  endpoint = import.meta.env.VITE_CONTENT_API_URL,
): ContentAdapter {
  return endpoint?.trim() ? createHttpContentAdapter(endpoint) : createLocalContentAdapter()
}
