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
            backgroundColor: (theme) => theme.digitalStudio.colors.surfaceStrong,
            backgroundImage: (theme) => theme.digitalStudio.patterns.halftone,
            border: (theme) =>
              `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.border}`,
            boxShadow: (theme) => theme.digitalStudio.shadows.large,
            p: { xs: 3, md: 5 },
            transition: (theme) =>
              `transform ${theme.digitalStudio.motion.duration.fast}ms ${theme.digitalStudio.motion.easing.standard}`,
            '@media (hover: hover)': { '&:hover': { transform: 'translateY(-2px)' } },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': { transform: 'none' },
            },
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: '70rem' }}>
            <Typography component="h2" id="project-guide-title" variant="h3">
              {copy.title}
            </Typography>
            <Typography sx={{ maxWidth: '72ch' }}>{copy.description}</Typography>
            <Typography
              sx={{
                borderInlineStart: (theme) =>
                  `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.secondary}`,
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
