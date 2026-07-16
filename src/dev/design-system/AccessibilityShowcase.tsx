import { Box, Button, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRef } from 'react'
import { ShowcaseSection } from './ShowcaseSection'

type AccessibilityShowcaseProps = {
  forcedReducedMotion: boolean
  systemReducedMotion: boolean
}

export function AccessibilityShowcase({
  forcedReducedMotion,
  systemReducedMotion,
}: AccessibilityShowcaseProps) {
  const theme = useTheme()
  const focusTarget = useRef<HTMLButtonElement | null>(null)
  const { borderWidths, colors, motion, radii, shadowOffsets, shadows } = theme.digitalStudio

  return (
    <ShowcaseSection
      description="Keyboard focus is real, disabled controls remain perceivable and motion can be inspected with the operating-system preference or the local review override."
      eyebrow="09 · Accessibility"
      title="Focus, disabled state and optional motion"
      wide
    >
      <Box
        sx={{
          alignItems: 'start',
          display: 'grid',
          gap: 7,
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        <Stack spacing={5}>
          <Typography>
            Use Tab to inspect every interactive element. The button below moves focus deliberately
            to the following control so the high-contrast double ring can be reviewed without a
            mouse.
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 4 }}>
            <Button onClick={() => focusTarget.current?.focus()} variant="outlined">
              Move focus to sample
            </Button>
            <Button ref={focusTarget} variant="contained">
              Focus sample
            </Button>
            <Button disabled variant="contained">
              Disabled sample
            </Button>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            System reduced motion: {systemReducedMotion ? 'enabled' : 'disabled'} · Local preview:{' '}
            {forcedReducedMotion ? 'enabled' : 'disabled'}
          </Typography>
        </Stack>

        <Box
          data-motion-sensitive="true"
          sx={{
            bgcolor: 'info.main',
            border: `${borderWidths.hero}px solid ${colors.border}`,
            borderRadius: `${radii.lg}px`,
            boxShadow: shadows.large,
            color: 'info.contrastText',
            marginBlockEnd: `${shadowOffsets.large}px`,
            marginInlineEnd: `${shadowOffsets.large}px`,
            p: 6,
            textAlign: 'center',
            transition: theme.transitions.create(['box-shadow', 'transform'], {
              duration: motion.duration.standard,
              easing: motion.easing.standard,
            }),
            '&:hover': {
              boxShadow: shadows.small,
              transform: `translate(${shadowOffsets.medium}px, ${shadowOffsets.medium}px) rotate(1deg)`,
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': { transform: 'none' },
            },
          }}
        >
          <Typography component="h3" variant="h4">
            Motion is enhancement.
          </Typography>
          <Typography sx={{ mt: 3 }}>Hover this sample with and without reduced motion.</Typography>
        </Box>
      </Box>
    </ShowcaseSection>
  )
}
