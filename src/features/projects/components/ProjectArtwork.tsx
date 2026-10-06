import { Box } from '@mui/material'
import type { ProjectViewModel } from '../../../content/loaders'

type ProjectArtworkProps = {
  project: ProjectViewModel
}

export function ProjectArtwork({ project }: ProjectArtworkProps) {
  const artwork = project.assets.find((asset) => asset.id === `project-diagram-${project.id}`)

  if (!artwork) return null

  const image = (
    <Box
      component="img"
      alt={artwork.decorative ? '' : artwork.alt}
      aria-hidden={artwork.decorative || undefined}
      data-artwork-provenance={artwork.provenance}
      data-project-artwork={project.id}
      decoding="async"
      height={artwork.height}
      loading="lazy"
      src={`${import.meta.env.BASE_URL}${artwork.src}`}
      sx={{
        border: (theme) =>
          `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
        display: 'block',
        height: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        width: '100%',
      }}
      width={artwork.width}
    />
  )

  if (!artwork.mobileSrc) return image

  return (
    <picture>
      <source
        height={840}
        media="(max-width: 1199px)"
        srcSet={`${import.meta.env.BASE_URL}${artwork.mobileSrc}`}
        width={600}
      />
      {image}
    </picture>
  )
}
