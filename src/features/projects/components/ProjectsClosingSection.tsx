import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalButtonLink } from '../../../components/actions/AppLink'
import { externalLinks } from '../../../config/externalLinks'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'
import { getRoutePath } from '../../../routes/routeConfig'

export function ProjectsClosingSection() {
  const { language, siteContent } = usePortfolioContent()
  const copy = siteContent.projectsPage.finalCta
  return (
    <PageSection aria-labelledby="projects-closing-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={3} sx={{ maxWidth: '64rem' }}>
          <Typography component="h2" id="projects-closing-title" variant="h2">
            {copy.title}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: '64ch' }}>
            {copy.description}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <ButtonLink
              endIcon={<ArrowForwardRounded aria-hidden="true" />}
              sx={{ minHeight: 44 }}
              to={getRoutePath('contact', language)}
              variant="contained"
            >
              {copy.contactLabel}
            </ButtonLink>
            <ButtonLink
              sx={{ minHeight: 44 }}
              to={getRoutePath('method', language)}
              variant="outlined"
            >
              {copy.methodLabel}
            </ButtonLink>
            <ExternalButtonLink
              href={externalLinks.githubProfile}
              language={language}
              newTab
              sx={{ minHeight: 44 }}
              variant="text"
            >
              {copy.githubLabel}
            </ExternalButtonLink>
          </Stack>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
