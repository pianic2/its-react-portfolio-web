import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Stack, Typography } from '@mui/material'
import { ExternalButtonLink } from '../components/actions/AppLink'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { ContactForm } from '../features/contact/ContactForm'
import { externalLinks } from '../config/externalLinks'

export function ContactPage() {
  const { language, siteContent } = usePortfolioContent()
  const page = siteContent.contactPage

  return (
    <>
      <PageSection
        aria-labelledby="contact-page-title"
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
            id="contact-page-title"
            title={page.hero.title}
            layout="single"
          />
        </PageContainer>
      </PageSection>

      <PageSection
        aria-labelledby="contact-form-title"
        spacing="spacious"
        sx={(theme) => ({
          backgroundColor: theme.digitalStudio.colors.surfaceStrong,
          backgroundImage: theme.digitalStudio.patterns.halftone,
          backgroundSize: '18px 18px',
        })}
      >
        <PageContainer>
          <Box
            sx={{
              alignItems: 'start',
              display: 'grid',
              gap: { xs: 8, lg: 10 },
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.8fr) minmax(30rem, 1.2fr)' },
            }}
          >
            <Box
              sx={(theme) => ({
                backgroundColor: theme.digitalStudio.colors.surface,
                border:
                  theme.digitalStudio.borderWidths.bold +
                  'px solid ' +
                  theme.digitalStudio.colors.border,
                borderRadius: theme.digitalStudio.radii.lg + 'px',
                boxShadow: theme.digitalStudio.shadows.large,
                gridColumn: { lg: 2 },
                gridRow: { lg: 1 },
                p: { xs: 6, md: 8 },
              })}
            >
              <Stack spacing={4}>
                <Stack spacing={1.5}>
                  <Typography component="h2" id="contact-form-title" variant="h3">
                    {page.formTitle}
                  </Typography>
                  <Typography color="text.secondary">{page.formDescription}</Typography>
                </Stack>
                <ContactForm copy={page.form} locale={language} />
              </Stack>
            </Box>

            <Stack spacing={6} sx={{ gridColumn: { lg: 1 }, gridRow: { lg: 1 } }}>
              <ContactList title={page.requestsTitle} items={page.appropriateRequests} />
              <ContactList title={page.guidanceTitle} items={page.messageGuidance} />
              <Stack spacing={2}>
                <ExternalButtonLink
                  href={externalLinks.githubProfile}
                  language={language}
                  newTab
                  startIcon={<GitHubIcon aria-hidden="true" />}
                  sx={{ alignSelf: 'flex-start' }}
                  variant="outlined"
                >
                  {page.githubLabel}
                </ExternalButtonLink>
              </Stack>
            </Stack>
          </Box>
        </PageContainer>
      </PageSection>
    </>
  )
}

function ContactList({ items, title }: { items: string[]; title: string }) {
  return (
    <Stack spacing={6}>
      <Typography component="h2" variant="h3">
        {title}
      </Typography>
      <Stack component="ol" spacing={4} sx={{ m: 0, p: 0 }}>
        {items.map((item, index) => (
          <Box
            component="li"
            key={item}
            sx={(theme) => ({
              backgroundColor:
                index % 2 === 0
                  ? theme.digitalStudio.colors.canvas
                  : theme.digitalStudio.colors.surface,
              color: theme.digitalStudio.colors.text,
              listStyle: 'none',
              border: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
              borderRadius: `${theme.digitalStudio.radii.lg}px`,
              boxShadow: theme.digitalStudio.shadows.medium,
              marginBlockEnd: `${theme.digitalStudio.shadowOffsets.large}px`,
              marginInlineEnd: `${theme.digitalStudio.shadowOffsets.large}px`,
              p: 6,
              textAlign: 'center',
            })}
          >
            <Typography sx={{ fontWeight: 800 }}>{item}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
