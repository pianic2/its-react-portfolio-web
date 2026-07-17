import { Stack, Typography } from '@mui/material'
import { ExternalLink } from '../components/actions/AppLink'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'

export function PrivacyPage() {
  const { language, siteContent } = usePortfolioContent()
  const page = siteContent.privacyPage

  return (
    <>
      <PageSection aria-labelledby="privacy-page-title" spacing="spacious">
        <PageContainer>
          <EditorialSectionHeader
            description={page.hero.description}
            eyebrow={page.hero.eyebrow}
            headingLevel="h1"
            id="privacy-page-title"
            supportingContent={
              <Typography color="text.secondary" variant="body2">
                {page.updatedLabel}: {page.updatedAt}
              </Typography>
            }
            title={page.hero.title}
          />
        </PageContainer>
      </PageSection>
      <PageSection>
        <PageContainer>
          <Stack spacing={2} sx={{ maxWidth: '68ch' }}>
            <Typography>{page.intro}</Typography>
            {page.sections.map((section) => (
              <Stack key={section.id} spacing={1}>
                <Typography component="h2" variant="h3">
                  {section.title}
                </Typography>
                {section.paragraphs.map((paragraph) => (
                  <Typography key={paragraph}>{paragraph}</Typography>
                ))}
              </Stack>
            ))}
            <Stack spacing={1} sx={{ pt: 2 }}>
              <ExternalLink href={page.providerUrl} language={language} newTab>
                {page.providerLabel}
              </ExternalLink>
              <ExternalLink href={page.ownerContactUrl} language={language} newTab>
                {page.ownerContactLabel}
              </ExternalLink>
            </Stack>
          </Stack>
        </PageContainer>
      </PageSection>
    </>
  )
}
