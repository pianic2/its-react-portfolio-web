import { getContrastRatio } from '@mui/material/styles'
import { describe, expect, it } from 'vitest'
import { semanticColorSchemes, type ThemeMode } from './tokens'

const requiredTextPairs = [
  ['text', 'canvas'],
  ['text', 'surface'],
  ['textMuted', 'canvas'],
  ['onPrimary', 'primary'],
  ['onSecondary', 'secondary'],
  ['onAccent', 'accent'],
  ['onSuccess', 'success'],
  ['onWarning', 'warning'],
  ['onError', 'error'],
] as const

const modes: ThemeMode[] = ['light', 'dark']

describe.each(modes)('%s semantic colour scheme', (mode) => {
  it.each(requiredTextPairs)('%s remains readable on %s', (foregroundRole, backgroundRole) => {
    const colors = semanticColorSchemes[mode]
    const ratio = getContrastRatio(colors[foregroundRole], colors[backgroundRole])

    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})
