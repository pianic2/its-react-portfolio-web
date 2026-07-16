import { Chip, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ExternalLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { getProjectBySlug, getSiteContent } from '../content/loaders'
import type { Language } from '../routes/routeConfig'

type ProjectDetailPageProps = {
  language: Language
}

export function ProjectDetailPage({ language }: ProjectDetailPageProps) {
  const { slug } = useParams()
  const project = getProjectBySlug(language, slug)
  const content = getSiteContent(language)
  const headingId = 'project-detail-title'

  if (!project) {
    return (
      <PageSection aria-labelledby={headingId}>
        <PageContainer>
          <Stack spacing={2}>
            <Typography component="h1" id={headingId} variant="h2">
              {content.common.unknownProjectTitle}
            </Typography>
            <Typography>{content.common.unknownProjectDescription}</Typography>
          </Stack>
        </PageContainer>
      </PageSection>
    )
  }

  return (
    <PageSection aria-labelledby={headingId}>
      <PageContainer>
        <Stack spacing={5}>
          <Stack spacing={2}>
            {project.eyebrow ? <Typography variant="overline">{project.eyebrow}</Typography> : null}
            <Typography component="h1" id={headingId} variant="h2">
              {project.title}
            </Typography>
            <Typography variant="h5">{project.summary}</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {project.capabilities.map((capability) => (
                <Chip key={capability.id} label={capability.label} size="small" />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            {project.sections.map((section) => (
              <section key={section.id}>
                <Typography component="h2" gutterBottom variant="h4">
                  {section.label}
                </Typography>
                <Typography>{section.body}</Typography>
              </section>
            ))}
          </Stack>

          <Stack spacing={2}>
            {project.claims.map((claim) => (
              <Stack key={claim.id} spacing={1}>
                <Chip
                  label={claim.statusLabel}
                  size="small"
                  sx={{ alignSelf: 'flex-start' }}
                  variant="outlined"
                />
                <Typography>{claim.text}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack spacing={1}>
            <Typography component="h2" variant="h4">
              {content.common.evidenceLabel}
            </Typography>
            {project.evidence.map((evidence) =>
              evidence.url ? (
                <ExternalLink key={evidence.id} href={evidence.url} language={language} newTab>
                  {evidence.label}
                </ExternalLink>
              ) : null,
            )}
            {project.links.map((link) => (
              <ExternalLink key={link.id} href={link.url} language={language} newTab>
                {link.label}
              </ExternalLink>
            ))}
          </Stack>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
