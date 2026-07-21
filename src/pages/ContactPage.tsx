import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Stack, Typography } from '@mui/material'
import { ExternalButtonLink } from '../components/actions/AppLink'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { ContactForm } from '../features/contact/ContactForm'

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
        <PageContainer sx={{ maxInlineSize: { lg: 1320 } }}>
          <EditorialSectionHeader
            description={page.hero.description}
            eyebrow={page.hero.eyebrow}
            headingLevel="h1"
            id="contact-page-title"
            title={page.hero.title}
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
        <PageContainer sx={{ maxInlineSize: { lg: 1320 } }}>
          <Box
            sx={{
              alignItems: 'start',
              display: 'grid',
              gap: { xs: 7, lg: 10 },
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.8fr) minmax(30rem, 1.2fr)' },
            }}
          >
            <Stack spacing={6}>
              <ContactList title={page.requestsTitle} items={page.appropriateRequests} />
              <ContactList title={page.guidanceTitle} items={page.messageGuidance} />
              <Stack spacing={2}>
                <Typography color="text.secondary" sx={{ maxWidth: '54ch' }}>
                  {page.afterSubmit}
                </Typography>
                <ExternalButtonLink
                  href="https://github.com/pianic2"
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

            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                border:
                  theme.digitalStudio.borderWidths.bold +
                  'px solid ' +
                  theme.digitalStudio.colors.border,
                borderRadius: theme.digitalStudio.radii.lg + 'px',
                boxShadow: theme.digitalStudio.shadows.large,
                p: { xs: 3, sm: 5, md: 6 },
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
          </Box>
        </PageContainer>
      </PageSection>
    </>
  )
}

function ContactList({ items, title }: { items: string[]; title: string }) {
  return (
    <Stack spacing={3}>
      <Typography component="h2" variant="h3">
        {title}
      </Typography>
      <Stack component="ol" spacing={0} sx={{ m: 0, p: 0 }}>
        {items.map((item, index) => (
          <Box
            component="li"
            key={item}
            sx={(theme) => ({
              alignItems: 'start',
              display: 'grid',
              gap: 2,
              gridTemplateColumns: '2.5rem 1fr',
              listStyle: 'none',
              py: 2.5,
              '& + &': {
                borderTop:
                  theme.digitalStudio.borderWidths.regular +
                  'px solid ' +
                  theme.digitalStudio.colors.border,
              },
            })}
          >
            <Typography
              aria-hidden="true"
              color="secondary.main"
              sx={{ fontSize: '1.15rem', fontWeight: 950 }}
            >
              {String(index + 1).padStart(2, '0')}
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>{item}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
