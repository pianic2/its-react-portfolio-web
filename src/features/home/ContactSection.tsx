import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalButtonLink } from '../../components/actions/AppLink'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { usePortfolioContent } from '../../content/context'
import { getRoutePath } from '../../routes/routeConfig'

export function ContactSection() {
  const { language, siteContent } = usePortfolioContent()
  const copy = siteContent.homePage.contact
  return (
    <PageSection
      aria-labelledby="home-contact-title"
      spacing="spacious"
      sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
    >
      <PageContainer>
        <Stack spacing={3} sx={{ maxWidth: '60rem' }}>
          <Typography variant="overline">{copy.eyebrow}</Typography>
          <Typography component="h2" id="home-contact-title" variant="h2">
            {copy.title}
          </Typography>
          <Typography sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '62ch' }}>
            {copy.description}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
            <ButtonLink
              color="inherit"
              sx={{ minHeight: 44 }}
              to={getRoutePath('contact', language)}
              variant="contained"
            >
              {copy.contactCtaLabel}
            </ButtonLink>
            <ExternalButtonLink
              color="inherit"
              endIcon={<OpenInNewRounded aria-hidden="true" />}
              href="https://github.com/pianic2"
              language={language}
              newTab
              sx={{ minHeight: 44 }}
              variant="outlined"
            >
              {copy.githubCtaLabel}
            </ExternalButtonLink>
          </Stack>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
