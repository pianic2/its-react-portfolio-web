import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink } from '../../components/actions/AppLink'
import { EditorialSectionHeader } from '../../components/layout/EditorialSectionHeader'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { usePortfolioContent } from '../../content/context'
import { getRoutePath } from '../../routes/routeConfig'

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
              <Box
                component="li"
                key={step.id}
                sx={{
                  border: (theme) =>
                    `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                  minWidth: 0,
                  p: 3,
                }}
              >
                <Typography
                  aria-hidden="true"
                  sx={{ color: 'secondary.main', fontSize: '3rem', fontWeight: 950, lineHeight: 1 }}
                >
                  {step.number}
                </Typography>
                <Typography component="h3" sx={{ mt: 2 }} variant="h4">
                  {step.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
          <ButtonLink
            endIcon={<ArrowForwardRounded aria-hidden="true" />}
            sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, minHeight: 44 }}
            to={getRoutePath('method', language)}
            variant="outlined"
          >
            {copy.ctaLabel}
          </ButtonLink>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
