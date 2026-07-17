import { Stack, Typography } from '@mui/material'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'

export function ProjectJourneySection() {
  const { siteContent } = usePortfolioContent()
  const copy = siteContent.projectsPage.journey
  return (
    <PageSection
      aria-labelledby="project-journey-title"
      spacing="spacious"
      sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}
    >
      <PageContainer>
        <Stack spacing={2} sx={{ maxWidth: '68rem' }}>
          <Typography variant="overline">{copy.eyebrow}</Typography>
          <Typography component="h2" id="project-journey-title" variant="h2">
            {copy.title}
          </Typography>
          <Typography sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '72ch' }}>
            {copy.description}
          </Typography>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
