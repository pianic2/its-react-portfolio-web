import DarkModeRounded from '@mui/icons-material/DarkModeRounded'
import LightModeRounded from '@mui/icons-material/LightModeRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { useDigitalStudioTheme } from '../theme'
import type { SemanticColors } from '../theme/tokens'

type ReviewPanelProps = {
  eyebrow: string
  title: string
  children: ReactNode
  wide?: boolean
}

function ReviewPanel({ children, eyebrow, title, wide = false }: ReviewPanelProps) {
  return (
    <Paper
      component="section"
      sx={(theme) => ({
        boxShadow: theme.digitalStudio.shadows.large,
        gridColumn: wide ? { lg: '1 / -1' } : undefined,
        px: {
          xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
          sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
          md: `${theme.digitalStudio.layout.panelInset.wide}px`,
        },
        py: {
          xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
          sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
          md: `${theme.digitalStudio.layout.panelInset.wide}px`,
        },
      })}
    >
      <Stack spacing={4}>
        <Box>
          <Typography color="text.secondary" variant="overline">
            {eyebrow}
          </Typography>
          <Typography component="h2" variant="h3">
            {title}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Paper>
  )
}

const colourRoles: Array<{
  label: string
  role: keyof SemanticColors
  foreground: keyof SemanticColors
}> = [
  { label: 'Canvas', role: 'canvas', foreground: 'text' },
  { label: 'Surface', role: 'surface', foreground: 'text' },
  { label: 'Strong surface', role: 'surfaceStrong', foreground: 'text' },
  { label: 'Primary', role: 'primary', foreground: 'onPrimary' },
  { label: 'Secondary', role: 'secondary', foreground: 'onSecondary' },
  { label: 'Accent', role: 'accent', foreground: 'onAccent' },
  { label: 'Success', role: 'success', foreground: 'onSuccess' },
  { label: 'Warning', role: 'warning', foreground: 'onWarning' },
  { label: 'Error', role: 'error', foreground: 'onError' },
]

const spacingSteps = [1, 2, 4, 6, 8, 12] as const

const foundationSamples = [
  { label: 'Small', radius: 'sm', shadow: 'small' },
  { label: 'Large', radius: 'lg', shadow: 'medium' },
  { label: 'XL', radius: 'xl', shadow: 'large' },
] as const

