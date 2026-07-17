import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { Stack, Typography } from '@mui/material'
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
      <PageSection aria-labelledby="contact-page-title" spacing="spacious">
        <PageContainer>
          <EditorialSectionHeader
            description={page.hero.description}
            eyebrow={page.hero.eyebrow}
            headingLevel="h1"
            id="contact-page-title"
            title={page.hero.title}
          />
        </PageContainer>
      </PageSection>
      <PageSection aria-labelledby="contact-requests-title">
        <PageContainer>
          <Stack spacing={2} sx={{ maxWidth: '62ch' }}>
            <Typography component="h2" id="contact-requests-title" variant="h3">
              {language === 'it' ? 'Per cosa puoi scrivermi' : 'What you can contact me about'}
            </Typography>
            <BoxList items={page.appropriateRequests} />
          </Stack>
        </PageContainer>
      </PageSection>
      <PageSection aria-labelledby="contact-form-title">
        <PageContainer>
          <Stack spacing={3} sx={{ maxWidth: '46rem' }}>
            <Stack spacing={1}>
              <Typography component="h2" id="contact-form-title" variant="h3">
                {language === 'it' ? 'Scrivimi' : 'Send a message'}
              </Typography>
              <Typography>{page.afterSubmit}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography component="h3" variant="h4">
                {language === 'it' ? 'Cosa includere' : 'What to include'}
              </Typography>
              <BoxList items={page.messageGuidance} />
            </Stack>
            <ContactForm copy={page.form} locale={language} />
          </Stack>
        </PageContainer>
      </PageSection>
      <PageSection>
        <PageContainer>
          <ExternalButtonLink
            endIcon={<OpenInNewRounded aria-hidden="true" />}
            href="https://github.com/pianic2"
            language={language}
            newTab
            variant="outlined"
          >
            <GitHubIcon sx={{ mr: 1 }} />
            {page.githubLabel}
          </ExternalButtonLink>
        </PageContainer>
      </PageSection>
    </>
  )
}

function BoxList({ items }: { items: string[] }) {
  return (
    <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3 }}>
      {items.map((item) => (
        <Typography component="li" key={item}>
          {item}
        </Typography>
      ))}
    </Stack>
  )
}
