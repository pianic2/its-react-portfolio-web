import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { Box, CardContent, Chip, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalButtonLink } from '../../../components/actions/AppLink'
import type { ProjectViewModel } from '../../../content/loaders'
import type { Language } from '../../../content/schema'
import { ProjectArtwork } from './ProjectArtwork'

type ProjectShowcaseCardProps = {
  language: Language
  project: ProjectViewModel
  repositoryLabel: string
  variant: 'home' | 'projects'
}

export function ProjectShowcaseCard({
  language,
  project,
  repositoryLabel,
  variant,
}: ProjectShowcaseCardProps) {
  const titleId = `showcase-${project.id}-title`

  return (
    <Box
      aria-labelledby={titleId}
      component="article"
      sx={{
        backgroundColor: (theme) =>
          variant === 'projects'
            ? theme.digitalStudio.colors.canvas
            : theme.digitalStudio.colors.surface,
        blockSize: '100%',
        boxShadow: (theme) => (variant === 'projects' ? 'none' : theme.digitalStudio.shadows.small),
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: variant === 'home' ? 2.5 : 3.5,
          minWidth: 0,
          p: { xs: 3, sm: 4 },
          '&:last-child': { pb: { xs: 3, sm: 4 } },
        }}
      >
        <Stack spacing={1.5} sx={{ minWidth: 0 }}>
          <Box
            data-project-origin={project.origin}
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: 'text.primary',
              color: 'background.paper',
              maxWidth: '100%',
              px: 1.5,
              py: 0.75,
            }}
          >
            <Typography component="p" sx={{ fontWeight: 900, letterSpacing: 0 }} variant="overline">
              {project.originLabel}
            </Typography>
          </Box>
          <Typography sx={{ letterSpacing: 0 }} variant="overline">
            {project.eyebrow}
          </Typography>
          <Chip
            label={project.claimLabel}
            size="small"
            sx={{ alignSelf: 'flex-start' }}
            variant="outlined"
          />
          <Typography
            component="h3"
            id={titleId}
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.15rem', md: '2.45rem' },
              hyphens: 'auto',
              letterSpacing: 0,
              overflowWrap: 'break-word',
            }}
            variant="h3"
          >
            {project.title}
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: { xs: '1.15rem', sm: '1.3rem' }, fontWeight: 800 }}
          >
            {project.question}
          </Typography>
          <Typography color="text.secondary">{project.narrative.cardSummary}</Typography>
          <Typography>{project.supportingText}</Typography>
        </Stack>

        <ProjectArtwork project={project} />

        <Stack
          data-layout={variant === 'projects' ? 'vertical-full-width' : 'responsive'}
          data-testid={`project-actions-${project.id}`}
          sx={{
            alignItems: 'stretch',
            flexDirection: variant === 'projects' ? 'column' : { xs: 'column', sm: 'row' },
            gap: 1.5,
            marginBlockStart: 'auto',
            minWidth: 0,
            width: '100%',
          }}
        >
          <ButtonLink
            endIcon={<ArrowForwardRounded aria-hidden="true" />}
            sx={{
              minHeight: variant === 'projects' ? 48 : 44,
              minWidth: 0,
              width: variant === 'projects' ? '100%' : { xs: '100%', sm: 'auto' },
            }}
            to={project.detailPath}
            variant="contained"
          >
            {project.ctaLabel}
          </ButtonLink>
          <ExternalButtonLink
            endIcon={<OpenInNewRounded aria-hidden="true" />}
            href={project.repositoryUrl}
            language={language}
            newTab
            sx={{
              minHeight: variant === 'projects' ? 48 : 44,
              minWidth: 0,
              width: variant === 'projects' ? '100%' : { xs: '100%', sm: 'auto' },
            }}
            variant="outlined"
          >
            {repositoryLabel}
          </ExternalButtonLink>
        </Stack>
      </CardContent>
    </Box>
  )
}
