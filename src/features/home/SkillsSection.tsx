import { Box, CardContent, Stack, Typography } from '@mui/material'
import { EditorialSectionHeader } from '../../components/layout/EditorialSectionHeader'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { StudioCard } from '../../components/surfaces/StudioCard'
import { usePortfolioContent } from '../../content/context'

export function SkillsSection() {
  const { siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.skills
  return (
    <PageSection aria-labelledby="home-skills-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={5}>
          <EditorialSectionHeader {...copy} id="home-skills-title" />
          <Box
            data-testid="skill-groups"
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(5, minmax(0, 1fr))',
              },
            }}
          >
            {copy.groups.map((group, index) => (
              <StudioCard
                key={group.id}
                component="article"
                sx={{
                  backgroundColor: index % 2 === 0 ? 'background.paper' : 'background.default',
                }}
              >
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                  <Typography component="h3" variant="h5">
                    {group.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 2 }}>
                    {group.description}
                  </Typography>
                </CardContent>
              </StudioCard>
            ))}
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
