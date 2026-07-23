import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DigitalStudioProvider } from '../../theme'
import {
  ContactSubmissionError,
  type ContactSubmissionResult,
  type SubmitContactMessage,
} from '../../services/contact'
import { italianContent } from '../../content/data/it'
import { ContactForm } from './ContactForm'

const { submitContactMessage } = vi.hoisted(() => ({
  submitContactMessage:
    vi.fn<
      (command: SubmitContactMessage, signal?: AbortSignal) => Promise<ContactSubmissionResult>
    >(),
}))

vi.mock('../../services/contact', async () => {
  const actual =
    await vi.importActual<typeof import('../../services/contact')>('../../services/contact')
  return { ...actual, submitContactMessage }
})

const copy = {
  requiredHint: 'Required fields are marked.',
  nameLabel: 'Name',
  nameHelper: 'Up to 80 characters.',
  emailLabel: 'Email',
  emailHelper: 'Used only for a reply.',
  messageLabel: 'Message',
  messageHelper: 'Between 20 and 2,000 characters.',
  submitLabel: 'Send message',
  submittingLabel: 'Sending…',
  sendAnotherLabel: 'Send another message',
  requiredError: 'This field is required.',
  nameLengthError: 'Name too long.',
  emailError: 'Email invalid.',
  messageLengthError: 'Message length invalid.',
  configurationError: 'Form unavailable.',
  submissionError: 'Could not send.',
  successMessage: 'Sent.',
  privacyNotice: 'Do not send sensitive data.',
}

function renderForm() {
  return render(
    <DigitalStudioProvider>
      <ContactForm copy={copy} locale="en" />
    </DigitalStudioProvider>,
  )
}

describe('ContactForm', () => {
  beforeEach(() => {
    submitContactMessage.mockReset()
  })

  it('focuses the first invalid field and exposes its error', () => {
    renderForm()
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!)

    expect(screen.getByRole('textbox', { name: /Name/ })).toHaveFocus()
    expect(screen.getByText('This field is required.')).toBeInTheDocument()
    const name = screen.getByRole('textbox', { name: /Name/ })
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAttribute('aria-describedby', 'contact-name-error')
    expect(document.getElementById('contact-name-error')).toHaveTextContent(
      'This field is required.',
    )
  })

  it('keeps validation feedback localized without contacting the provider', () => {
    render(
      <DigitalStudioProvider>
        <ContactForm copy={italianContent.contactPage.form} locale="it" />
      </DigitalStudioProvider>,
    )

    fireEvent.submit(screen.getByRole('button', { name: 'Invia messaggio' }).closest('form')!)

    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveFocus()
    expect(screen.getByText('Questo campo è obbligatorio.')).toBeInTheDocument()
    expect(submitContactMessage).not.toHaveBeenCalled()
  })

  it('prevents duplicate submissions and offers an explicit reset after success', async () => {
    let resolveSubmission: (() => void) | undefined
    submitContactMessage.mockImplementation(
      () =>
        new Promise<ContactSubmissionResult>((resolve) => {
          resolveSubmission = () => resolve({ delivered: true })
        }),
    )
    renderForm()
    fireEvent.change(screen.getByRole('textbox', { name: /Name/ }), {
      target: { value: 'Niccolò' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Email/ }), {
      target: { value: 'niccolo@example.com' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Message/ }), {
      target: { value: 'A message that is long enough.' },
    })
    const form = screen.getByRole('button', { name: 'Send message' }).closest('form')!
    fireEvent.submit(form)
    fireEvent.submit(form)

    expect(submitContactMessage).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled()
    resolveSubmission?.()
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Sent.'))
    fireEvent.click(screen.getByRole('button', { name: 'Send another message' }))
    expect(screen.getByRole('textbox', { name: /Name/ })).toHaveValue('')
  })

  it('keeps values after a failed submission and does not reveal provider details', async () => {
    submitContactMessage.mockRejectedValue(new Error('provider body should stay private'))
    renderForm()
    fireEvent.change(screen.getByRole('textbox', { name: /Name/ }), {
      target: { value: 'Niccolò' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Email/ }), {
      target: { value: 'niccolo@example.com' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Message/ }), {
      target: { value: 'A message that is long enough.' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!)

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Could not send.'))
    expect(screen.getByRole('alert')).not.toHaveTextContent('provider body')
    expect(screen.getByRole('textbox', { name: /Message/ })).toHaveValue(
      'A message that is long enough.',
    )
  })

  it('shows the controlled configuration fallback without clearing the message', async () => {
    submitContactMessage.mockRejectedValue(new ContactSubmissionError('configuration'))
    renderForm()
    fireEvent.change(screen.getByRole('textbox', { name: /Name/ }), {
      target: { value: 'Niccolò' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Email/ }), {
      target: { value: 'niccolo@example.com' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /Message/ }), {
      target: { value: 'A message that is long enough.' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!)

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Form unavailable.'))
    expect(screen.getByRole('textbox', { name: /Message/ })).toHaveValue(
      'A message that is long enough.',
    )
  })

  it('does not call the provider when the separate honeypot is filled', () => {
    renderForm()
    const honeypot = document.querySelector('input[name="botcheck"]')!
    fireEvent.change(honeypot, { target: { value: 'spam' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!)

    expect(submitContactMessage).not.toHaveBeenCalled()
  })
})
