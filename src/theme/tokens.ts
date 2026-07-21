export type ThemeMode = 'light' | 'dark'

export type SemanticColors = {
  canvas: string
  surface: string
  surfaceStrong: string
  text: string
  textMuted: string
  border: string
  primary: string
  onPrimary: string
  secondary: string
  onSecondary: string
  accent: string
  onAccent: string
  success: string
  onSuccess: string
  warning: string
  onWarning: string
  error: string
  onError: string
  focusInner: string
  focusOuter: string
}

export type DigitalStudioThemeTokens = {
  colors: SemanticColors
  spacing: {
    base: number
  }
  borderWidths: {
    thin: number
    regular: number
    bold: number
    hero: number
  }
  radii: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    pill: number
  }
  shadowOffsets: {
    small: number
    medium: number
    large: number
  }
  shadows: {
    small: string
    medium: string
    large: string
  }
  patterns: {
    halftone: string
    diagonal: string
  }
  layout: {
    pageGutter: {
      compact: number
      regular: number
      wide: number
    }
    panelInset: {
      compact: number
      regular: number
      wide: number
    }
    sectionGap: {
      compact: number
      regular: number
      wide: number
    }
    shadowClearance: number
  }
  motion: {
    duration: {
      instant: number
      fast: number
      standard: number
      slow: number
    }
    easing: {
      standard: string
      enter: string
      exit: string
      emphasized: string
    }
  }
  focus: {
    width: number
    offset: number
    outerWidth: number
  }
}

const ink = '#111111'
const warmWhite = '#fff7e8'

export const semanticColorSchemes: Record<ThemeMode, SemanticColors> = {
  light: {
    canvas: warmWhite,
    surface: '#ffffff',
    surfaceStrong: '#f0e7ff',
    text: ink,
    textMuted: '#4c4458',
    border: ink,
    primary: '#5b1ae8',
    onPrimary: '#ffffff',
    secondary: '#ff4d5a',
    onSecondary: ink,
    accent: '#00b8d9',
    onAccent: ink,
    success: '#39d353',
    onSuccess: ink,
    warning: '#ffd400',
    onWarning: ink,
    error: '#d7195b',
    onError: '#ffffff',
    focusInner: ink,
    focusOuter: '#ffd400',
  },
  dark: {
    canvas: '#170b24',
    surface: '#28163d',
    surfaceStrong: '#3b205b',
    text: warmWhite,
    textMuted: '#d7c7e6',
    border: warmWhite,
    primary: '#ffd400',
    onPrimary: ink,
    secondary: '#ff5d8f',
    onSecondary: ink,
    accent: '#4ddbff',
    onAccent: ink,
    success: '#62e67b',
    onSuccess: ink,
    warning: '#ffcf4a',
    onWarning: ink,
    error: '#ff789e',
    onError: ink,
    focusInner: '#ffd400',
    focusOuter: warmWhite,
  },
}

const spacing = {
  base: 4,
} as const

const borderWidths = {
  thin: 1,
  regular: 2,
  bold: 3,
  hero: 5,
} as const

const radii = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
  pill: 999,
} as const

const shadowOffsets = {
  small: 3,
  medium: 6,
  large: 10,
} as const

const layout = {
  pageGutter: {
    compact: 16,
    regular: 24,
    wide: 32,
  },
  panelInset: {
    compact: 24,
    regular: 32,
    wide: 40,
  },
  sectionGap: {
    compact: 24,
    regular: 32,
    wide: 40,
  },
  shadowClearance: shadowOffsets.large,
} as const

const motion = {
  duration: {
    instant: 0,
    fast: 120,
    standard: 220,
    slow: 360,
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    enter: 'cubic-bezier(0, 0, 0, 1)',
    exit: 'cubic-bezier(0.3, 0, 1, 1)',
    emphasized: 'cubic-bezier(0.2, 0.8, 0.2, 1.2)',
  },
} as const

export function createDigitalStudioTokens(mode: ThemeMode): DigitalStudioThemeTokens {
  const colors = semanticColorSchemes[mode]
  const shadowColor = mode === 'light' ? colors.border : '#050208'

  return {
    colors,
    spacing,
    borderWidths,
    radii,
    shadowOffsets,
    shadows: {
      small: `${shadowOffsets.small}px ${shadowOffsets.small}px 0 ${shadowColor}`,
      medium: `${shadowOffsets.medium}px ${shadowOffsets.medium}px 0 ${shadowColor}`,
      large: `${shadowOffsets.large}px ${shadowOffsets.large}px 0 ${shadowColor}`,
    },
    patterns: {
      halftone: `radial-gradient(circle at 25% 25%, ${colors.border}20 0 1.25px, transparent 1.5px), radial-gradient(circle at 75% 75%, ${colors.border}20 0 1.25px, transparent 1.5px)`,
      diagonal: `repeating-linear-gradient(135deg, ${colors.border}20 0 1.25px, transparent 1.5px 6px)`,
    },
    layout,
    motion,
    focus: {
      width: 3,
      offset: 3,
      outerWidth: 6,
    },
  }
}
