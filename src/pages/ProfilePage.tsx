import LaunchIcon from '@mui/icons-material/Launch'
import { Box, Stack, Typography } from '@mui/material'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { PopArtConversionSection } from '../features/supporting-pages/PopArtConversionSection'
import { SupportingPageCta } from '../features/supporting-pages/SupportingPageCtas'
import { getRoutePath } from '../routes/routeConfig'

export function ProfilePage() {
  const { language, siteContent } = usePortfolioContent()
  const page = siteContent.profilePage
  const links = page.usefulLinks
  const contactPath = getRoutePath('contact', language)

  return (
    <>
      <PageSection
        aria-labelledby="profile-page-title"
        spacing="spacious"
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: '58vh',
          paddingBlockEnd: 'clamp(88px, 10vw, 144px)',
          paddingBlockStart: 'clamp(112px, 14vw, 176px)',
        }}
      >
        <PageContainer sx={{ maxInlineSize: { lg: 1440 } }}>
          <Stack spacing={{ xs: 5, md: 7 }}>
            <EditorialSectionHeader
              description={page.hero.description}
              eyebrow={page.hero.eyebrow}
              headingLevel="h1"
              id="profile-page-title"
              layout="single"
              title={page.hero.title}
            />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2.5}
              sx={{
                '& > a, & > button': {
                  minHeight: 52,
                  width: { xs: '100%', sm: 'auto' },
                },
              }}
            >
              <SupportingPageCta
                cta={{
                  kind: 'internal',
                  href: contactPath,
                  label: page.ctas.contactLabel,
                  analyticsId: 'profile-hero-contact',
                }}
                emphasis="primary"
                language={language}
              />
              <SupportingPageCta
                cta={{
                  kind: 'external',
                  href: 'https://github.com/pianic2',
                  label: page.ctas.githubLabel,
                  analyticsId: 'profile-hero-github',
                }}
                emphasis="secondary"
                language={language}
              />
            </Stack>
          </Stack>
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
        aria-labelledby="profile-useful-links-title"
        spacing="spacious"
        sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        <PageContainer sx={{ maxInlineSize: { lg: 1320 } }}>
          <Stack spacing={{ xs: 5, md: 7 }}>
            <EditorialSectionHeader
              description={links.description}
              eyebrow={links.eyebrow}
              headingLevel="h2"
              id="profile-useful-links-title"
              layout="split"
              title={links.title}
            />
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(3, minmax(0, 1fr))',
                },
              }}
            >
              {links.items.map((item) => (
                <Box
                  component="a"
                  href={item.url}
                  key={item.id}
                  rel="noreferrer"
                  target="_blank"
                  sx={(theme) => ({
                    backgroundColor: theme.digitalStudio.colors.surfaceStrong,
                    border:
                      theme.digitalStudio.borderWidths.bold +
                      'px solid ' +
                      theme.digitalStudio.colors.border,
                    borderRadius: theme.digitalStudio.radii.lg + 'px',
                    boxShadow: theme.digitalStudio.shadows.medium,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    minHeight: 260,
                    p: { xs: 3, sm: 4 },
                    textDecoration: 'none',
                    transition: 'transform 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      boxShadow: theme.digitalStudio.shadows.large,
                      transform: 'translate(-4px, -4px)',
                    },
                    '&:focus-visible': {
                      outline:
                        theme.digitalStudio.focus.width +
                        'px solid ' +
                        theme.digitalStudio.colors.focusInner,
                      outlineOffset: 4,
                    },
                  })}
                >
                  <Box
                    component="img"
                    src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
                    alt=""
                    sx={{
                      height: 48,
                      objectFit: 'contain',
                      objectPosition: 'left center',
                      width: 48,
                    }}
                  />
                  <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                    <Typography component="h3" variant="h4">
                      {item.label}
                    </Typography>
                    <Typography sx={{ maxWidth: '48ch' }}>{item.description}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', fontWeight: 900 }}>
                    <Typography sx={{ fontWeight: 900 }}>{item.ctaLabel}</Typography>
                    <LaunchIcon aria-hidden="true" fontSize="small" />
                  </Stack>
                </Box>
              ))}
            </Box>
          </Stack>
        </PageContainer>
      </PageSection>

      <PopArtConversionSection
        description={page.closing.description}
        id="profile-closing-title"
        language={language}
        primaryCta={{
          kind: 'internal',
          href: contactPath,
          label: page.ctas.contactLabel,
          analyticsId: 'profile-closing-contact',
        }}
        secondaryCta={{
          kind: 'external',
          href: 'https://github.com/pianic2',
          label: page.ctas.githubLabel,
          analyticsId: 'profile-closing-github',
        }}
        title={page.closing.title}
      />
    </>
  )
}
