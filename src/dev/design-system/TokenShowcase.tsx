import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { SemanticColors } from '../../theme'
import { ShowcaseSection } from './ShowcaseSection'

const colourRoles = [
  { foreground: 'text', label: 'Canvas', role: 'canvas' },
  { foreground: 'text', label: 'Surface', role: 'surface' },
  { foreground: 'text', label: 'Strong surface', role: 'surfaceStrong' },
  { foreground: 'canvas', label: 'Text', role: 'text' },
  { foreground: 'canvas', label: 'Muted text', role: 'textMuted' },
  { foreground: 'canvas', label: 'Border', role: 'border' },
  { foreground: 'onPrimary', label: 'Primary', role: 'primary' },
  { foreground: 'onSecondary', label: 'Secondary', role: 'secondary' },
  { foreground: 'onAccent', label: 'Accent', role: 'accent' },
  { foreground: 'onSuccess', label: 'Success', role: 'success' },
  { foreground: 'onWarning', label: 'Warning', role: 'warning' },
  { foreground: 'onError', label: 'Error', role: 'error' },
  { foreground: 'canvas', label: 'Focus inner', role: 'focusInner' },
  { foreground: 'onWarning', label: 'Focus outer', role: 'focusOuter' },
] as const satisfies ReadonlyArray<{
  foreground: keyof SemanticColors
  label: string
  role: keyof SemanticColors
}>

const spacingSteps = [1, 2, 3, 4, 6, 8, 12] as const
const radiusKeys = ['xs', 'sm', 'md', 'lg', 'xl', 'pill'] as const
const borderKeys = ['thin', 'regular', 'bold', 'hero'] as const
const shadowKeys = ['small', 'medium', 'large'] as const

