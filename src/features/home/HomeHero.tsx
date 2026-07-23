import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalButtonLink, ExternalLink } from '../../components/actions/AppLink'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { usePortfolioContent } from '../../content/context'
import { getRoutePath } from '../../routes/routeConfig'
import GitHubIcon from '@mui/icons-material/GitHub'
import { externalLinks } from '../../config/externalLinks'

const githubUrl = externalLinks.githubProfile

export function HomeHero() {
  const { language, siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.hero

  return (
    <PageSection aria-labelledby="home-page-title" spacing="spacious">
      <PageContainer>
        <Box
          component="header"
          sx={(theme) => ({
            backgroundColor: theme.digitalStudio.colors.surfaceStrong,
            color: theme.digitalStudio.colors.text,
            minWidth: 0,
            overflow: 'hidden',
            position: 'relative',
          })}
        >
          <Box
            sx={(theme) => ({
              p: {
                xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
                sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
                md: `${theme.digitalStudio.layout.panelInset.wide}px`,
              },
              position: 'relative',
              '&::before': {
                backgroundImage: theme.digitalStudio.patterns.halftone,
                backgroundRepeat: 'repeat',
                backgroundSize: `${theme.spacing(2.25)} ${theme.spacing(2.25)}`,
                content: '""',
                inset: 0,
                opacity: 0.12,
                pointerEvents: 'none',
                position: 'absolute',
              },
            })}
          >
            <Stack spacing={{ xs: 3, sm: 4 }} sx={{ maxWidth: '68rem', minWidth: 0 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography
                  component="span"
                  sx={{
                    letterSpacing: 0,
                    borderBottom: '4px solid',
                    borderColor: 'primary.main',
                  }}
                  variant="overline"
                >
                  <Typography
                    component="span"
                    sx={{ letterSpacing: 0, marginRight: '0.5rem' }}
                    variant="overline"
                    color="primary.contrastText"
                  >
                    FULL STACK DEVELOPER
                  </Typography>
                  {'   '}
                  {copy.eyebrow.replace('FULL STACK DEVELOPER', '').trim()}
                </Typography>
              </Stack>
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
              <Stack
                data-testid="home-hero-actions"
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ flexWrap: 'wrap', gap: 4, minWidth: 0 }}
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
                  <GitHubIcon sx={{ mr: 1 }} />
                  {copy.githubCtaLabel}
                </ExternalButtonLink>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </PageContainer>
    </PageSection>
  )
}
