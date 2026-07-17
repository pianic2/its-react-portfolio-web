import { Box } from '@mui/material'
import type { ProjectVisualVariant } from '../../../content/schema'

type ProjectArtworkProps = {
  number: string
  variant: ProjectVisualVariant
}

const accentByVariant = {
  'signal-yellow': 'warning.main',
  'studio-pink': 'secondary.main',
  'electric-cyan': 'info.main',
} as const

export function ProjectArtwork({ number, variant }: ProjectArtworkProps) {
  const isSignal = variant === 'signal-yellow'
  const isStudio = variant === 'studio-pink'

  return (
    <Box
      aria-hidden="true"
      sx={{
        alignItems: 'center',
        backgroundColor: accentByVariant[variant],
        borderBottom: (theme) =>
          `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
        display: 'flex',
        inlineSize: '100%',
        justifyContent: 'center',
        minBlockSize: { xs: 176, sm: 208 },
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundImage: (theme) =>
            isStudio
              ? theme.digitalStudio.patterns.diagonal
              : theme.digitalStudio.patterns.halftone,
          backgroundSize: isStudio ? 'auto' : '14px 14px',
          inset: 0,
          opacity: 0.7,
          position: 'absolute',
        }}
      />
      <Box
        sx={{
          backgroundColor: isSignal ? 'primary.main' : 'background.paper',
          border: (theme) =>
            `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.border}`,
          blockSize: { xs: 104, sm: 126 },
          inlineSize: { xs: 104, sm: 126 },
          position: 'absolute',
          transform: isSignal ? 'translate(-42%, 8%) rotate(-8deg)' : 'translate(38%, -4%)',
        }}
      />
      <Box
        sx={{
          border: (theme) =>
            `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.border}`,
          borderRadius: isStudio ? '50%' : 0,
          blockSize: { xs: 72, sm: 92 },
          inlineSize: { xs: 72, sm: 92 },
          position: 'absolute',
          transform: isStudio ? 'translate(-58%, 28%)' : 'translate(58%, -24%) rotate(12deg)',
        }}
      />
      <Box
        component="span"
        sx={{
          color: 'text.contrastText',
          fontFamily: '"Archivo Black", "Arial Black", sans-serif',
          fontSize: { xs: '4.5rem', sm: '6.25rem' },
          fontWeight: 900,
          letterSpacing: 0,
          lineHeight: 1,
          position: 'relative',
          textShadow: (theme) => `4px 4px 0 ${theme.digitalStudio.colors.canvas}`,
          zIndex: 1,
        }}
      >
        {number}
      </Box>
    </Box>
  )
}
