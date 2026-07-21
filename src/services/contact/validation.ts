import type { ContactField, ContactFormValues, ContactValidationErrors } from './types'

const MAX_NAME_LENGTH = 80
const MAX_EMAIL_LENGTH = 254
const MIN_MESSAGE_LENGTH = 20
const MAX_MESSAGE_LENGTH = 2000
const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactValidationMessages = {
  required: string
  nameLength: string
  email: string
  messageLength: string
}

export function normalizeContactFormValues(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  }
}

export function validateContactFormValues(
  values: ContactFormValues,
  messages: ContactValidationMessages,
): { values: ContactFormValues; errors: ContactValidationErrors } {
  const normalized = normalizeContactFormValues(values)
  const errors: ContactValidationErrors = {}

  const setError = (field: ContactField, message: string) => {
    errors[field] = message
  }

  if (!normalized.name) setError('name', messages.required)
  else if (normalized.name.length > MAX_NAME_LENGTH) setError('name', messages.nameLength)

  if (!normalized.email || normalized.email.length > MAX_EMAIL_LENGTH) {
    setError('email', messages.email)
  } else if (!basicEmailPattern.test(normalized.email)) {
    setError('email', messages.email)
  }

  if (
    !normalized.message ||
    normalized.message.length < MIN_MESSAGE_LENGTH ||
    normalized.message.length > MAX_MESSAGE_LENGTH
  ) {
    setError('message', messages.messageLength)
  }

  return { values: normalized, errors }
}

export const contactFieldLimits = {
  maxNameLength: MAX_NAME_LENGTH,
  maxEmailLength: MAX_EMAIL_LENGTH,
  minMessageLength: MIN_MESSAGE_LENGTH,
  maxMessageLength: MAX_MESSAGE_LENGTH,
} as const
