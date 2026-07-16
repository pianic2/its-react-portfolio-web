import { createTheme, enhanceHighContrast } from '@mui/material/styles'
import { createDigitalStudioTokens, type ThemeMode } from './tokens'

export function createDigitalStudioTheme(mode: ThemeMode) {
  const digitalStudio = createDigitalStudioTokens(mode)
  const { colors, focus, motion, radii, shadows } = digitalStudio
  const focusShadow = `0 0 0 ${focus.outerWidth}px ${colors.focusOuter}, ${shadows.medium}`

  const theme = createTheme({
    cssVariables: true,
    digitalStudio,
    spacing: digitalStudio.spacing.base,
    shape: {
      borderRadius: radii.md,
    },
    palette: {
      mode,
      background: {
        default: colors.canvas,
        paper: colors.surface,
      },
      text: {
        primary: colors.text,
        secondary: colors.textMuted,
      },
      divider: colors.border,
      primary: {
        main: colors.primary,
        contrastText: colors.onPrimary,
      },
      secondary: {
        main: colors.secondary,
        contrastText: colors.onSecondary,
      },
      success: {
        main: colors.success,
        contrastText: colors.onSuccess,
      },
      warning: {
        main: colors.warning,
        contrastText: colors.onWarning,
      },
      error: {
        main: colors.error,
        contrastText: colors.onError,
      },
      info: {
        main: colors.accent,
        contrastText: colors.onAccent,
      },
    },
    typography: {
      fontFamily:
        '"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontFamily: '"Archivo Black", "Arial Black", sans-serif',
        fontSize: 'clamp(3rem, 8vw, 7.5rem)',
        fontWeight: 900,
        letterSpacing: '-0.055em',
        lineHeight: 0.92,
      },
      h2: {
        fontFamily: '"Archivo Black", "Arial Black", sans-serif',
        fontSize: 'clamp(2.2rem, 5vw, 4.75rem)',
        fontWeight: 900,
        letterSpacing: '-0.045em',
        lineHeight: 0.98,
      },
      h3: {
        fontFamily: '"Archivo Black", "Arial Black", sans-serif',
        fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
        fontWeight: 900,
        letterSpacing: '-0.035em',
        lineHeight: 1.02,
      },
      h4: {
        fontFamily: '"Archivo Black", "Arial Black", sans-serif',
        fontWeight: 900,
        letterSpacing: '-0.025em',
        lineHeight: 1.08,
      },
      h5: {
        fontWeight: 850,
        lineHeight: 1.15,
      },
      h6: {
        fontWeight: 850,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.65,
      },
      body2: {
        fontSize: '0.925rem',
        lineHeight: 1.55,
      },
      button: {
        fontWeight: 900,
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
      },
      overline: {
        fontWeight: 900,
        letterSpacing: '0.14em',
        lineHeight: 1.5,
      },
    },
    transitions: {
      duration: {
        shortest: motion.duration.fast,
        shorter: motion.duration.fast,
        short: motion.duration.standard,
        standard: motion.duration.standard,
        complex: motion.duration.slow,
        enteringScreen: motion.duration.standard,
        leavingScreen: motion.duration.fast,
      },
      easing: {
        easeInOut: motion.easing.standard,
        easeOut: motion.easing.enter,
        easeIn: motion.easing.exit,
        sharp: motion.easing.emphasized,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            minWidth: 320,
            scrollBehavior: 'smooth',
          },
          body: {
            minWidth: 320,
            minHeight: '100vh',
            margin: 0,
          },
          '::selection': {
            backgroundColor: colors.warning,
            color: colors.onWarning,
          },
          '@media (prefers-reduced-motion: reduce)': {
            html: {
              scrollBehavior: 'auto',
            },
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              scrollBehavior: 'auto !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            border: `${digitalStudio.borderWidths.bold}px solid ${colors.border}`,
            borderRadius: radii.md,
            boxShadow: shadows.medium,
            minHeight: 48,
            paddingInline: 20,
            transition: `transform ${motion.duration.fast}ms ${motion.easing.standard}, box-shadow ${motion.duration.fast}ms ${motion.easing.standard}`,
            '&:hover': {
              boxShadow: shadows.large,
              transform: 'translate(-2px, -2px)',
            },
            '&:active': {
              boxShadow: shadows.small,
              transform: 'translate(2px, 2px)',
            },
            '&:focus-visible': {
              boxShadow: focusShadow,
              outline: `${focus.width}px solid ${colors.focusInner}`,
              outlineOffset: focus.offset,
            },
            '&.Mui-disabled': {
              borderColor: colors.border,
              boxShadow: 'none',
              opacity: 0.58,
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover, &:active': {
                transform: 'none',
              },
            },
          },
          outlined: {
            backgroundColor: colors.surface,
          },
          text: {
            borderColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              borderColor: colors.border,
              boxShadow: shadows.small,
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `${digitalStudio.borderWidths.bold}px solid ${colors.border}`,
            borderRadius: radii.lg,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: shadows.medium,
            overflow: 'visible',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            border: `${digitalStudio.borderWidths.regular}px solid ${colors.border}`,
            borderRadius: radii.pill,
            fontWeight: 850,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: colors.textMuted,
            maxWidth: 'calc(100% - 32px)',
            '&.Mui-focused': {
              color: colors.text,
            },
            '&.Mui-error': {
              color: colors.error,
            },
            '&.Mui-disabled': {
              opacity: 0.58,
            },
          },
          outlined: {
            '&.MuiInputLabel-shrink': {
              backgroundColor: colors.surface,
              borderRadius: radii.xs,
              boxShadow: `0 0 0 ${focus.outerWidth}px ${colors.surface}`,
              paddingInline: digitalStudio.spacing.base,
              zIndex: 1,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
            borderRadius: radii.md,
            overflow: 'visible',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border,
              borderWidth: digitalStudio.borderWidths.regular,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border,
              borderWidth: digitalStudio.borderWidths.bold,
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 ${focus.outerWidth}px ${colors.focusOuter}`,
              outline: `${focus.width}px solid ${colors.focusInner}`,
              outlineOffset: focus.offset,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border,
              borderWidth: digitalStudio.borderWidths.bold,
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginInline: digitalStudio.spacing.base * 4,
            marginTop: digitalStudio.spacing.base * 2,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: 800,
            textDecorationThickness: 2,
            textUnderlineOffset: 4,
            '&:focus-visible': {
              borderRadius: radii.xs,
              outline: `${focus.width}px solid ${colors.focusInner}`,
              outlineOffset: focus.offset,
            },
          },
        },
      },
    },
  })

  return enhanceHighContrast(theme)
}
