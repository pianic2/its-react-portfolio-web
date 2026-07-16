import { Box, CardContent, Chip, GlobalStyles, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SkipLink } from '../app/SkipLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { StudioCard } from '../components/surfaces/StudioCard'
import { AccessibilityShowcase } from './design-system/AccessibilityShowcase'
import { PrimitiveShowcase } from './design-system/PrimitiveShowcase'
import { ShowcaseReviewControls } from './design-system/ShowcaseReviewControls'
import { TokenShowcase } from './design-system/TokenShowcase'

function getSystemReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function DesignSystemPage() {
  const [forcedReducedMotion, setForcedReducedMotion] = useState(false)
  const [systemReducedMotion, setSystemReducedMotion] = useState(getSystemReducedMotion)

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

  return (
    <Box
      data-force-reduced-motion={forcedReducedMotion ? 'true' : 'false'}
      sx={{ minHeight: '100vh' }}
    >
      {forcedReducedMotion ? (
        <GlobalStyles
          styles={{
            html: { scrollBehavior: 'auto !important' },
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              scrollBehavior: 'auto !important',
              transitionDuration: '0.01ms !important',
            },
            '.MuiButton-root:hover, .MuiButton-root:active, .MuiIconButton-root:hover, .MuiIconButton-root:active, a:hover, a:active, .is-active, [data-motion-sensitive="true"]:hover': {
              transform: 'none !important',
            },
          }}
        />
      ) : null}

      <SkipLink label="Skip to design-system content" targetId="design-system-main" />

      <Box component="main" id="design-system-main" sx={{ outline: 'none' }} tabIndex={-1}>
        <PageSection component="div" spacing="compact">
          <PageContainer>
            <StudioCard component="header" variant="featured">
              <CardContent
                sx={(theme) => ({
                  overflow: 'hidden',
                  p: {
                    xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
                    sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
                    md: `${theme.digitalStudio.layout.panelInset.wide}px`,
                  },
                  position: 'relative',
                  '&:last-child': {
                    pb: {
                      xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
                      sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
                      md: `${theme.digitalStudio.layout.panelInset.wide}px`,
                    },
                  },
                  '&::before': {
                    backgroundImage: theme.digitalStudio.patterns.halftone,
                    backgroundSize: theme.spacing(3),
                    content: '""',
                    inset: 0,
                    opacity: 0.12,
                    pointerEvents: 'none',
                    position: 'absolute',
                  },
                })}
              >
                <Stack spacing={6} sx={{ position: 'relative' }}>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3 }}>
                    <Chip color="warning" label="Development only · IRPW-17" />
                    <Chip color="success" label="WCAG 2.2 AA baseline" />
                    <Chip color="info" label="Responsive review surface" />
                  </Stack>

                  <Box sx={{ maxWidth: '72ch' }}>
                    <Typography component="h1" variant="h1">
                      Pop! Digital Studio
                    </Typography>
                    <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.35rem' }, mt: 5 }}>
                      A systematic, repeatable review surface for the application-local tokens,
                      primitives, states, responsive behaviour and accessibility contract. This route
                      is not a public component-library product.
                    </Typography>
                  </Box>

                  <ShowcaseReviewControls
                    forcedReducedMotion={forcedReducedMotion}
                    onForcedReducedMotionChange={setForcedReducedMotion}
                  />
                </Stack>
              </CardContent>
            </StudioCard>
          </PageContainer>
        </PageSection>

        <PageSection component="div" spacing="compact">
          <PageContainer>
            <Box
              sx={(theme) => ({
                display: 'grid',
                gap: {
                  xs: `${theme.digitalStudio.layout.sectionGap.compact + theme.digitalStudio.layout.shadowClearance}px`,
                  sm: `${theme.digitalStudio.layout.sectionGap.regular + theme.digitalStudio.layout.shadowClearance}px`,
                  md: `${theme.digitalStudio.layout.sectionGap.wide + theme.digitalStudio.layout.shadowClearance}px`,
                },
                gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
              })}
            >
              <TokenShowcase />
              <PrimitiveShowcase />
              <AccessibilityShowcase
                forcedReducedMotion={forcedReducedMotion}
                systemReducedMotion={systemReducedMotion}
              />
            </Box>
          </PageContainer>
        </PageSection>
      </Box>
    </Box>
  )
}
