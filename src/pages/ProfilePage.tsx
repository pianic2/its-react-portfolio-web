import { Stack, Typography } from '@mui/material'
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
      <PageSection aria-labelledby="profile-page-title" spacing="spacious">
        <PageContainer>
          <EditorialSectionHeader
            description={page.hero.description}
            eyebrow={page.hero.eyebrow}
            headingLevel="h1"
            id="profile-page-title"
            title={page.hero.title}
          />
        </PageContainer>
      </PageSection>
      {page.sections.map((section) => (
        <PageSection key={section.id} aria-labelledby={`${section.id}-title`}>
          <PageContainer>
            <Stack spacing={2} sx={{ maxWidth: '62ch' }}>
              <Typography component="h2" id={`${section.id}-title`} variant="h3">
                {section.title}
              </Typography>
              {section.paragraphs.map((paragraph) => (
                <Typography key={paragraph}>{paragraph}</Typography>
              ))}
            </Stack>
          </PageContainer>
        </PageSection>
      ))}
      <PageSection>
        <PageContainer>
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
              variant="outlined"
            >
              {page.ctas.githubLabel}
            </ExternalButtonLink>
          </Stack>
        </PageContainer>
      </PageSection>
    </>
  )
}
