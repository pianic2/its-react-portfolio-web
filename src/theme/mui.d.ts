import type { DigitalStudioThemeTokens } from './tokens'

declare module '@mui/material/styles' {
  interface Theme {
    digitalStudio: DigitalStudioThemeTokens
  }

  interface ThemeOptions {
    digitalStudio?: DigitalStudioThemeTokens
  }
}
