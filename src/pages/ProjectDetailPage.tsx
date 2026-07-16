import { Chip, Divider, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ExternalLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { getProjectBySlug, getProjectSectionLabels, getSiteContent } from '../content/loaders'
import type { Language } from '../routes/routeConfig'

type ProjectDetailPageProps = {
  language: Language
}

export function ProjectDetailPage({ language }: ProjectDetailPageProps) {
  const { slug } = useParams()
  const content = getSiteContent(language)
  const sectionLabels = getProjectSectionLabels(language)
  const project = getProjectBySlug(language, slug)
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
        <Stack spacing={4}>
          <Stack spacing={2}>
            {project.eyebrow ? <Typography variant="overline">{project.eyebrow}</Typography> : null}
            <Typography component="h1" id={headingId} variant="h2">
              {project.title}
            </Typography>
            <Typography variant="h5">{project.summary}</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip label={project.status} size="small" />
              <Chip label={project.claim.status} size="small" variant="outlined" />
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={3}>
            <section>
              <Typography component="h2" gutterBottom variant="h4">
                {sectionLabels.problem}
              </Typography>
              <Typography>{project.problem}</Typography>
            </section>
            <section>
              <Typography component="h2" gutterBottom variant="h4">
                {sectionLabels.approach}
              </Typography>
              <Typography>{project.approach}</Typography>
            </section>
            <section>
              <Typography component="h2" gutterBottom variant="h4">
                {sectionLabels.outcome}
              </Typography>
              <Typography>{project.outcome}</Typography>
            </section>
          </Stack>

          <Stack spacing={1}>
            <Typography component="h2" variant="h4">
              {content.common.evidenceLabel}
            </Typography>
            {project.links.map((link) => (
              <ExternalLink key={link.url} href={link.url} language={language} newTab>
                {link.label}
              </ExternalLink>
            ))}
          </Stack>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
