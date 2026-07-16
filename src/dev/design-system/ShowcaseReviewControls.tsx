import { Box, Chip, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useEffect, useMemo, useState } from 'react'
import { ButtonLink } from '../../components/actions/AppLink'
import { ThemeToggle } from '../../components/navigation/ThemeToggle'
import { useDigitalStudioTheme } from '../../theme'

type ShowcaseReviewControlsProps = {
  forcedReducedMotion: boolean
  onForcedReducedMotionChange: (enabled: boolean) => void
}

function getViewportWidth() {
  return typeof window === 'undefined' ? 0 : window.innerWidth
}

function getSystemReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ShowcaseReviewControls({
  forcedReducedMotion,
  onForcedReducedMotionChange,
}: ShowcaseReviewControlsProps) {
  const theme = useTheme()
  const { mode } = useDigitalStudioTheme()
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth)
  const [systemReducedMotion, setSystemReducedMotion] = useState(getSystemReducedMotion)

  useEffect(() => {
    const updateViewport = () => setViewportWidth(getViewportWidth())
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event: MediaQueryListEvent) => setSystemReducedMotion(event.matches)

    setSystemReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  const breakpoint = useMemo(() => {
    const { lg, md, sm, xl } = theme.breakpoints.values

    if (viewportWidth >= xl) {
      return 'xl'
    }
    if (viewportWidth >= lg) {
      return 'lg'
    }
    if (viewportWidth >= md) {
      return 'md'
    }
    if (viewportWidth >= sm) {
      return 'sm'
    }

    return 'xs'
  }, [theme.breakpoints.values, viewportWidth])

  return (
    <Stack spacing={5}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3 }}>
        <Chip color="info" label={`Theme: ${mode}`} />
        <Chip color="secondary" label={`Viewport: ${viewportWidth}px`} />
        <Chip color="primary" label={`Breakpoint: ${breakpoint}`} />
        <Chip
          color={systemReducedMotion ? 'warning' : 'success'}
          label={`System reduced motion: ${systemReducedMotion ? 'on' : 'off'}`}
        />
      </Stack>

      <Box
        sx={{
          alignItems: { xs: 'stretch', md: 'center' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          justifyContent: 'space-between',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 3 }}>
          <ThemeToggle language="en" presentation="full" />
          <FormControlLabel
            control={
              <Switch
                checked={forcedReducedMotion}
                onChange={(_, checked) => onForcedReducedMotionChange(checked)}
              />
            }
            label="Force reduced-motion preview"
            sx={{ m: 0 }}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 3 }}>
          <ButtonLink to="/it" variant="outlined">
            Open Italian shell
          </ButtonLink>
          <ButtonLink to="/en" variant="outlined">
            Open English shell
          </ButtonLink>
        </Stack>
      </Box>

      <Typography color="text.secondary" variant="body2">
        Resize the real browser viewport. Canonical evidence widths are 390 px, 768 px and 1440 px;
        boundary checks use 320, 600, 1024 and 1280 px.
      </Typography>
    </Stack>
  )
}
