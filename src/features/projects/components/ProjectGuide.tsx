import { Stack, Typography } from '@mui/material'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'

export function ProjectGuide() {
  const { siteContent } = usePortfolioContent()
  const copy = siteContent.projectsPage.guide
  return (
    <PageSection
      aria-labelledby="project-guide-title"
      component="aside"
      spacing="compact"
      sx={(theme) => ({
        borderBlockEnd: `${theme.digitalStudio.borderWidths.regular}px solid ${theme.digitalStudio.colors.border}`,
        borderBlockStart: `${theme.digitalStudio.borderWidths.regular}px solid ${theme.digitalStudio.colors.border}`,
      })}
    >
      <PageContainer>
        <Stack spacing={2} sx={{ maxWidth: '70rem' }}>
          <Typography component="h2" id="project-guide-title" variant="h4">
            {copy.title}
          </Typography>
          <Typography sx={{ maxWidth: '72ch' }}>{copy.description}</Typography>
          <Typography
            sx={{
              borderInlineStart: (theme) =>
                `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.secondary}`,
              fontWeight: 800,
              maxWidth: '72ch',
              pl: 2,
            }}
          >
            {copy.note}
          </Typography>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
