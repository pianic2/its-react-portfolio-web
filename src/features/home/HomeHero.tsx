import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalLink } from '../../components/actions/AppLink'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { usePortfolioContent } from '../../content/context'
import { getRoutePath } from '../../routes/routeConfig'
import { ProjectArtwork } from '../projects/components/ProjectArtwork'

export function HomeHero() {
  const { language, siteContent, featuredProjects } = usePortfolioContent()
  const copy = siteContent.homePage.hero
  const project = featuredProjects[0]

  return (
    <PageSection aria-labelledby="home-page-title" spacing="spacious">
      <PageContainer>
        <Box
          component="header"
          data-testid="home-hero"
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
            <Stack spacing={{ xs: 2.5, sm: 4 }} sx={{ maxWidth: '76rem', minWidth: 0 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography
                  component="span"
                  sx={{
                    letterSpacing: 0,
                    borderBottom: '4px solid',
                    borderColor: 'primary.main',
                    color: 'text.primary',
                  }}
                  variant="overline"
                >
                  <Box component="span" sx={{ fontWeight: 900, marginRight: '0.5rem' }}>
                    FULL STACK DEVELOPER
                  </Box>
                  {'   '}
                  {copy.eyebrow.replace('FULL STACK DEVELOPER', '').trim()}
                </Typography>
              </Stack>
              <Typography
                component="h1"
                id="home-page-title"
                sx={{
                  fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                  letterSpacing: 0,
                  maxWidth: '19ch',
                  overflowWrap: 'break-word',
                  textWrap: 'balance',
                }}
                variant="h1"
              >
                {copy.title}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gap: { xs: 2.5, md: 5 },
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(18rem, 0.8fr)' },
                  alignItems: 'center',
                }}
              >
                <Stack spacing={2} sx={{ minWidth: 0 }}>
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
                  <ButtonLink
                    data-testid="home-hero-primary-cta"
                    sx={{ minHeight: 44, width: { xs: '100%', sm: 'fit-content' } }}
                    to={getRoutePath('projects', language)}
                    variant="contained"
                  >
                    {copy.primaryCtaLabel}
                  </ButtonLink>
                </Stack>
                {project ? (
                  <Box
                    component="article"
                    data-testid="home-hero-project-proof"
                    sx={{
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      display: 'grid',
                      gap: 1.5,
                      minWidth: 0,
                      p: { xs: 2, sm: 3 },
                    }}
                  >
                    <Typography component="p" variant="overline">
                      {project.originLabel} · {project.claimLabel}
                    </Typography>
                    <Typography component="h2" variant="h5">
                      {project.title}
                    </Typography>
                    <ProjectArtwork project={project} />
                    <Typography color="text.secondary" variant="body2">
                      {project.narrative.cardSummary}
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            </Stack>
          </Box>
        </Box>
      </PageContainer>
    </PageSection>
  )
}
