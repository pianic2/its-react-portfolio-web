import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalButtonLink } from '../components/actions/AppLink'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { getRoutePath } from '../routes/routeConfig'

export function ProfilePage() {
  const { language, siteContent } = usePortfolioContent()
  const page = siteContent.profilePage

  return (
    <>
      <PageSection
        aria-labelledby="profile-page-title"
        spacing="spacious"
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: '68vh',
          paddingBlockStart: 'clamp(112px, 14vw, 176px)',
        }}
      >
        <PageContainer sx={{ maxInlineSize: { lg: 1440 } }}>
          <Box
            sx={{
              alignItems: 'end',
              display: 'grid',
              gap: { xs: 6, md: 10 },
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.45fr) minmax(18rem, 0.55fr)' },
            }}
          >
            <EditorialSectionHeader
              description={page.hero.description}
              eyebrow={page.hero.eyebrow}
              headingLevel="h1"
              id="profile-page-title"
              layout="single"
              title={page.hero.title}
            />
            <Stack
              component="nav"
              aria-label={page.highlightsLabel}
              spacing={0}
              sx={(theme) => ({
                backgroundColor: theme.palette.warning.main,
                border:
                  theme.digitalStudio.borderWidths.bold +
                  'px solid ' +
                  theme.digitalStudio.colors.border,
                borderRadius: theme.digitalStudio.radii.lg + 'px',
                boxShadow: theme.digitalStudio.shadows.large,
                overflow: 'hidden',
              })}
            >
              {page.sections.map((section) => (
                <Box
                  component="a"
                  href={'#' + section.id}
                  key={section.id}
                  sx={(theme) => ({
                    alignItems: 'baseline',
                    color: theme.palette.warning.contrastText,
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: '2rem 1fr',
                    p: 2.5,
                    textDecoration: 'none',
                    '& + &': {
                      borderTop:
                        theme.digitalStudio.borderWidths.regular +
                        'px solid ' +
                        theme.digitalStudio.colors.border,
                    },
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                    '&:focus-visible': {
                      outline:
                        theme.digitalStudio.focus.width +
                        'px solid ' +
                        theme.digitalStudio.colors.focusInner,
                      outlineOffset: -6,
                    },
                  })}
                >
                  <Typography aria-hidden="true" sx={{ fontWeight: 950 }}>
                    {section.number}
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{section.title}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </PageContainer>
      </PageSection>

      {page.sections.map((section, index) => {
        const reverse = index % 2 === 1

        return (
          <PageSection
            aria-labelledby={section.id + '-title'}
            id={section.id}
            key={section.id}
            spacing="spacious"
            sx={(theme) => ({
              backgroundColor:
                index % 2 === 0 ? theme.palette.background.paper : theme.palette.background.default,
              backgroundImage: index === 1 ? theme.digitalStudio.patterns.diagonal : undefined,
              scrollMarginTop: 112,
            })}
          >
            <PageContainer sx={{ maxInlineSize: { lg: 1320 } }}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'grid',
                  gap: { xs: 5, md: 10 },
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.25fr) minmax(18rem, 0.75fr)' },
                }}
              >
                <Stack spacing={3} sx={{ order: { xs: 1, md: reverse ? 2 : 1 } }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline' }}>
                    <Typography
                      aria-hidden="true"
                      color="secondary.main"
                      sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 950 }}
                    >
                      {section.number}
                    </Typography>
                    <Typography variant="overline">{section.eyebrow}</Typography>
                  </Stack>
                  <Typography component="h2" id={section.id + '-title'} variant="h3">
                    {section.title}
                  </Typography>
                  {section.paragraphs.map((paragraph) => (
                    <Typography
                      key={paragraph}
                      sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '66ch' }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>
                <Box
                  sx={(theme) => ({
                    backgroundColor:
                      index === 0
                        ? theme.palette.info.main
                        : index === 1
                          ? theme.palette.secondary.main
                          : theme.digitalStudio.colors.surfaceStrong,
                    border:
                      theme.digitalStudio.borderWidths.bold +
                      'px solid ' +
                      theme.digitalStudio.colors.border,
                    borderRadius: theme.digitalStudio.radii.lg + 'px',
                    boxShadow: theme.digitalStudio.shadows.medium,
                    color:
                      index === 0
                        ? theme.palette.info.contrastText
                        : index === 1
                          ? theme.palette.secondary.contrastText
                          : theme.palette.text.primary,
                    order: { xs: 2, md: reverse ? 1 : 2 },
                    p: { xs: 3, sm: 4 },
                  })}
                >
                  <Typography sx={{ fontWeight: 900 }} variant="overline">
                    {page.highlightsLabel}
                  </Typography>
                  <Stack component="ul" spacing={2} sx={{ m: 0, mt: 3, pl: 2.5 }}>
                    {section.highlights.map((highlight) => (
                      <Typography component="li" key={highlight} sx={{ fontWeight: 850 }}>
                        {highlight}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </PageContainer>
          </PageSection>
        )
      })}

      <PageSection
        aria-labelledby="profile-closing-title"
        spacing="spacious"
        sx={(theme) => ({
          backgroundColor: theme.palette.warning.main,
          backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.16) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          color: theme.palette.warning.contrastText,
        })}
      >
        <PageContainer sx={{ maxInlineSize: { lg: 1320 } }}>
          <Stack spacing={3} sx={{ maxWidth: '68rem' }}>
            <Typography component="h2" id="profile-closing-title" variant="h2">
              {page.closing.title}
            </Typography>
            <Typography sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '62ch' }}>
              {page.closing.description}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <ButtonLink to={getRoutePath('projects', language)} variant="contained">
                {page.ctas.projectsLabel}
              </ButtonLink>
              <ButtonLink to={getRoutePath('contact', language)} variant="outlined">
                {page.ctas.contactLabel}
              </ButtonLink>
              <ExternalButtonLink
                href="https://github.com/pianic2"
                language={language}
                newTab
                startIcon={<GitHubIcon aria-hidden="true" />}
                variant="outlined"
              >
                {page.ctas.githubLabel}
              </ExternalButtonLink>
            </Stack>
          </Stack>
        </PageContainer>
      </PageSection>
    </>
  )
}
