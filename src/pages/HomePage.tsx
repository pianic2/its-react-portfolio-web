import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { ProjectShowcase } from '../features/projects/components/ProjectShowcase'

export function HomePage() {
  const { language, portfolio } = usePortfolioContent()

  return (
    <>
      <PageSection aria-labelledby="home-page-title" spacing="spacious">
        <PageContainer>
          <Box
            sx={{
              alignItems: { md: 'end' },
              display: 'grid',
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: { md: 'minmax(0, 8fr) minmax(0, 4fr)' },
              minWidth: 0,
            }}
          >
            <Stack spacing={3} sx={{ minWidth: 0 }}>
              <Typography
                component="h1"
                id="home-page-title"
                sx={{
                  fontSize: { xs: '2.8rem', sm: '4.25rem', md: '5.75rem' },
                  letterSpacing: 0,
                  maxWidth: '13ch',
                  overflowWrap: 'break-word',
                }}
                variant="h1"
              >
                {portfolio.headline}
              </Typography>
              <Typography sx={{ fontSize: { sm: '1.2rem' }, maxWidth: '62ch' }}>
                {portfolio.introduction}
              </Typography>
            </Stack>
            <Stack spacing={3} sx={{ alignItems: { sm: 'flex-start' } }}>
              {portfolio.primaryCta.kind === 'internal' ? (
                <ButtonLink to={portfolio.primaryCta.href} variant="contained">
                  {portfolio.primaryCta.label}
                </ButtonLink>
              ) : null}
              {portfolio.secondaryCta.kind === 'external' ? (
                <ExternalLink
                  href={portfolio.secondaryCta.href}
                  language={language}
                  newTab
                  sx={{ alignItems: 'center', display: 'inline-flex', minHeight: 44 }}
                >
                  {portfolio.secondaryCta.label}
                </ExternalLink>
              ) : null}
            </Stack>
          </Box>
        </PageContainer>
      </PageSection>
      <ProjectShowcase variant="home" />
    </>
  )
}