export function DesignSystemPage() {
  const theme = useTheme()
  const { mode, toggleMode } = useDigitalStudioTheme()
  const {
    borderWidths,
    colors,
    layout,
    motion,
    patterns,
    radii,
    shadowOffsets,
    shadows,
    spacing,
  } = theme.digitalStudio
  const nextMode = mode === 'light' ? 'dark' : 'light'

  const panelInset = {
    xs: `${layout.panelInset.compact}px`,
    sm: `${layout.panelInset.regular}px`,
    md: `${layout.panelInset.wide}px`,
  }
  const sectionGap = {
    xs: `${layout.sectionGap.compact + layout.shadowClearance}px`,
    sm: `${layout.sectionGap.regular + layout.shadowClearance}px`,
    md: `${layout.sectionGap.wide + layout.shadowClearance}px`,
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        paddingBlockEnd: {
          xs: `max(${layout.pageGutter.regular + layout.shadowClearance}px, calc(env(safe-area-inset-bottom) + ${layout.shadowClearance}px))`,
          md: `max(${layout.pageGutter.wide + layout.shadowClearance}px, calc(env(safe-area-inset-bottom) + ${layout.shadowClearance}px))`,
        },
        paddingBlockStart: {
          xs: `max(${layout.pageGutter.regular}px, env(safe-area-inset-top))`,
          md: `max(${layout.pageGutter.wide}px, env(safe-area-inset-top))`,
        },
      }}
    >
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          paddingInlineEnd: {
            xs: `max(${layout.pageGutter.compact + layout.shadowClearance}px, calc(env(safe-area-inset-right) + ${layout.shadowClearance}px))`,
            sm: `max(${layout.pageGutter.regular + layout.shadowClearance}px, calc(env(safe-area-inset-right) + ${layout.shadowClearance}px))`,
            md: `max(${layout.pageGutter.wide + layout.shadowClearance}px, calc(env(safe-area-inset-right) + ${layout.shadowClearance}px))`,
          },
          paddingInlineStart: {
            xs: `max(${layout.pageGutter.compact}px, env(safe-area-inset-left))`,
            sm: `max(${layout.pageGutter.regular}px, env(safe-area-inset-left))`,
            md: `max(${layout.pageGutter.wide}px, env(safe-area-inset-left))`,
          },
        }}
      >
        <Stack sx={{ gap: sectionGap }}>
          <Paper
            component="header"
            sx={{
              bgcolor: 'primary.main',
              borderRadius: { xs: `${radii.lg}px`, md: `${radii.xl}px` },
              boxShadow: shadows.large,
              color: 'primary.contrastText',
              overflow: 'hidden',
              px: panelInset,
              py: {
                xs: `${layout.panelInset.regular}px`,
                sm: `${layout.panelInset.wide}px`,
                md: `${layout.panelInset.wide + 16}px`,
              },
              position: 'relative',
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                backgroundImage: patterns.halftone,
                backgroundSize: '9px 9px',
                inset: 0,
                opacity: 0.12,
                position: 'absolute',
              }}
            />
            <Stack spacing={6} sx={{ position: 'relative' }}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                sx={{
                  alignItems: { xs: 'flex-start', md: 'center' },
                  justifyContent: 'space-between',
                }}
              >
                <Chip
                  label="Development only · IRPW-15"
                  sx={{ bgcolor: colors.warning, color: colors.onWarning, maxWidth: '100%' }}
                />
                <Button
                  onClick={toggleMode}
                  startIcon={mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
                  sx={{
                    alignSelf: { xs: 'flex-start', md: 'center' },
                    bgcolor: colors.surface,
                    color: colors.text,
                    maxWidth: '100%',
                  }}
                  variant="outlined"
                >
                  Preview {nextMode} mode
                </Button>
              </Stack>

              <Box sx={{ maxWidth: 980 }}>
                <Typography component="h1" variant="h1">
                  Pop! Digital Studio
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: '1.1rem', md: '1.35rem' }, mt: 5, maxWidth: 760 }}
                >
                  A loud, spacious and accessible visual language for a bilingual engineering
                  portfolio. This route is a review surface, not a public page.
                </Typography>
              </Box>

              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3 }}>
                <Chip
                  label={`Mode: ${mode}`}
                  sx={{ bgcolor: colors.accent, color: colors.onAccent }}
                />
                <Chip
                  label="WCAG 2.2 AA baseline"
                  sx={{ bgcolor: colors.success, color: colors.onSuccess }}
                />
                <Chip
                  label="Reduced motion supported"
                  sx={{ bgcolor: colors.warning, color: colors.onWarning }}
                />
              </Stack>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: 'grid',
              gap: sectionGap,
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            <ReviewPanel
              eyebrow="01 · Semantic colour"
              title="Roles instead of random hex values"
              wide
            >
              <Box
                sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(3, minmax(0, 1fr))',
                    lg: 'repeat(5, minmax(0, 1fr))',
                  },
                }}
              >
                {colourRoles.map(({ foreground, label, role }) => (
                  <Box
                    key={role}
                    sx={{
                      bgcolor: colors[role],
                      border: `${borderWidths.bold}px solid ${colors.border}`,
                      borderRadius: `${radii.md}px`,
                      boxShadow: shadows.small,
                      color: colors[foreground],
                      marginBlockEnd: `${shadowOffsets.small}px`,
                      marginInlineEnd: `${shadowOffsets.small}px`,
                      minHeight: 128,
                      minWidth: 0,
                      p: 4,
                    }}
                  >
                    <Typography sx={{ fontWeight: 900 }}>{label}</Typography>
                    <Typography
                      sx={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.78rem',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {colors[role]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </ReviewPanel>

            <ReviewPanel eyebrow="02 · Typography" title="Expressive display, readable interface">
              <Stack spacing={4}>
                <Typography variant="h2">Make systems visible.</Typography>
                <Typography variant="h3">Build evidence, not claims.</Typography>
                <Typography variant="h4">Reusable components scale the language.</Typography>
                <Typography>
                  Body copy stays calm and readable. Display typography is reserved for short,
                  high-impact messages.
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Secondary copy remains legible against the current surface tokens.
                </Typography>
              </Stack>
            </ReviewPanel>

            <ReviewPanel eyebrow="03 · Foundations" title="Spacing, shape and graphic elevation">
              <Stack spacing={6}>
                <Box>
                  <Typography gutterBottom sx={{ fontWeight: 900 }}>
                    Spacing · {spacing.base} px base unit
                  </Typography>
                  <Box
                    sx={{
                      alignItems: 'end',
                      display: 'grid',
                      gap: 4,
                      gridTemplateColumns: {
                        xs: 'repeat(2, minmax(0, 1fr))',
                        sm: 'repeat(3, minmax(0, 1fr))',
                      },
                    }}
                  >
                    {spacingSteps.map((step) => {
                      const size = step * spacing.base

                      return (
                        <Box key={step} sx={{ minWidth: 0 }}>
                          <Box
                            sx={{
                              bgcolor: 'secondary.main',
                              border: `${borderWidths.regular}px solid ${colors.border}`,
                              height: `${size}px`,
                              minHeight: spacing.base,
                              minWidth: spacing.base,
                              width: `${size}px`,
                            }}
                          />
                          <Typography sx={{ mt: 1 }} variant="caption">
                            {size}px
                          </Typography>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    gap: 4,
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  }}
                >
                  {foundationSamples.map(({ label, radius, shadow }) => (
                    <Box
                      key={label}
                      sx={{
                        bgcolor: 'info.main',
                        border: `${borderWidths.bold}px solid ${colors.border}`,
                        borderRadius: `${radii[radius]}px`,
                        boxShadow: shadows[shadow],
                        color: 'info.contrastText',
                        marginBlockEnd: `${shadowOffsets[shadow]}px`,
                        marginInlineEnd: `${shadowOffsets[shadow]}px`,
                        minHeight: 112,
                        minWidth: 0,
                        p: 3,
                      }}
                    >
                      <Typography noWrap sx={{ fontWeight: 900 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2">{radii[radius]}px</Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </ReviewPanel>

            <ReviewPanel eyebrow="04 · Components" title="Material UI with a Pop Art voice" wide>
              <Box
                sx={{
                  display: 'grid',
                  gap: 7,
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                }}
              >
                <Stack spacing={5} sx={{ minWidth: 0 }}>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 4 }}>
                    <Button variant="contained">Primary action</Button>
                    <Button color="secondary" variant="contained">
                      Secondary
                    </Button>
                    <Button variant="outlined">Outlined</Button>
                    <Button disabled variant="contained">
                      Disabled
                    </Button>
                  </Stack>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                    <Chip color="primary" label="React" />
                    <Chip color="secondary" label="TypeScript" />
                    <Chip color="info" label="Material UI" />
                    <Chip color="success" label="Accessible" />
                  </Stack>
                  <TextField
                    fullWidth
                    helperText="Keyboard focus uses a high-contrast double ring."
                    label="Example field"
                  />
                  <Alert severity="info">
                    Colour is paired with text and structure, never used alone.
                  </Alert>
                  <Typography>
                    Inspect this <Link href="#focus-and-motion">accessible inline link</Link> with
                    the Tab key.
                  </Typography>
                </Stack>

                <Card
                  sx={{
                    marginBlockEnd: `${shadowOffsets.medium}px`,
                    marginInlineEnd: `${shadowOffsets.medium}px`,
                    minWidth: 0,
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: panelInset.xs, md: panelInset.sm },
                      '&:last-child': { pb: { xs: panelInset.xs, md: panelInset.sm } },
                    }}
                  >
                    <Stack spacing={4}>
                      <Chip color="warning" label="Case study" sx={{ alignSelf: 'flex-start' }} />
                      <Typography variant="h4">
                        Architecture decisions become portfolio evidence.
                      </Typography>
                      <Typography color="text.secondary">
                        Strong outlines and offset shadows create identity while hierarchy remains
                        semantic and predictable.
                      </Typography>
                      <Button sx={{ alignSelf: 'flex-start' }} variant="contained">
                        Read the project
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </ReviewPanel>

            <ReviewPanel
              eyebrow="05 · Focus and motion"
              title="Interaction stays visible and optional"
              wide
            >
              <Box
                id="focus-and-motion"
                sx={{
                  alignItems: 'center',
                  display: 'grid',
                  gap: 6,
                  gridTemplateColumns: { xs: '1fr', md: '1fr minmax(260px, 0.7fr)' },
                }}
              >
                <Stack spacing={4} sx={{ minWidth: 0 }}>
                  <Typography>
                    Use Tab to inspect focus rings. Hover and press controls to inspect short
                    offset-shadow movement. Under <code>prefers-reduced-motion: reduce</code>,
                    transforms and transitions are removed.
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 4 }}>
                    <Button variant="contained">Tab to me</Button>
                    <Button color="secondary" variant="contained">
                      Then here
                    </Button>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    bgcolor: 'info.main',
                    border: `${borderWidths.hero}px solid ${colors.border}`,
                    borderRadius: `${radii.lg}px`,
                    boxShadow: shadows.large,
                    color: 'info.contrastText',
                    marginBlockEnd: `${shadowOffsets.large}px`,
                    marginInlineEnd: `${shadowOffsets.large}px`,
                    p: { xs: panelInset.xs, md: panelInset.sm },
                    textAlign: 'center',
                    transition: theme.transitions.create(['transform', 'box-shadow'], {
                      duration: motion.duration.standard,
                    }),
                    '&:hover': {
                      boxShadow: shadows.small,
                      transform: 'translate(6px, 6px) rotate(1deg)',
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'none',
                      '&:hover': { transform: 'none' },
                    },
                  }}
                >
                  <Typography variant="h4">Motion is enhancement.</Typography>
                </Box>
              </Box>
            </ReviewPanel>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
