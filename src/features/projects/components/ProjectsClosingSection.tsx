import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Stack, Typography } from '@mui/material'
import { ButtonLink } from '../../../components/actions/AppLink'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'
import { getRoutePath } from '../../../routes/routeConfig'

export function ProjectsClosingSection() {
  const { getProjectPath, language, siteContent } = usePortfolioContent()
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
              to={getProjectPath('homeedge-ai-platform') ?? getRoutePath('projects', language)}
              variant="contained"
            >
              {copy.homeEdgeLabel}
            </ButtonLink>
            <ButtonLink
              sx={{ minHeight: 44 }}
              to={getRoutePath('method', language)}
              variant="outlined"
            >
              {copy.methodLabel}
            </ButtonLink>
            <ButtonLink
              sx={{ minHeight: 44 }}
              to={getRoutePath('contact', language)}
              variant="text"
            >
              {copy.contactLabel}
            </ButtonLink>
          </Stack>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
