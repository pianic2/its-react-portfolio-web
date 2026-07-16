import { Box, Stack, Typography } from '@mui/material'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'

export function ProjectGuide() {
  const { siteContent } = usePortfolioContent()
  const copy = siteContent.projectsPage.guide
  return (
    <PageSection aria-labelledby="project-guide-title">
      <PageContainer>
        <Box
          sx={{
            backgroundColor: 'warning.main',
            border: (theme) =>
              `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.border}`,
            boxShadow: (theme) => theme.digitalStudio.shadows.large,
            color: 'common.black',
            p: { xs: 3, md: 5 },
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: '70rem' }}>
            <Typography component="h2" id="project-guide-title" variant="h3">
              {copy.title}
            </Typography>
            <Typography sx={{ maxWidth: '72ch' }}>{copy.description}</Typography>
            <Typography
              sx={{
                borderInlineStart: '5px solid currentColor',
                fontWeight: 800,
                maxWidth: '72ch',
                pl: 2,
              }}
            >
              {copy.note}
            </Typography>
          </Stack>
        </Box>
      </PageContainer>
    </PageSection>
  )
}
