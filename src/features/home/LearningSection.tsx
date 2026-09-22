import { Box, CardContent, Stack, Typography } from '@mui/material'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { StudioMotionCard } from '../../components/surfaces/StudioMotionCard'
import { usePortfolioContent } from '../../content/context'

export function LearningSection() {
  const { siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.learning
  return (
    <PageSection
      aria-labelledby="home-learning-title"
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
      })}
    >
      <PageContainer>
        <Stack spacing={5}>
          <Stack spacing={1.5} sx={{ maxWidth: '52rem' }}>
            <Typography variant="overline">{copy.eyebrow}</Typography>
            <Typography component="h2" id="home-learning-title" variant="h2">
              {copy.title}
            </Typography>
            <Typography sx={{ maxWidth: '68ch' }}>{copy.description}</Typography>
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
              <StudioMotionCard
                key={item.id}
                component="article"
                rotation={index % 2 === 0 ? 1 : -1}
                sx={(theme) => {
                  const tone = index % 3
                  const backgroundColor =
                    tone === 0
                      ? theme.digitalStudio.colors.surface
                      : tone === 1
                        ? theme.digitalStudio.colors.canvas
                        : theme.digitalStudio.colors.surfaceStrong

                  return {
                    backgroundColor,
                    color: theme.digitalStudio.colors.text,
                  }
                }}
              >
                <CardContent sx={{ p: 8, '&:last-child': { pb: 8 } }}>
                  <Typography component="h3" variant="h4">
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{item.description}</Typography>
                </CardContent>
              </StudioMotionCard>
            ))}
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
