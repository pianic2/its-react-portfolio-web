import CheckRounded from '@mui/icons-material/CheckRounded'
import { Box, Button, Stack } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { writeStoredLanguage } from '../../preferences/preferences'
import {
  getRoutePath,
  resolveLocalizedRoute,
  supportedLanguages,
  type Language,
} from '../../routes/routeConfig'

const languageNames: Record<Language, string> = {
  it: 'Italiano',
  en: 'English',
}

const navigationLabels: Record<Language, string> = {
  it: 'Selezione lingua',
  en: 'Language selection',
}

const currentLabels: Record<Language, string> = {
  it: 'lingua corrente',
  en: 'current language',
}

type LanguageSwitchProps = {
  presentation?: 'compact' | 'full'
}

export function LanguageSwitch({ presentation = 'compact' }: LanguageSwitchProps) {
  const { pathname } = useLocation()
  const currentRoute = resolveLocalizedRoute(pathname)

  if (!currentRoute) {
    return null
  }

  const { language, page, slug } = currentRoute

  return (
    <Box aria-label={navigationLabels[language]} component="nav">
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
        {supportedLanguages.map((targetLanguage) => {
          const current = targetLanguage === language
          const name = languageNames[targetLanguage]
          const label = presentation === 'compact' ? targetLanguage.toUpperCase() : name

          return (
            <Button
              aria-current={current ? 'page' : undefined}
              aria-label={current ? `${name}, ${currentLabels[language]}` : name}
              component={Link}
              hrefLang={targetLanguage}
              key={targetLanguage}
              lang={targetLanguage}
              onClick={() => writeStoredLanguage(targetLanguage)}
              size="small"
              startIcon={current ? <CheckRounded /> : undefined}
              sx={{
                bgcolor: current ? 'primary.main' : 'background.paper',
                color: current ? 'primary.contrastText' : 'text.primary',
                whiteSpace: 'nowrap',
              }}
              to={getRoutePath(page, targetLanguage, slug ? { slug } : {})}
              variant={current ? 'contained' : 'text'}
            >
              {label}
            </Button>
          )
        })}
      </Stack>
    </Box>
  )
}
