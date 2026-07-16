import DarkModeRounded from '@mui/icons-material/DarkModeRounded'
import LightModeRounded from '@mui/icons-material/LightModeRounded'
import { Button } from '@mui/material'
import type { Language } from '../../routes/routeConfig'
import { useDigitalStudioTheme } from '../../theme'

const copy: Record<
  Language,
  {
    dark: string
    darkAction: string
    darkFull: string
    light: string
    lightAction: string
    lightFull: string
  }
> = {
  it: {
    dark: 'Scuro',
    darkAction: 'Attiva il tema scuro',
    darkFull: 'Tema scuro',
    light: 'Chiaro',
    lightAction: 'Attiva il tema chiaro',
    lightFull: 'Tema chiaro',
  },
  en: {
    dark: 'Dark',
    darkAction: 'Activate dark theme',
    darkFull: 'Dark theme',
    light: 'Light',
    lightAction: 'Activate light theme',
    lightFull: 'Light theme',
  },
}

type ThemeToggleProps = {
  language: Language
  presentation?: 'compact' | 'full'
}

export function ThemeToggle({ language, presentation = 'compact' }: ThemeToggleProps) {
  const { mode, toggleMode } = useDigitalStudioTheme()
  const currentIsDark = mode === 'dark'
  const labels = copy[language]
  const visibleLabel = currentIsDark
    ? presentation === 'compact'
      ? labels.dark
      : labels.darkFull
    : presentation === 'compact'
      ? labels.light
      : labels.lightFull
  const actionLabel = currentIsDark ? labels.lightAction : labels.darkAction

  return (
    <Button
      aria-label={actionLabel}
      aria-pressed={currentIsDark}
      onClick={toggleMode}
      startIcon={currentIsDark ? <DarkModeRounded /> : <LightModeRounded />}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', whiteSpace: 'nowrap' }}
      variant="outlined"
    >
      {visibleLabel}
    </Button>
  )
}
