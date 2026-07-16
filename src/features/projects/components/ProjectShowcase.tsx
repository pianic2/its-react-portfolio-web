import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink } from '../../../components/actions/AppLink'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'
import { getRoutePath } from '../../../routes/routeConfig'
import { ProjectShowcaseCard } from './ProjectShowcaseCard'

type ProjectShowcaseProps = {
  headingLevel?: 'h1' | 'h2'
  variant: 'home' | 'projects'
}

const placementByVariant = {
  'signal-yellow': { md: '1 / span 7' },
  'studio-pink': { md: '8 / span 5' },
  'electric-cyan': { md: '3 / span 8' },
} as const

export function ProjectShowcase({ headingLevel = 'h2', variant }: ProjectShowcaseProps) {
  const { featuredProjects, language, projects, siteContent } = usePortfolioContent()
  const copy = siteContent.projectExperience[variant]
  const displayedProjects = variant === 'home' ? featuredProjects : projects
  const headingId = `${variant}-project-showcase-title`

  return (
    <PageSection aria-labelledby={headingId} spacing="spacious">
      <PageContainer>
        <Stack spacing={{ xs: 5, md: 7 }}>
          <Box
            sx={{
              alignItems: { md: 'end' },
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { md: 'minmax(0, 7fr) minmax(0, 5fr)' },
              minWidth: 0,
            }}
          >
            <Stack spacing={1.5} sx={{ minWidth: 0 }}>
              <Typography sx={{ letterSpacing: 0 }} variant="overline">
                {copy.eyebrow}
              </Typography>
              <Typography
                component={headingLevel}
                id={headingId}
                sx={{
                  fontSize: { xs: '2.25rem', sm: '3rem', md: '4rem' },
                  letterSpacing: 0,
                  maxWidth: '16ch',
                  overflowWrap: 'break-word',
                }}
                variant="h2"
              >
                {copy.title}
              </Typography>
            </Stack>
            <Stack spacing={2} sx={{ minWidth: 0 }}>
              <Typography
                color="text.secondary"
                sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '55ch' }}
              >
                {copy.introduction}
              </Typography>
              {variant === 'projects' ? (
                <Typography sx={{ fontWeight: 800, maxWidth: '55ch' }}>
                  {siteContent.projectExperience.projects.supportingText}
                </Typography>
              ) : null}
            </Stack>
          </Box>

          <Box
            data-project-count={displayedProjects.length}
            sx={{
              display: 'grid',
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(12, minmax(0, 1fr))' },
              minWidth: 0,
            }}
          >
            {displayedProjects.map((project) => (
              <Box
                key={project.id}
                sx={{
                  gridColumn: { xs: '1', ...placementByVariant[project.visualVariant] },
                  minWidth: 0,
                }}
              >
                <ProjectShowcaseCard
                  language={language}
                  project={project}
                  repositoryLabel={siteContent.projectExperience.labels.repositoryLabel}
                  valueLabel={siteContent.projectExperience.labels.valueLabel}
                  variant={variant}
                />
              </Box>
            ))}
          </Box>

          {variant === 'home' ? (
            <ButtonLink
              endIcon={<ArrowForwardRounded aria-hidden="true" />}
              sx={{ alignSelf: 'flex-start' }}
              to={getRoutePath('projects', language)}
              variant="outlined"
            >
              {siteContent.projectExperience.labels.projectsCtaLabel}
            </ButtonLink>
          ) : null}
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
