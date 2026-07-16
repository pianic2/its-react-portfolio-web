import { Box, CardContent, Stack, Typography } from '@mui/material'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { StudioCard } from '../../components/surfaces/StudioCard'
import { usePortfolioContent } from '../../content/context'

export function LearningSection() {
  const { siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.learning
  return (
    <PageSection aria-labelledby="home-learning-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={5}>
          <Stack spacing={1.5} sx={{ maxWidth: '52rem' }}>
            <Typography variant="overline">{copy.eyebrow}</Typography>
            <Typography component="h2" id="home-learning-title" variant="h2">
              {copy.title}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: '68ch' }}>
              {copy.description}
            </Typography>
          </Stack>
          <Box
            data-testid="learning-items"
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {copy.items.map((item, index) => (
              <StudioCard
                key={item.id}
                component="article"
                sx={{
                  backgroundColor:
                    index === 0 ? 'warning.main' : index === 1 ? 'secondary.main' : 'info.main',
                  color: 'common.black',
                }}
              >
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                  <Typography component="h3" variant="h4">
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{item.description}</Typography>
                </CardContent>
              </StudioCard>
            ))}
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
