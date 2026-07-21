import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  submitContactMessage,
  validateContactFormValues,
  type ContactFormValues,
  type ContactSubmissionErrorCode,
  type ContactValidationErrors,
  type SupportedLocale,
} from '../../services/contact'

type ContactFormCopy = {
  requiredHint: string
  nameLabel: string
  nameHelper: string
  emailLabel: string
  emailHelper: string
  messageLabel: string
  messageHelper: string
  submitLabel: string
  submittingLabel: string
  sendAnotherLabel: string
  requiredError: string
  nameLengthError: string
  emailError: string
  messageLengthError: string
  configurationError: string
  submissionError: string
  successMessage: string
  privacyNotice: string
}

type ContactFormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'error'; kind: 'configuration' | 'submission' }

type ContactFormProps = {
  copy: ContactFormCopy
  locale: SupportedLocale
}

const initialValues: ContactFormValues = { name: '', email: '', message: '' }

const errorFieldOrder: Array<keyof ContactFormValues> = ['name', 'email', 'message']

function isConfigurationError(code: ContactSubmissionErrorCode) {
  return code === 'configuration'
}

export function ContactForm({ copy, locale }: ContactFormProps) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<ContactValidationErrors>({})
  const [status, setStatus] = useState<ContactFormStatus>({ type: 'idle' })
  const abortControllerRef = useRef<AbortController | null>(null)
  const submittingRef = useRef(false)
  const mountedRef = useRef(true)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const successRef = useRef<HTMLOutputElement>(null)

  useEffect(() => {
    return () => {
      mountedRef.current = false
      abortControllerRef.current?.abort()
    }
  }, [])

  function updateValue(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
    if (status.type === 'error') setStatus({ type: 'idle' })
  }

  function focusFirstError(nextErrors: ContactValidationErrors) {
    const firstError = errorFieldOrder.find((field) => nextErrors[field])
    if (firstError === 'name') nameRef.current?.focus()
    if (firstError === 'email') emailRef.current?.focus()
    if (firstError === 'message') messageRef.current?.focus()
  }

  function handleReset() {
    setValues(initialValues)
    setErrors({})
    setStatus({ type: 'idle' })
    window.requestAnimationFrame(() => nameRef.current?.focus())
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingRef.current) return
    const botcheck = new FormData(event.currentTarget).get('botcheck')
    if (typeof botcheck === 'string' && botcheck.length > 0) {
      setStatus({ type: 'success' })
      return
    }

    const validation = validateContactFormValues(values, {
      required: copy.requiredError,
      nameLength: copy.nameLengthError,
      email: copy.emailError,
      messageLength: copy.messageLengthError,
    })
    setValues(validation.values)
    setErrors(validation.errors)
    if (Object.keys(validation.errors).length > 0) {
      focusFirstError(validation.errors)
      return
    }

    const controller = new AbortController()
    abortControllerRef.current = controller
    submittingRef.current = true
    setStatus({ type: 'submitting' })

    try {
      await submitContactMessage({ ...validation.values, locale }, controller.signal)
      if (!mountedRef.current || controller.signal.aborted) return
      setStatus({ type: 'success' })
      window.requestAnimationFrame(() => successRef.current?.focus())
    } catch (error) {
      if (!mountedRef.current) return
      const code =
        error && typeof error === 'object' && 'code' in error
          ? (error.code as ContactSubmissionErrorCode)
          : 'network'
      if (code === 'aborted') return
      setStatus({
        type: 'error',
        kind: isConfigurationError(code) ? 'configuration' : 'submission',
      })
    } finally {
      submittingRef.current = false
      if (abortControllerRef.current === controller) abortControllerRef.current = null
    }
  }

  if (status.type === 'success') {
    return (
      <Stack
        aria-live="polite"
        component="output"
        ref={successRef}
        spacing={3}
        tabIndex={-1}
        sx={{ '&:focus-visible': { outline: '3px solid currentColor', outlineOffset: 3 } }}
      >
        <Alert severity="success">{copy.successMessage}</Alert>
        <Button onClick={handleReset} type="button" variant="contained">
          {copy.sendAnotherLabel}
        </Button>
      </Stack>
    )
  }

  const statusMessage =
    status.type === 'error'
      ? status.kind === 'configuration'
        ? copy.configurationError
        : copy.submissionError
      : null
  const isSubmitting = status.type === 'submitting'

  return (
    <Box aria-busy={isSubmitting} component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Typography color="text.secondary" variant="body2">
          {copy.requiredHint}
        </Typography>
        <Box
          aria-live="polite"
          component="output"
          sx={{
            blockSize: 1,
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            inlineSize: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
          }}
        >
          {isSubmitting ? copy.submittingLabel : ''}
        </Box>
        {statusMessage ? (
          <Alert aria-live="assertive" role="alert" severity="error">
            {statusMessage}
          </Alert>
        ) : null}
        <TextField
          disabled={isSubmitting}
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name ?? copy.nameHelper}
          inputRef={nameRef}
          label={copy.nameLabel}
          name="name"
          onChange={(event) => updateValue('name', event.target.value)}
          required
          slotProps={{
            formHelperText: { id: 'contact-name-error' },
            input: errors.name
              ? { 'aria-describedby': 'contact-name-error', 'aria-invalid': true }
              : {},
            htmlInput: {},
          }}
          value={values.name}
        />
        <TextField
          autoComplete="email"
          disabled={isSubmitting}
          error={Boolean(errors.email)}
          fullWidth
          helperText={errors.email ?? copy.emailHelper}
          inputRef={emailRef}
          label={copy.emailLabel}
          name="email"
          onChange={(event) => updateValue('email', event.target.value)}
          required
          slotProps={{
            formHelperText: { id: 'contact-email-error' },
            input: errors.email
              ? { 'aria-describedby': 'contact-email-error', 'aria-invalid': true }
              : {},
            htmlInput: {},
          }}
          type="email"
          value={values.email}
        />
        <TextField
          disabled={isSubmitting}
          error={Boolean(errors.message)}
          fullWidth
          helperText={errors.message ?? copy.messageHelper}
          inputRef={messageRef}
          label={copy.messageLabel}
          multiline
          name="message"
          onChange={(event) => updateValue('message', event.target.value)}
          required
          rows={5}
          slotProps={{
            formHelperText: { id: 'contact-message-error' },
            input: errors.message
              ? { 'aria-describedby': 'contact-message-error', 'aria-invalid': true }
              : {},
            htmlInput: {
              maxLength: 2000,
              minLength: 20,
            },
          }}
          value={values.message}
        />
        <Box
          aria-hidden="true"
          component="input"
          name="botcheck"
          tabIndex={-1}
          sx={{
            blockSize: 1,
            border: 0,
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            inlineSize: 1,
            margin: -1,
            opacity: 0,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
          }}
          type="text"
          defaultValue=""
          autoComplete="off"
        />
        <Typography color="text.secondary" sx={{ maxInlineSize: '58ch' }} variant="body2">
          {copy.privacyNotice}
        </Typography>
        <Button
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress aria-hidden="true" color="inherit" size={18} /> : null
          }
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, minInlineSize: 180 }}
          type="submit"
          variant="contained"
        >
          {isSubmitting ? copy.submittingLabel : copy.submitLabel}
        </Button>
      </Stack>
    </Box>
  )
}
