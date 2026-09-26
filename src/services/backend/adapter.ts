import { z } from 'zod'

export type BackendLanguage = 'it' | 'en'

const pageSummarySchema = z
  .object({
    id: z.number().int().positive(),
    title: z.string().min(1),
    meta: z
      .object({
        type: z.string().min(1),
        locale: z.string().min(1),
        slug: z.string().min(1),
      })
      .passthrough(),
  })
  .passthrough()

const pageListSchema = z
  .object({
    count: z.number().int().nonnegative(),
    items: z.array(pageSummarySchema),
  })
  .passthrough()

export type BackendPageSummary = z.infer<typeof pageSummarySchema>
export type BackendPage = Record<string, unknown>
export type BackendErrorKind = 'not-configured' | 'unavailable' | 'invalid-response'

export class BackendError extends Error {
  readonly kind: BackendErrorKind

  constructor(kind: BackendErrorKind, message: string, options?: ErrorOptions) {
    super(message, options)
    this.kind = kind
    this.name = 'BackendError'
  }
}

export class BackendNotConfiguredError extends BackendError {
  constructor() {
    super('not-configured', 'The portfolio backend URL is not configured.')
    this.name = 'BackendNotConfiguredError'
  }
}

export class BackendUnavailableError extends BackendError {
  readonly status: number | undefined

  constructor(message: string, status?: number, options?: ErrorOptions) {
    super('unavailable', message, options)
    this.status = status
    this.name = 'BackendUnavailableError'
  }
}

export class InvalidBackendResponseError extends BackendError {
  constructor(message: string, options?: ErrorOptions) {
    super('invalid-response', message, options)
    this.name = 'InvalidBackendResponseError'
  }
}

export type PortfolioBackend = {
  listPages: (type: string, language: BackendLanguage) => Promise<BackendPageSummary[]>
  getPage: (id: number) => Promise<BackendPage>
  findBySlug: (type: string, language: BackendLanguage, slug: string) => Promise<BackendPage | null>
  findByStableId: (
    type: string,
    language: BackendLanguage,
    stableId: string,
  ) => Promise<BackendPage | null>
  resolveAssetUrl: (path: string) => string
}

type FetchLike = typeof fetch

const PAGE_LIST_LIMIT = 20
const MAX_PAGE_LIST_REQUESTS = 50

export function createPortfolioBackend(
  baseUrl = import.meta.env.VITE_BACKEND_API_URL,
  fetcher: FetchLike = fetch,
): PortfolioBackend {
  const base = (baseUrl?.trim() || '').replace(/\/$/, '')
  if (!base) {
    throw new BackendNotConfiguredError()
  }

  const inFlightRequests = new Map<string, Promise<BackendPage>>()

  async function request(path: string): Promise<BackendPage> {
    const url = `${base}${path}`
    const existingRequest = inFlightRequests.get(url)
    if (existingRequest) return existingRequest

    const requestPromise = (async () => {
      let response: Response
      try {
        response = await fetcher(url, { headers: { Accept: 'application/json' } })
      } catch (cause) {
        throw new BackendUnavailableError(
          'The portfolio backend could not be reached.',
          undefined,
          {
            cause,
          },
        )
      }
      if (!response.ok) {
        throw new BackendUnavailableError(
          `The portfolio backend responded with HTTP ${response.status}.`,
          response.status,
        )
      }

      let payload: unknown
      try {
        payload = await response.json()
      } catch (cause) {
        throw new InvalidBackendResponseError('The portfolio backend returned invalid JSON.', {
          cause,
        })
      }
      const parsedPayload = z.record(z.string(), z.unknown()).safeParse(payload)
      if (!parsedPayload.success) {
        throw new InvalidBackendResponseError(
          'The portfolio backend returned an invalid response.',
          {
            cause: parsedPayload.error,
          },
        )
      }
      return parsedPayload.data
    })()

    inFlightRequests.set(url, requestPromise)
    void requestPromise.then(
      () => inFlightRequests.delete(url),
      () => inFlightRequests.delete(url),
    )
    return requestPromise
  }

  async function getPage(id: number): Promise<BackendPage> {
    const page = await request(`/api/v3/pages/${id}/?rich_text_format=html`)
    if (page.id !== id) {
      throw new InvalidBackendResponseError(
        'The portfolio backend returned a page detail with a different ID.',
      )
    }
    return page
  }

  async function listPages(type: string, language: BackendLanguage): Promise<BackendPageSummary[]> {
    const summaries: BackendPageSummary[] = []
    const ids = new Set<number>()
    let expectedCount: number | undefined

    for (let requestNumber = 0; requestNumber < MAX_PAGE_LIST_REQUESTS; requestNumber += 1) {
      const query = new URLSearchParams({
        type,
        locale: language,
        limit: String(PAGE_LIST_LIMIT),
        offset: String(summaries.length),
      })
      const payload = await request(`/api/v3/pages/?${query.toString()}`)
      const parsed = pageListSchema.safeParse(payload)
      if (!parsed.success) {
        throw new InvalidBackendResponseError(
          'The portfolio backend returned an invalid page list.',
          {
            cause: parsed.error,
          },
        )
      }

      if (expectedCount !== undefined && parsed.data.count !== expectedCount) {
        throw new InvalidBackendResponseError(
          'The portfolio backend changed the page count while listing.',
        )
      }
      expectedCount = parsed.data.count

      if (expectedCount > PAGE_LIST_LIMIT * MAX_PAGE_LIST_REQUESTS) {
        throw new InvalidBackendResponseError(
          'The portfolio backend page list exceeds the supported size.',
        )
      }

      for (const page of parsed.data.items) {
        if (ids.has(page.id)) {
          throw new InvalidBackendResponseError(
            'The portfolio backend repeated a page across list offsets.',
          )
        }
        ids.add(page.id)
        summaries.push(page)
      }

      if (summaries.length > expectedCount) {
        throw new InvalidBackendResponseError(
          'The portfolio backend returned more pages than its count.',
        )
      }
      if (summaries.length === expectedCount) return summaries
      if (parsed.data.items.length === 0) {
        throw new InvalidBackendResponseError(
          'The portfolio backend stopped before all pages were returned.',
        )
      }
    }

    throw new InvalidBackendResponseError(
      'The portfolio backend page list exceeded the request limit.',
    )
  }

  function resolveAssetUrl(path: string): string {
    try {
      return new URL(path, `${base}/`).toString()
    } catch (cause) {
      throw new InvalidBackendResponseError(
        'The portfolio backend returned an invalid image URL.',
        {
          cause,
        },
      )
    }
  }

  return {
    listPages,
    getPage,
    resolveAssetUrl,
    async findBySlug(type, language, slug) {
      const summaries = await listPages(type, language)
      const summary = summaries.find((page) => page.meta.slug === slug)
      return summary ? getPage(summary.id) : null
    },
    async findByStableId(type, language, stableId) {
      const summaries = await listPages(type, language)
      for (const summary of summaries) {
        const page = await getPage(summary.id)
        const meta = page.meta
        if (
          page.stable_id === stableId ||
          (typeof meta === 'object' &&
            meta !== null &&
            'stable_id' in meta &&
            meta.stable_id === stableId)
        ) {
          return page
        }
      }
      return null
    },
  }
}
