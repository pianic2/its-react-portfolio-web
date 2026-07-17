import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink } from '../../components/actions/AppLink'
import { EditorialSectionHeader } from '../../components/layout/EditorialSectionHeader'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { usePortfolioContent } from '../../content/context'
import { getRoutePath } from '../../routes/routeConfig'
import { StudioCard } from '../../components/surfaces/StudioCard'

export function ProcessSection() {
  const { language, siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.process
  return (
    <PageSection aria-labelledby="home-process-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={5}>
          <EditorialSectionHeader {...copy} id="home-process-title" />
          <Box
            component="ol"
            data-testid="process-steps"
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              listStyle: 'none',
              m: 0,
              p: 0,
            }}
          >
            {copy.steps.map((step) => (
              <StudioCard
                aria-labelledby={`process-step-title-${step.id}`}
                component="article"
                sx={{
                  blockSize: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                  p: {
                    xs: 6,
                    lg: 8
                  },
                  overflow: 'hidden',
                  transition: (theme) =>
                    `transform ${theme.digitalStudio.motion.duration.fast}ms ${theme.digitalStudio.motion.easing.standard}`,
                  '&:focus-within': { outline: 'none' },
                  '@media (hover: hover)': {
                    '&:hover': { transform: 'translateY(-4px)' },
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                    '&:hover': { transform: 'none' },
                  },
                }}
              >
                <Typography
                  aria-hidden="true"
                  sx={{ color: 'secondary.main', fontSize: '3rem', fontWeight: 950, lineHeight: 1 }}
                >
                  {step.number}
                </Typography>
                <Typography component="h3" id={`process-step-title-${step.id}`} sx={{ mt: 2 }} variant="h4">
                  {step.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                  {step.description}
                </Typography>
              </StudioCard>
            ))}
            <ButtonLink
              endIcon={<ArrowForwardRounded aria-hidden="true" />}
              sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, minHeight: 44 }}
              to={getRoutePath('method', language)}
              variant="outlined"
            >
              {copy.ctaLabel}
            </ButtonLink>
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
