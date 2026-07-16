import { Box } from '@mui/material'
import type { Language } from '../../routes/routeConfig'

const flagColours = {
  italy: {
    green: '#009246',
    red: '#ce2b37',
    white: '#ffffff',
  },
  unitedKingdom: {
    blue: '#012169',
    red: '#c8102e',
    white: '#ffffff',
  },
} as const

type LanguageFlagProps = {
  language: Language
}

export function LanguageFlag({ language }: LanguageFlagProps) {
  return (
    <Box
      aria-hidden="true"
      component="span"
      data-testid={`language-flag-${language}`}
      sx={(theme) => ({
        border: `${theme.digitalStudio.borderWidths.regular}px solid ${theme.digitalStudio.colors.border}`,
        borderRadius: `${theme.digitalStudio.radii.xs}px`,
        display: 'inline-flex',
        flex: '0 0 auto',
        lineHeight: 0,
        overflow: 'hidden',
      })}
    >
      {language === 'it' ? (
        <svg focusable="false" height="20" viewBox="0 0 30 20" width="30">
          <rect fill={flagColours.italy.green} height="20" width="10" x="0" />
          <rect fill={flagColours.italy.white} height="20" width="10" x="10" />
          <rect fill={flagColours.italy.red} height="20" width="10" x="20" />
        </svg>
      ) : (
        <svg focusable="false" height="20" viewBox="0 0 30 20" width="30">
          <rect fill={flagColours.unitedKingdom.blue} height="20" width="30" />
          <path d="M0 0 30 20M30 0 0 20" stroke={flagColours.unitedKingdom.white} strokeWidth="5" />
          <path d="M0 0 30 20M30 0 0 20" stroke={flagColours.unitedKingdom.red} strokeWidth="2.5" />
          <path d="M15 0V20M0 10H30" stroke={flagColours.unitedKingdom.white} strokeWidth="7" />
          <path d="M15 0V20M0 10H30" stroke={flagColours.unitedKingdom.red} strokeWidth="3.5" />
        </svg>
      )}
    </Box>
  )
}
