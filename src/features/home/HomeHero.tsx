import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalButtonLink, ExternalLink } from '../../components/actions/AppLink'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { usePortfolioContent } from '../../content/context'
import { getRoutePath } from '../../routes/routeConfig'

const githubUrl = 'https://github.com/pianic2'

export function HomeHero() {
  const { language, siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.hero

  return (
    <PageSection aria-labelledby="home-page-title" spacing="spacious">
      <PageContainer>
        <Box sx={{ position: 'relative' }}>
          <Box
            aria-hidden="true"
            sx={{
              backgroundImage: (theme) => theme.digitalStudio.patterns.halftone,
              backgroundSize: '14px 14px',
              height: { xs: 72, md: 160 },
              opacity: 0.18,
              position: 'absolute',
              right: 0,
              top: 0,
              width: { xs: 72, md: 220 },
              zIndex: -1,
            }}
          />
          <Stack spacing={{ xs: 3, sm: 4 }} sx={{ maxWidth: '68rem', minWidth: 0 }}>
            <Typography sx={{ letterSpacing: 0 }} variant="overline">
              {copy.eyebrow}
            </Typography>
            <Typography
              component="h1"
              id="home-page-title"
              sx={{
                fontSize: 'clamp(2.5rem, 7vw, 5.25rem)',
                letterSpacing: 0,
                maxWidth: '16ch',
                overflowWrap: 'break-word',
              }}
              variant="h1"
            >
              {copy.title}
            </Typography>
            <Typography sx={{ fontSize: { sm: '1.2rem' }, maxWidth: '65ch' }}>
              {copy.description.prefix}
              <ExternalLink
                href={copy.description.url}
                language={language}
                newTab
                sx={{ fontWeight: 900 }}
              >
                {copy.description.linkLabel}
              </ExternalLink>
              {copy.description.suffix}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: '68ch' }}>
              {copy.supportingText}
            </Typography>
            <Stack
              data-testid="home-hero-actions"
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ flexWrap: 'wrap', gap: 2, minWidth: 0 }}
            >
              <ButtonLink
                sx={{ minHeight: 44, width: { xs: '100%', sm: 'auto' } }}
                to={getRoutePath('projects', language)}
                variant="contained"
              >
                {copy.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                sx={{ minHeight: 44, width: { xs: '100%', sm: 'auto' } }}
                to={getRoutePath('method', language)}
                variant="outlined"
              >
                {copy.methodCtaLabel}
              </ButtonLink>
              <ExternalButtonLink
                endIcon={<OpenInNewRounded aria-hidden="true" />}
                href={githubUrl}
                language={language}
                newTab
                sx={{ minHeight: 44, width: { xs: '100%', sm: 'auto' } }}
                variant="text"
              >
                {copy.githubCtaLabel}
              </ExternalButtonLink>
            </Stack>
          </Stack>
        </Box>
      </PageContainer>
    </PageSection>
  )
}
