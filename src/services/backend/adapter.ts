import { z } from 'zod'

export type BackendLanguage = 'it' | 'en'

const pageListSchema = z.object({
  items: z.array(z.unknown()).default([]),
  meta: z.record(z.string(), z.unknown()).optional(),
})

export type BackendPage = Record<string, unknown>

export type PortfolioBackend = {
  listPages: (type: string, language: BackendLanguage, fields?: string) => Promise<BackendPage[]>
  getPage: (id: number) => Promise<BackendPage>
  findBySlug: (type: string, language: BackendLanguage, slug: string) => Promise<BackendPage | null>
}

type FetchLike = typeof fetch

export function createPortfolioBackend(
  baseUrl = import.meta.env.VITE_BACKEND_API_URL,
  fetcher: FetchLike = fetch,
): PortfolioBackend {
  const base = (baseUrl?.trim() || '').replace(/\/$/, '')
  if (!base) {
    throw new Error('The portfolio backend URL is not configured.')
  }

  async function request(path: string): Promise<BackendPage> {
    const response = await fetcher(`${base}${path}`, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Portfolio backend responded with HTTP ${response.status}.`)
    const payload: unknown = await response.json()
    return z.record(z.string(), z.unknown()).parse(payload)
  }

  async function listPages(type: string, language: BackendLanguage, fields?: string) {
    const query = new URLSearchParams({ type, locale: language })
    if (fields) query.set('fields', fields)
    const payload = await request(`/api/v3/pages/?${query.toString()}`)
    return pageListSchema.parse(payload).items as BackendPage[]
  }

  return {
    listPages,
    async getPage(id) {
      return request(`/api/v3/pages/${id}/`)
    },
    async findBySlug(type, language, slug) {
      const pages = await listPages(type, language)
      return (
        pages.find((page) => (page.meta as { slug?: string } | undefined)?.slug === slug) ?? null
      )
    },
  }
}
