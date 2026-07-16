import { Stack, Typography } from '@mui/material'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { getPageLabel, getSiteContent } from '../content/loaders'
import type { Language, PageId } from '../routes/routeConfig'

type PagePlaceholderProps = {
  language: Language
  page: Exclude<PageId, 'projectDetail'>
}

export function PagePlaceholder({ language, page }: PagePlaceholderProps) {
  const headingId = `${page}-page-title`
  const content = getSiteContent(language)

  return (
    <PageSection aria-labelledby={headingId}>
      <PageContainer>
        <Stack spacing={2}>
          <Typography component="h1" id={headingId} variant="h2">
            {getPageLabel(language, page)}
          </Typography>
          <Typography>{content.common.placeholderDescription}</Typography>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
