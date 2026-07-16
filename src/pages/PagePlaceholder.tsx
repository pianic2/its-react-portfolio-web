import { Stack, Typography } from '@mui/material'
import { routeDefinitions, type Language, type PageId } from '../routes/routeConfig'

type PagePlaceholderProps = {
  language: Language
  page: Exclude<PageId, 'projectDetail'>
}

const descriptions: Record<Language, string> = {
  it: 'Contenuto in preparazione.',
  en: 'Content in progress.',
}

export function PagePlaceholder({ language, page }: PagePlaceholderProps) {
  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h2">
        {routeDefinitions[page].labels[language]}
      </Typography>
      <Typography>{descriptions[language]}</Typography>
    </Stack>
  )
}
