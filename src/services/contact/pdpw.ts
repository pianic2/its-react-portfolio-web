import {
  ContactSubmissionError,
  type ContactSubmissionResult,
  type SubmitContactMessage,
} from './types'

type FetchLike = typeof fetch

export function createPdpwContactAdapter(
  baseUrl = import.meta.env.VITE_BACKEND_API_URL,
  fetcher: FetchLike = fetch,
) {
  return async function submitContactMessage(
    command: SubmitContactMessage,
    signal?: AbortSignal,
  ): Promise<ContactSubmissionResult> {
    const base = (baseUrl?.trim() || '').replace(/\/$/, '')
    if (!base) throw new ContactSubmissionError('configuration')
    if (signal?.aborted) throw new ContactSubmissionError('aborted')
    try {
      const request: RequestInit = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(command),
      }
      if (signal) request.signal = signal
      const response = await fetcher(`${base}/api/contact/`, request)
      if (response.ok) return { delivered: true }
      if (response.status === 400 || response.status === 429 || response.status === 503) {
        throw new ContactSubmissionError('provider-rejected')
      }
      throw new ContactSubmissionError('network')
    } catch (error) {
      if (error instanceof ContactSubmissionError) throw error
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ContactSubmissionError('aborted')
      }
      throw new ContactSubmissionError('network')
    }
  }
}

export const submitPdpwContactMessage = createPdpwContactAdapter()
