import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonLink } from '../../../components/actions/AppLink'
import { EditorialSectionHeader } from '../../../components/layout/EditorialSectionHeader'
import { PageContainer } from '../../../components/layout/PageContainer'
import { PageSection } from '../../../components/layout/PageSection'
import { usePortfolioContent } from '../../../content/context'
import { getRoutePath } from '../../../routes/routeConfig'
import { ProjectShowcaseCard } from './ProjectShowcaseCard'

type ProjectShowcaseProps = {
  headingLevel?: 'h1' | 'h2'
  showHeader?: boolean
  variant: 'home' | 'projects'
}

const placementByVariant = {
  'signal-yellow': { md: '1 / span 7' },
  'studio-pink': { md: '8 / span 5' },
  'electric-cyan': { md: '3 / span 8' },
} as const

export function ProjectShowcase({
  headingLevel = 'h2',
  showHeader = true,
  variant,
}: ProjectShowcaseProps) {
  const { featuredProjects, language, projects, siteContent } = usePortfolioContent()
  const copy =
    variant === 'home'
      ? siteContent.homePage.selectedProjects
      : siteContent.projectExperience.projects
  const displayedProjects = variant === 'home' ? featuredProjects : projects
  const headingId = `${variant}-project-showcase-title`

  return (
    <PageSection
      aria-label={!showHeader ? siteContent.projectsPage.hero.eyebrow : undefined}
      aria-labelledby={showHeader ? headingId : undefined}
      spacing="spacious"
    >
      <PageContainer>
        <Stack spacing={{ xs: 5, md: 7 }}>
          {showHeader ? (
            <EditorialSectionHeader
              description={'description' in copy ? copy.description : copy.introduction}
              eyebrow={copy.eyebrow}
              headingLevel={headingLevel}
              id={headingId}
              supportingContent={
                variant === 'home' ? (
                  <Typography sx={{ fontWeight: 900 }}>
                    {siteContent.projectExperience.labels.projectOriginLabels['personal-long-term']}
                    {' · '}
                    {siteContent.projectExperience.labels.projectOriginLabels['its-training']}
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: 800 }}>
                    {siteContent.projectExperience.projects.supportingText}
                  </Typography>
                )
              }
              testId={`${variant}-showcase`}
              title={copy.title}
            />
          ) : null}

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
                  futureImprovementLabel={
                    siteContent.projectExperience.labels.futureImprovementLabel
                  }
                  whatIWorkedOnLabel={siteContent.projectExperience.labels.whatIWorkedOnLabel}
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
