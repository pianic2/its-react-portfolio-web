import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, CardContent, Chip, Stack, Typography } from '@mui/material'
import { ButtonLink, ExternalLink } from '../../../components/actions/AppLink'
import { StudioCard } from '../../../components/surfaces/StudioCard'
import type { ProjectViewModel } from '../../../content/loaders'
import type { Language } from '../../../content/schema'
import { ProjectArtwork } from './ProjectArtwork'

type ProjectShowcaseCardProps = {
  language: Language
  project: ProjectViewModel
  readProjectLabel: string
}

export function ProjectShowcaseCard({
  language,
  project,
  readProjectLabel,
}: ProjectShowcaseCardProps) {
  const titleId = `showcase-${project.id}-title`

  return (
    <StudioCard
      aria-labelledby={titleId}
      component="article"
      sx={{
        blockSize: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden',
        transition: (theme) =>
          `transform ${theme.digitalStudio.motion.duration.fast}ms ${theme.digitalStudio.motion.easing.standard}`,
        '&:focus-within': { outline: 'none' },
        '@media (hover: hover)': {
          '&:hover': { transform: 'translateY(-4px)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      <ProjectArtwork number={project.number} variant={project.visualVariant} />
      <CardContent
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: 3,
          minWidth: 0,
          p: { xs: 3, sm: 4 },
          '&:last-child': { pb: { xs: 3, sm: 4 } },
        }}
      >
        <Stack spacing={1.5} sx={{ minWidth: 0 }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}
          >
            <Typography sx={{ letterSpacing: 0 }} variant="overline">
              {project.eyebrow}
            </Typography>
            <Chip label={project.claimLabel} size="small" variant="outlined" />
          </Stack>
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
          <Typography color="text.secondary">{project.summary}</Typography>
        </Stack>

        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {project.capabilities.map((capability) => (
            <Chip key={capability.id} label={capability.label} size="small" />
          ))}
        </Stack>

        <Box
          sx={{
            alignItems: { xs: 'stretch', sm: 'center' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'space-between',
            marginBlockStart: 'auto',
            minWidth: 0,
          }}
        >
          <ButtonLink
            endIcon={<ArrowForwardRounded aria-hidden="true" />}
            sx={{ minWidth: 0 }}
            to={project.detailPath}
            variant="contained"
          >
            {readProjectLabel}
          </ButtonLink>
          <ExternalLink
            href={project.repositoryUrl}
            language={language}
            newTab
            sx={{ alignItems: 'center', display: 'inline-flex', minHeight: 44 }}
          >
            {project.links.find((link) => link.kind === 'repository')?.label}
          </ExternalLink>
        </Box>
      </CardContent>
    </StudioCard>
  )
}
