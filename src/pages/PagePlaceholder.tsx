import { Stack, Typography } from '@mui/material'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
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
  const headingId = `${page}-page-title`

  return (
    <PageSection aria-labelledby={headingId}>
      <PageContainer>
        <Stack spacing={2}>
          <Typography component="h1" id={headingId} variant="h2">
            {routeDefinitions[page].labels[language]}
          </Typography>
          <Typography>{descriptions[language]}</Typography>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
