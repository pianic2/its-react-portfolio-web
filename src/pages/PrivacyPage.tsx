import { Box, Stack, Typography } from '@mui/material'
import { ExternalLink } from '../components/actions/AppLink'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import type { Language } from '../routes/routeConfig'

export function PrivacyPage() {
  const { language, siteContent } = usePortfolioContent()
  const page = siteContent.privacyPage

  return (
    <>
      <PageSection
        aria-labelledby="privacy-page-title"
        spacing="spacious"
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: '58vh',
          paddingBlockStart: 'clamp(112px, 14vw, 176px)',
        }}
      >
        <PageContainer>
          <EditorialSectionHeader
            description={page.hero.description}
            eyebrow={page.hero.eyebrow}
            headingLevel="h1"
            id="privacy-page-title"
            layout="single"
            supportingContent={
              <Box
                sx={(theme) => ({
                  alignSelf: 'flex-start',
                  backgroundColor: theme.palette.warning.main,
                  border:
                    theme.digitalStudio.borderWidths.regular +
                    'px solid ' +
                    theme.digitalStudio.colors.border,
                  borderRadius: theme.digitalStudio.radii.pill + 'px',
                  color: theme.palette.warning.contrastText,
                  px: 2,
                  py: 1,
                })}
              >
                <Typography sx={{ fontWeight: 900 }} variant="body2">
                  {page.updatedLabel}: {page.updatedAt}
                </Typography>
              </Box>
            }
            title={page.hero.title}
          />
        </PageContainer>
      </PageSection>

      <PageSection spacing="spacious">
        <PageContainer>
          <Typography sx={{ fontSize: { sm: '1.2rem' }, maxWidth: '68ch', mb: { xs: 7, md: 10 } }}>
            {page.intro}
          </Typography>
          <Stack component="article" spacing={0} sx={{ minWidth: 0 }}>
            {page.sections.map((section, index) => (
              <Box
                component="section"
                id={section.id}
                key={section.id}
                aria-labelledby={section.id + '-title'}
                sx={(theme) => ({
                  borderTop:
                    theme.digitalStudio.borderWidths.bold +
                    'px solid ' +
                    theme.digitalStudio.colors.border,
                  display: 'grid',
                  gap: { xs: 2, sm: 4 },
                  gridTemplateColumns: { xs: '1fr', sm: '4rem 1fr' },
                  py: { xs: 5, md: 7 },
                  scrollMarginTop: 112,
                })}
              >
                <Typography
                  aria-hidden="true"
                  color="secondary.main"
                  sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 950 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Stack spacing={2}>
                  <Typography component="h2" id={section.id + '-title'} variant="h3">
                    {section.title}
                  </Typography>
                  {section.paragraphs.map((paragraph) => (
                    <Typography key={paragraph} sx={{ maxWidth: '66ch' }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            ))}

            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                mt: 4,
              }}
            >
              <PrivacyLinkPanel
                heading={page.providerHeading}
                href={page.providerUrl}
                label={page.providerLabel}
                language={language}
                tone="info"
              />
              <PrivacyLinkPanel
                heading={page.ownerContactHeading}
                href={page.ownerContactUrl}
                label={page.ownerContactLabel}
                language={language}
                tone="warning"
              />
            </Box>
          </Stack>
        </PageContainer>
      </PageSection>
    </>
  )
}

function PrivacyLinkPanel({
  heading,
  href,
  label,
  language,
  tone,
}: {
  heading: string
  href: string
  label: string
  language: Language
  tone: 'info' | 'warning'
}) {
  return (
    <Stack
      spacing={2}
      sx={(theme) => ({
        backgroundColor: tone === 'info' ? theme.palette.info.main : theme.palette.warning.main,
        border:
          theme.digitalStudio.borderWidths.bold + 'px solid ' + theme.digitalStudio.colors.border,
        borderRadius: theme.digitalStudio.radii.lg + 'px',
        boxShadow: theme.digitalStudio.shadows.medium,
        color:
          tone === 'info' ? theme.palette.info.contrastText : theme.palette.warning.contrastText,
        p: { xs: 4, md: 6 },
      })}
    >
      <Typography sx={{ fontWeight: 950 }} variant="overline">
        {heading}
      </Typography>
      <ExternalLink
        href={href}
        language={language}
        newTab
        sx={{ alignSelf: 'flex-start', color: 'inherit' }}
      >
        {label}
      </ExternalLink>
    </Stack>
  )
}
