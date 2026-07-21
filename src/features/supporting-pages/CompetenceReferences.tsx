import { Stack, Typography } from '@mui/material'
import { ExternalLink } from '../../components/actions/AppLink'
import type { Language } from '../../routes/routeConfig'

type CompetenceReference = {
  id: string
  kind: 'certification' | 'course' | 'reference'
  label: string
  issuer: string
  description: string
  url?: string | undefined
}

type CompetenceReferencesProps = {
  language: Language
  references: CompetenceReference[]
  title: string
}

export function CompetenceReferences({ language, references, title }: CompetenceReferencesProps) {
  if (references.length === 0) return null

  return (
    <Stack component="section" aria-label={title} spacing={1}>
      <Typography component="h4" variant="h6">
        {title}
      </Typography>
      {references.map((reference) => (
        <Typography color="text.secondary" key={reference.id}>
          {reference.url ? (
            <ExternalLink href={reference.url} language={language} newTab>
              {reference.label}
            </ExternalLink>
          ) : (
            reference.label
          )}{' '}
          — {reference.issuer}: {reference.description}
        </Typography>
      ))}
    </Stack>
  )
}
