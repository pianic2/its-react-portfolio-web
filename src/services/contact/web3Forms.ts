import {
  ContactSubmissionError,
  type ContactSubmissionResult,
  type SubmitContactMessage,
} from './types'
import { externalLinks } from '../../config/externalLinks'

const WEB3FORMS_ENDPOINT = externalLinks.web3FormsEndpoint

type Web3FormsEnvironment = Record<string, unknown>

type Web3FormsResponse = {
  success?: unknown
}

type FetchLike = typeof fetch

function getAccessKey(environment: Web3FormsEnvironment): string {
  const configuredKey = environment.VITE_WEB3FORMS_ACCESS_KEY
  const key = typeof configuredKey === 'string' ? configuredKey.trim() : ''
  if (!key) throw new ContactSubmissionError('configuration')
  return key
}

function isWeb3FormsResponse(value: unknown): value is Web3FormsResponse {
  return typeof value === 'object' && value !== null && 'success' in value
}

export function createWeb3FormsAdapter(
  fetcher: FetchLike = fetch,
  environment: Web3FormsEnvironment = import.meta.env,
) {
  return async function submitContactMessage(
    command: SubmitContactMessage,
    signal?: AbortSignal,
  ): Promise<ContactSubmissionResult> {
    const accessKey = getAccessKey(environment)
    if (signal?.aborted) throw new ContactSubmissionError('aborted')

    const payload = {
      access_key: accessKey,
      name: command.name,
      email: command.email,
      message: command.message,
      subject: 'New portfolio contact message',
      from_name: 'Niccolò Piazzi portfolio',
      botcheck: false,
    }

    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
    if (signal) requestInit.signal = signal

    let response: Response
    try {
      response = await fetcher(WEB3FORMS_ENDPOINT, requestInit)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ContactSubmissionError('aborted')
      }
      if (signal?.aborted) throw new ContactSubmissionError('aborted')
      throw new ContactSubmissionError('network')
    }

    if (!response.ok) throw new ContactSubmissionError('provider-rejected')

    let body: unknown
    try {
      body = await response.json()
    } catch {
      throw new ContactSubmissionError('invalid-response')
    }

    if (!isWeb3FormsResponse(body)) throw new ContactSubmissionError('invalid-response')
    if (body.success !== true) throw new ContactSubmissionError('provider-rejected')

    return { delivered: true }
  }
}

export const submitContactMessage = createWeb3FormsAdapter()
