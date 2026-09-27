import { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'

type ProjectVisualStoryProps = {
  title: string
  steps: Array<{ id: string; label: string; description: string }>
  interactive?: boolean
  compact?: boolean
}

export function ProjectVisualStory({
  title,
  steps,
  interactive = false,
  compact = false,
}: ProjectVisualStoryProps) {
  const [selectedStep, setSelectedStep] = useState(0)
  const activeStep = steps[selectedStep] ?? steps[0]

  return (
    <Box
      aria-label={title}
      component="figure"
      sx={(theme) => ({
        backgroundColor: theme.digitalStudio.colors.surface,
        border: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
        color: theme.digitalStudio.colors.text,
        m: 0,
        minWidth: 0,
        overflow: 'hidden',
        p: { xs: 2, sm: compact ? 2.5 : 3 },
        position: 'relative',
        container: 'project-story / inline-size',
        '&::before': {
          backgroundImage: theme.digitalStudio.patterns.halftone,
          backgroundSize: '12px 12px',
          content: '""',
          inset: 0,
          opacity: 0.11,
          pointerEvents: 'none',
          position: 'absolute',
        },
      })}
    >
      <Stack spacing={compact ? 1.5 : 2} sx={{ position: 'relative' }}>
        {!compact ? (
          <Typography component="figcaption" sx={{ fontWeight: 900 }} variant="overline">
            {title}
          </Typography>
        ) : null}
        <Box
          component="ol"
          sx={{
            display: 'grid',
            gap: { xs: 1, sm: 1.5 },
            gridTemplateColumns: '1fr',
            listStyle: 'none',
            m: 0,
            minWidth: 0,
            p: 0,
            '@container project-story (min-width: 34rem)': {
              gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
            },
          }}
        >
          {steps.map((step, index) => (
            <Box
              component="li"
              key={step.id}
              sx={{ display: 'flex', minWidth: 0, position: 'relative' }}
            >
              {interactive ? (
                <Button
                  aria-pressed={selectedStep === index}
                  onClick={() => setSelectedStep(index)}
                  sx={{
                    alignItems: 'flex-start',
                    backgroundColor: selectedStep === index ? 'primary.main' : 'background.paper',
                    border: (theme) =>
                      `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                    borderRadius: 0,
                    color: selectedStep === index ? 'primary.contrastText' : 'text.primary',
                    flex: 1,
                    justifyContent: 'flex-start',
                    minHeight: compact ? 56 : 68,
                    px: 1.5,
                    py: 1.25,
                    textAlign: 'start',
                    transition: (theme) =>
                      `background-color ${theme.digitalStudio.motion.duration.fast}ms ${theme.digitalStudio.motion.easing.standard}`,
                    '&:hover': {
                      backgroundColor: selectedStep === index ? 'primary.dark' : 'action.hover',
                    },
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                  }}
                >
                  <Stack spacing={0.25}>
                    <Typography component="span" sx={{ fontWeight: 900 }} variant="overline">
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Typography component="span" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      {step.label}
                    </Typography>
                  </Stack>
                </Button>
              ) : (
                <Box
                  sx={{
                    backgroundColor: index === 0 ? 'primary.main' : 'background.paper',
                    border: (theme) =>
                      `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                    color: index === 0 ? 'primary.contrastText' : 'text.primary',
                    flex: 1,
                    minHeight: compact ? 52 : 64,
                    px: 1.5,
                    py: 1.25,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ display: 'block', fontWeight: 900 }}
                    variant="overline"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography sx={{ fontWeight: 800, lineHeight: 1.2 }}>{step.label}</Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        {interactive && activeStep ? (
          <Typography aria-live="polite" sx={{ maxWidth: '66ch' }}>
            {activeStep.description}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  )
}