export function TokenShowcase() {
  const theme = useTheme()
  const { borderWidths, colors, layout, patterns, radii, shadowOffsets, shadows, spacing } =
    theme.digitalStudio

  return (
    <>
      <ShowcaseSection
        description="Every application surface consumes semantic roles. Raw palette values remain isolated in the token source."
        eyebrow="01 · Semantic colour"
        title="Roles instead of scattered hex values"
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
                minWidth: 0,
                p: 4,
              }}
            >
              <Typography sx={{ fontWeight: 900 }}>{label}</Typography>
              <Typography
                sx={{ fontFamily: 'ui-monospace, monospace', overflowWrap: 'anywhere' }}
                variant="caption"
              >
                {colors[role]}
              </Typography>
            </Box>
          ))}
        </Box>
      </ShowcaseSection>

      <ShowcaseSection
        description="Display faces remain short and graphic; interface and body copy preserve a calm reading rhythm."
        eyebrow="02 · Typography"
        title="Expressive hierarchy, readable content"
      >
        <Stack spacing={4} sx={{ minWidth: 0 }}>
          <Typography component="p" sx={{ overflowWrap: 'anywhere' }} variant="h1">
            Visible systems.
          </Typography>
          <Typography component="p" variant="h2">
            Evidence before claims.
          </Typography>
          <Typography component="p" variant="h3">
            Reusable language scales.
          </Typography>
          <Typography component="p" variant="h4">
            Accessible interaction stays predictable.
          </Typography>
          <Typography component="p" variant="h5">
            Heading level five
          </Typography>
          <Typography component="p" variant="h6">
            Heading level six
          </Typography>
          <Typography>
            Body copy remains suitable for long-form engineering explanations, architecture
            decisions and concise portfolio narratives.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Secondary copy keeps sufficient contrast in both light and dark modes.
          </Typography>
          <Typography variant="overline">Overline metadata</Typography>
        </Stack>
      </ShowcaseSection>

      <ShowcaseSection
        description="Spacing, radius, border and elevation samples expose the exact token scale used by shared primitives."
        eyebrow="03 · Foundations"
        title="Spacing, shape and graphic elevation"
      >
        <Stack spacing={7}>
          <Box>
            <Typography gutterBottom sx={{ fontWeight: 900 }}>
              Spacing · {spacing.base}px base unit
            </Typography>
            <Box
              sx={{
                alignItems: 'end',
                display: 'grid',
                gap: 4,
                gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, 1fr)' },
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

          <Box>
            <Typography gutterBottom sx={{ fontWeight: 900 }}>
              Responsive layout tokens
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2">
                Page gutter: {layout.pageGutter.compact}px / {layout.pageGutter.regular}px /{' '}
                {layout.pageGutter.wide}px
              </Typography>
              <Typography variant="body2">
                Panel inset: {layout.panelInset.compact}px / {layout.panelInset.regular}px /{' '}
                {layout.panelInset.wide}px
              </Typography>
              <Typography variant="body2">
                Section gap: {layout.sectionGap.compact}px / {layout.sectionGap.regular}px /{' '}
                {layout.sectionGap.wide}px
              </Typography>
              <Typography variant="body2">
                Maximum shadow clearance: {layout.shadowClearance}px
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontWeight: 900 }}>
              Radius scale
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 4,
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              {radiusKeys.map((radius) => (
                <Box
                  key={radius}
                  sx={{
                    bgcolor: 'info.main',
                    border: `${borderWidths.bold}px solid ${colors.border}`,
                    borderRadius: `${radii[radius]}px`,
                    color: 'info.contrastText',
                    minWidth: 0,
                    p: 4,
                  }}
                >
                  <Typography sx={{ fontWeight: 900 }}>{radius}</Typography>
                  <Typography variant="body2">{radii[radius]}px</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontWeight: 900 }}>
              Border widths
            </Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 4 }}>
              {borderKeys.map((border) => (
                <Box
                  key={border}
                  sx={{
                    border: `${borderWidths[border]}px solid ${colors.border}`,
                    borderRadius: `${radii.sm}px`,
                    p: 4,
                  }}
                >
                  <Typography sx={{ fontWeight: 900 }}>{border}</Typography>
                  <Typography variant="body2">{borderWidths[border]}px</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontWeight: 900 }}>
              Offset shadows
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: 6,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
              }}
            >
              {shadowKeys.map((shadow) => (
                <Box
                  key={shadow}
                  sx={{
                    bgcolor: 'background.paper',
                    border: `${borderWidths.bold}px solid ${colors.border}`,
                    borderRadius: `${radii.md}px`,
                    boxShadow: shadows[shadow],
                    marginBlockEnd: `${shadowOffsets[shadow]}px`,
                    marginInlineEnd: `${shadowOffsets[shadow]}px`,
                    p: 4,
                  }}
                >
                  <Typography sx={{ fontWeight: 900 }}>{shadow}</Typography>
                  <Typography variant="body2">{shadowOffsets[shadow]}px offset</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </ShowcaseSection>

      <ShowcaseSection
        description="Patterns are decorative only. They never carry status, hierarchy or interaction meaning."
        eyebrow="04 · Patterns"
        title="Halftone and diagonal texture"
        wide
      >
        <Box
          sx={{
            display: 'grid',
            gap: 5,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <Box
            sx={{
              backgroundImage: patterns.halftone,
              backgroundSize: theme.spacing(3),
              border: `${borderWidths.bold}px solid ${colors.border}`,
              borderRadius: `${radii.lg}px`,
              minHeight: theme.spacing(28),
              p: 5,
            }}
          >
            <Typography sx={{ bgcolor: 'background.paper', display: 'inline', fontWeight: 900 }}>
              Halftone
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundImage: patterns.diagonal,
              border: `${borderWidths.bold}px solid ${colors.border}`,
              borderRadius: `${radii.lg}px`,
              minHeight: theme.spacing(28),
              p: 5,
            }}
          >
            <Typography sx={{ bgcolor: 'background.paper', display: 'inline', fontWeight: 900 }}>
              Diagonal
            </Typography>
          </Box>
        </Box>
      </ShowcaseSection>
    </>
  )
}
