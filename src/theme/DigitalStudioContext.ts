import { createContext, useContext } from 'react'
import type { ThemeMode } from './tokens'

export type DigitalStudioContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

export const DigitalStudioContext = createContext<DigitalStudioContextValue | null>(null)

export function useDigitalStudioTheme() {
  const context = useContext(DigitalStudioContext)

  if (!context) {
    throw new Error('useDigitalStudioTheme must be used within DigitalStudioProvider')
  }

  return context
}
