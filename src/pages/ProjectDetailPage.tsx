import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import { Box, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ButtonLink, ExternalLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { StudioCard } from '../components/surfaces/StudioCard'
import { usePortfolioContent } from '../content/context'
import { ProjectArtwork } from '../features/projects/components/ProjectArtwork'
import { getRoutePath } from '../routes/routeConfig'

const narrativePlacement = [
  { md: '1 / span 7' },
  { md: '8 / span 5' },
  { md: '1 / span 5' },
  { md: '6 / span 7' },
] as const

export function ProjectDetailPage() {
  const { slug } = useParams()
  const { getProjectBySlug, language, siteContent } = usePortfolioContent()
  const project = getProjectBySlug(slug)
  const headingId = 'project-detail-title'
  const projectsPath = getRoutePath('projects', language)
  const labels = siteContent.projectExperience.labels

  if (!project) {
    return (
      <PageSection aria-labelledby={headingId}>
        <PageContainer>
          <Stack spacing={3}>
            <Typography component="h1" id={headingId} sx={{ letterSpacing: 0 }} variant="h2">
              {siteContent.common.unknownProjectTitle}
            </Typography>
            <Typography>{siteContent.common.unknownProjectDescription}</Typography>
            <ButtonLink
              startIcon={<ArrowBackRounded aria-hidden="true" />}
              sx={{ alignSelf: 'flex-start' }}
              to={projectsPath}
              variant="outlined"
            >
              {labels.backToProjectsLabel}
            </ButtonLink>
          </Stack>
        </PageContainer>
      </PageSection>
    )
  }

  const narrativeSections = [
    { label: labels.ideaLabel, body: project.narrative.idea },
    { label: labels.builtLabel, body: project.narrative.built },
    {
      label: labels.valueLabel,
      body: project.narrative.value,
      additionalBody: project.narrative.transparency,
    },
    { label: labels.stageLabel, body: project.narrative.currentStage },
  ]

  return (
    <>
      <PageSection aria-labelledby={headingId} spacing="spacious">
        <PageContainer>
          <StudioCard
            component="article"
            variant="featured"
            sx={{ minWidth: 0, overflow: 'hidden' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'minmax(0, 7fr) minmax(280px, 5fr)' },
                minWidth: 0,
              }}
            >
              <CardContent
                sx={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  minWidth: 0,
                  order: { xs: 2, md: 1 },
                  p: { xs: 3, sm: 5, md: 7 },
                  '&:last-child': { pb: { xs: 3, sm: 5, md: 7 } },
                }}
              >
                <Stack spacing={1.5} sx={{ minWidth: 0 }}>
                  <Typography sx={{ letterSpacing: 0 }} variant="overline">
                    {project.detailEyebrow}
                  </Typography>
                  <Typography
                    component="h1"
                    id={headingId}
                    sx={{
                      fontSize: { xs: '2.25rem', sm: '3.25rem', md: '4rem' },
                      hyphens: 'auto',
                      letterSpacing: 0,
                      maxWidth: '14ch',
                      overflowWrap: 'break-word',
                    }}
                    variant="h2"
                  >
                    {project.title}
                  </Typography>
                  <Typography sx={{ fontSize: { sm: '1.15rem' }, maxWidth: '68ch' }}>
                    {project.narrative.heroSummary}
                  </Typography>
                </Stack>

                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {project.capabilities.map((capability) => (
                    <Chip key={capability.id} label={capability.label} size="small" />
                  ))}
                  <Chip label={project.claimLabel} size="small" variant="outlined" />
                </Stack>

                <ExternalLink
                  href={project.repositoryUrl}
                  language={language}
                  newTab
                  sx={{ alignItems: 'center', display: 'inline-flex', minHeight: 44 }}
                >
                  {project.repositoryLabel ?? labels.repositoryLabel}
                </ExternalLink>
              </CardContent>
              <Box sx={{ minWidth: 0, order: { xs: 1, md: 2 } }}>
                <ProjectArtwork number={project.number} variant={project.visualVariant} />
              </Box>
            </Box>
          </StudioCard>
        </PageContainer>
      </PageSection>

      <PageSection spacing="regular">
        <PageContainer>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(12, minmax(0, 1fr))' },
              minWidth: 0,
            }}
          >
            {narrativeSections.map((section, index) => (
              <Box
                key={section.label}
                sx={{ gridColumn: { xs: '1', ...narrativePlacement[index] }, minWidth: 0 }}
              >
                <StudioCard
                  component="section"
                  sx={{
                    backgroundColor: index % 2 === 0 ? 'background.paper' : 'background.default',
                    minWidth: 0,
                    overflow: 'hidden',
                  }}
                >
                  <CardContent
                    sx={{ p: { xs: 3, sm: 5 }, '&:last-child': { pb: { xs: 3, sm: 5 } } }}
                  >
                    <Typography
                      aria-hidden="true"
                      sx={{
                        color: index % 2 === 0 ? 'secondary.main' : 'info.main',
                        fontFamily: '"Archivo Black", "Arial Black", sans-serif',
                        fontSize: { xs: '3.25rem', sm: '4.25rem' },
                        fontWeight: 900,
                        letterSpacing: 0,
                        lineHeight: 0.9,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Typography component="h2" sx={{ letterSpacing: 0, mt: 2 }} variant="h4">
                      {section.label}
                    </Typography>
                    <Typography sx={{ maxWidth: '70ch', mt: 2 }}>{section.body}</Typography>
                    {section.additionalBody ? (
                      <Typography sx={{ maxWidth: '70ch', mt: 2 }}>
                        {section.additionalBody}
                      </Typography>
                    ) : null}
                  </CardContent>
                </StudioCard>
              </Box>
            ))}
          </Box>
        </PageContainer>
      </PageSection>

      <PageSection aria-labelledby="project-evidence-title" spacing="spacious">
        <PageContainer>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 4, md: 7 },
              gridTemplateColumns: { md: 'minmax(0, 4fr) minmax(0, 8fr)' },
              minWidth: 0,
            }}
          >
            <Stack spacing={2} sx={{ minWidth: 0 }}>
              <Typography
                component="h2"
                id="project-evidence-title"
                sx={{ fontSize: { xs: '2rem', sm: '2.75rem' }, letterSpacing: 0 }}
                variant="h3"
              >
                {labels.evidenceLabel}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: '65ch' }}>
                {project.narrative.evidenceIntroduction}
              </Typography>
            </Stack>

            <Stack spacing={0} sx={{ minWidth: 0 }}>
              {project.evidence.map((evidence) => (
                <Box
                  key={evidence.id}
                  component="article"
                  sx={{
                    borderBlockStart: (theme) =>
                      `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                    minWidth: 0,
                    py: 4,
                  }}
                >
                  <Stack spacing={1.5} sx={{ maxWidth: '70ch', minWidth: 0 }}>
                    <Typography
                      component="p"
                      sx={{ fontWeight: 900, letterSpacing: 0 }}
                      variant="overline"
                    >
                      {evidence.typeLabel}
                    </Typography>
                    <Typography component="h3" sx={{ letterSpacing: 0 }} variant="h5">
                      {evidence.label}
                    </Typography>
                    <Typography>{evidence.description}</Typography>
                    {evidence.url ? (
                      <ExternalLink
                        href={evidence.url}
                        language={language}
                        newTab
                        sx={{
                          alignItems: 'center',
                          display: 'inline-flex',
                          fontSize: '1.15rem',
                          minHeight: 44,
                        }}
                      >
                        {evidence.linkLabel ?? evidence.label}
                      </ExternalLink>
                    ) : null}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </PageContainer>
      </PageSection>

      <PageSection component="nav" spacing="compact" aria-label={labels.backToProjectsLabel}>
        <PageContainer>
          <ButtonLink
            startIcon={<ArrowBackRounded aria-hidden="true" />}
            to={projectsPath}
            variant="outlined"
          >
            {labels.backToProjectsLabel}
          </ButtonLink>
        </PageContainer>
      </PageSection>
    </>
  )
}
