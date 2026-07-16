import { CssBaseline, GlobalStyles } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStoredThemeMode, writeStoredThemeMode } from '../preferences/preferences'
import {
  DigitalStudioContext,
  type DigitalStudioContextValue,
} from './DigitalStudioContext'
import { createDigitalStudioTheme } from './createDigitalStudioTheme'
import type { ThemeMode } from './tokens'

function getInitialThemeMode(): ThemeMode {
  const storedMode = readStoredThemeMode()

  if (storedMode) {
    return storedMode
  }

  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

type DigitalStudioProviderProps = {
  children: ReactNode
}

export function DigitalStudioProvider({ children }: DigitalStudioProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(getInitialThemeMode)
  const theme = useMemo(() => createDigitalStudioTheme(mode), [mode])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
    writeStoredThemeMode(mode)
  }, [mode])

  const value = useMemo<DigitalStudioContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  return (
    <DigitalStudioContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '*': {
              boxSizing: 'border-box',
            },
            '*::before, *::after': {
              boxSizing: 'border-box',
            },
            'img, svg': {
              display: 'block',
              maxWidth: '100%',
            },
            'button, input, textarea, select': {
              font: 'inherit',
            },
          }}
        />
        {children}
      </ThemeProvider>
    </DigitalStudioContext.Provider>
  )
}
