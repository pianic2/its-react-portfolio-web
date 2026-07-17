import type { Language } from '../../content/schema'

export type SupportedLocale = Language

export type ContactFormValues = {
  name: string
  email: string
  message: string
}

export type SubmitContactMessage = ContactFormValues & {
  locale: SupportedLocale
}

export type ContactField = keyof ContactFormValues

export type ContactValidationErrors = Partial<Record<ContactField, string>>

export type ContactSubmissionResult = {
  delivered: true
}

export type ContactSubmissionErrorCode =
  'configuration' | 'network' | 'provider-rejected' | 'invalid-response' | 'aborted'

export class ContactSubmissionError extends Error {
  readonly code: ContactSubmissionErrorCode

  constructor(code: ContactSubmissionErrorCode) {
    super(code)
    this.name = 'ContactSubmissionError'
    this.code = code
  }
}
