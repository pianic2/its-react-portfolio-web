import { describe, expect, it, vi } from 'vitest'
import {
  ContactSubmissionError,
  createWeb3FormsAdapter,
  normalizeContactFormValues,
  validateContactFormValues,
} from './index'

const messages = {
  required: 'required',
  nameLength: 'name length',
  email: 'email',
  messageLength: 'message length',
}

describe('contact validation', () => {
  it('trims values and validates normalized lengths', () => {
    const result = validateContactFormValues(
      { name: '  Niccolò  ', email: ' niccolo@example.com ', message: ` ${'a'.repeat(20)} ` },
      messages,
    )

    expect(result.errors).toEqual({})
    expect(result.values).toEqual({
      name: 'Niccolò',
      email: 'niccolo@example.com',
      message: 'a'.repeat(20),
    })
  })

  it('returns deterministic field errors', () => {
    const result = validateContactFormValues(
      { name: ' ', email: 'not-an-email', message: 'too short' },
      messages,
    )

    expect(result.errors).toEqual({
      name: 'required',
      email: 'email',
      message: 'message length',
    })
  })

  it('enforces the approved payload boundaries', () => {
    const result = validateContactFormValues(
      {
        name: 'n'.repeat(81),
        email: 'a'.repeat(245) + '@example.com',
        message: 'm'.repeat(2001),
      },
      messages,
    )

    expect(result.errors).toEqual({
      name: 'name length',
      email: 'email',
      message: 'message length',
    })

    expect(
      validateContactFormValues(
        { name: 'N', email: 'n@example.com', message: 'm'.repeat(20) },
        messages,
      ).errors,
    ).toEqual({})
  })

  it('does not silently change values outside the trim margins', () => {
    expect(
      normalizeContactFormValues({ name: ' A  B ', email: 'a@b.co', message: ' x '.repeat(10) }),
    ).toEqual({
      name: 'A  B',
      email: 'a@b.co',
      message: 'x  '.repeat(9) + 'x',
    })
  })
})

describe('Web3Forms adapter', () => {
  const command = {
    name: 'Niccolò',
    email: 'niccolo@example.com',
    message: 'A message that is long enough.',
    locale: 'en' as const,
  }

  it('fails before network access when configuration is missing', async () => {
    const fetcher = vi.fn<typeof fetch>()
    const submit = createWeb3FormsAdapter(fetcher, {})

    await expect(submit(command)).rejects.toMatchObject({ code: 'configuration' })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('maps the application command to a private provider payload', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const submit = createWeb3FormsAdapter(fetcher, {
      VITE_WEB3FORMS_ACCESS_KEY: 'test-public-key',
    })

    await expect(submit(command)).resolves.toEqual({ delivered: true })
    expect(fetcher).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      }),
    )
    const options = fetcher.mock.calls[0]?.[1] as RequestInit
    expect(JSON.parse(String(options.body))).toEqual({
      access_key: 'test-public-key',
      name: command.name,
      email: command.email,
      message: command.message,
      subject: 'New portfolio contact message',
      from_name: 'Niccolò Piazzi portfolio',
      botcheck: false,
    })
  })

  it.each([
    [
      'http error',
      new Response(JSON.stringify({ success: false }), { status: 429 }),
      'provider-rejected',
    ],
    ['non-json http error', new Response('rate limited', { status: 429 }), 'provider-rejected'],
    [
      'negative provider response',
      new Response(JSON.stringify({ success: false }), { status: 200 }),
      'provider-rejected',
    ],
    [
      'unexpected json',
      new Response(JSON.stringify({ message: 'ok' }), { status: 200 }),
      'invalid-response',
    ],
    ['non-json response', new Response('not json', { status: 200 }), 'invalid-response'],
  ])('normalizes %s as a controlled error', async (_label, response, code) => {
    const submit = createWeb3FormsAdapter(vi.fn<typeof fetch>().mockResolvedValue(response), {
      VITE_WEB3FORMS_ACCESS_KEY: 'test-public-key',
    })

    await expect(submit(command)).rejects.toMatchObject({ code })
  })

  it('normalizes network failures and aborts', async () => {
    const submit = createWeb3FormsAdapter(
      vi.fn<typeof fetch>().mockRejectedValue(new Error('offline')),
      {
        VITE_WEB3FORMS_ACCESS_KEY: 'test-public-key',
      },
    )
    await expect(submit(command)).rejects.toMatchObject({ code: 'network' })

    const controller = new AbortController()
    controller.abort()
    await expect(submit(command, controller.signal)).rejects.toBeInstanceOf(ContactSubmissionError)
    await expect(submit(command, controller.signal)).rejects.toMatchObject({ code: 'aborted' })
  })
})
