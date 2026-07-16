import { Box, Stack, Typography } from '@mui/material'
import { EditorialSectionHeader } from '../../../components/layout/EditorialSectionHeader'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { StudioCard } from '../../../components/surfaces/StudioCard'
import { usePortfolioContent } from '../../../content/context'

export function ProjectComparison() {
  const { projects, siteContent } = usePortfolioContent()
  const copy = siteContent.projectsPage.comparison
  return (
    <PageSection aria-labelledby="project-comparison-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={5}>
          <EditorialSectionHeader {...copy} id="project-comparison-title" />
          <Box
            aria-label={copy.title}
            component="ul"
            data-layout="responsive-panels"
            data-testid="project-comparison"
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
              listStyle: 'none',
              m: 0,
              p: 0,
            }}
          >
            {copy.projects.map((entry) => {
              const project = projects.find((candidate) => candidate.id === entry.projectId)
              return (
                <StudioCard component="li" key={entry.projectId}>
                  <Stack spacing={3} sx={{ p: 3 }}>
                    <Typography component="h3" variant="h4">
                      {project?.title}
                    </Typography>
                    {(['type', 'learning', 'difficulty'] as const).map((key) => (
                      <Box key={key}>
                        <Typography component="h4" sx={{ fontWeight: 900 }} variant="subtitle1">
                          {copy.questions[key]}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                          {entry[key]}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </StudioCard>
              )
            })}
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
