import type { Language } from '../routes/routeConfig'
import type { ThemeMode } from '../theme/tokens'

const storageKeys = {
  language: 'irpw.language-preference',
  theme: 'irpw.theme-preference',
} as const

function readPreference(key: string): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writePreference(key: string, value: string) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }
}

export function readStoredThemeMode(): ThemeMode | null {
  const value = readPreference(storageKeys.theme)
  return value === 'light' || value === 'dark' ? value : null
}

export function writeStoredThemeMode(mode: ThemeMode) {
  writePreference(storageKeys.theme, mode)
}

export function readStoredLanguage(): Language | null {
  const value = readPreference(storageKeys.language)
  return value === 'it' || value === 'en' ? value : null
}

export function writeStoredLanguage(language: Language) {
  writePreference(storageKeys.language, language)
}
