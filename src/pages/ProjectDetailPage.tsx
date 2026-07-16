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

export function ProjectDetailPage() {
  const { slug } = useParams()
  const { getProjectBySlug, language, siteContent } = usePortfolioContent()
  const project = getProjectBySlug(slug)
  const headingId = 'project-detail-title'
  const projectsPath = getRoutePath('projects', language)

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
              {siteContent.projectExperience.detail.backLabel}
            </ButtonLink>
          </Stack>
        </PageContainer>
      </PageSection>
    )
  }

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
                    {project.eyebrow}
                  </Typography>
                  <Typography
                    component="h1"
                    id={headingId}
                    sx={{
                      fontSize: { xs: '2.3rem', sm: '3.4rem', md: '4.25rem' },
                      hyphens: 'auto',
                      letterSpacing: 0,
                      overflowWrap: 'break-word',
                    }}
                    variant="h2"
                  >
                    {project.title}
                  </Typography>
                  <Typography sx={{ fontSize: { sm: '1.2rem' }, maxWidth: '58ch' }}>
                    {project.summary}
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
                  {siteContent.projectExperience.detail.repositoryLabel}
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
              gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))' },
              minWidth: 0,
            }}
          >
            {project.sections.map((section, index) => (
              <StudioCard
                key={section.id}
                component="section"
                sx={{
                  backgroundColor: index % 2 === 0 ? 'background.paper' : 'background.default',
                  minWidth: 0,
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 5 }, '&:last-child': { pb: { xs: 3, sm: 5 } } }}>
                  <Typography
                    aria-hidden="true"
                    sx={{
                      color: index % 2 === 0 ? 'secondary.main' : 'info.main',
                      fontFamily: '"Archivo Black", "Arial Black", sans-serif',
                      fontSize: { xs: '3.5rem', sm: '4.5rem' },
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
                  <Typography sx={{ mt: 2 }}>{section.body}</Typography>
                </CardContent>
              </StudioCard>
            ))}
          </Box>
        </PageContainer>
      </PageSection>

      <PageSection aria-labelledby="project-claims-title" spacing="spacious">
        <PageContainer>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 4, md: 7 },
              gridTemplateColumns: { md: 'minmax(0, 4fr) minmax(0, 8fr)' },
              minWidth: 0,
            }}
          >
            <Stack spacing={2}>
              <Typography sx={{ letterSpacing: 0 }} variant="overline">
                {siteContent.common.evidenceLabel}
              </Typography>
              <Typography
                component="h2"
                id="project-claims-title"
                sx={{ fontSize: { xs: '2rem', sm: '2.75rem' }, letterSpacing: 0 }}
                variant="h3"
              >
                {siteContent.projectExperience.detail.claimsTitle}
              </Typography>
            </Stack>

            <Stack spacing={0} sx={{ minWidth: 0 }}>
              {project.claims.map((claim) => {
                const evidence = project.evidence.filter((item) =>
                  claim.evidenceIds.includes(item.id),
                )

                return (
                  <Box
                    key={claim.id}
                    component="article"
                    sx={{
                      borderBlockStart: (theme) =>
                        `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { sm: 'minmax(120px, 2fr) minmax(0, 6fr)' },
                      minWidth: 0,
                      py: 4,
                    }}
                  >
                    <Chip
                      label={claim.statusLabel}
                      size="small"
                      sx={{ alignSelf: 'start', justifySelf: 'start' }}
                    />
                    <Stack spacing={2} sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800 }}>{claim.text}</Typography>
                      {evidence.map((item) =>
                        item.url ? (
                          <ExternalLink
                            key={item.id}
                            href={item.url}
                            language={language}
                            newTab
                            sx={{ alignItems: 'center', display: 'inline-flex', minHeight: 44 }}
                          >
                            {item.label}
                          </ExternalLink>
                        ) : null,
                      )}
                    </Stack>
                  </Box>
                )
              })}
            </Stack>
          </Box>
        </PageContainer>
      </PageSection>

      <PageSection
        component="nav"
        spacing="compact"
        aria-label={siteContent.projectExperience.detail.backLabel}
      >
        <PageContainer>
          <ButtonLink
            startIcon={<ArrowBackRounded aria-hidden="true" />}
            to={projectsPath}
            variant="outlined"
          >
            {siteContent.projectExperience.detail.backLabel}
          </ButtonLink>
        </PageContainer>
      </PageSection>
    </>
  )
}
