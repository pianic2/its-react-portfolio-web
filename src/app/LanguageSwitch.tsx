import { Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { writeStoredLanguage } from '../preferences/preferences'
import { getRoutePath, resolveLocalizedRoute, type Language } from '../routes/routeConfig'

const alternativeLanguage: Record<Language, Language> = {
  it: 'en',
  en: 'it',
}

export function LanguageSwitch() {
  const { pathname } = useLocation()
  const currentRoute = resolveLocalizedRoute(pathname)

  if (!currentRoute) {
    return null
  }

  const { language, page, slug } = currentRoute
  const targetLanguage = alternativeLanguage[language]
  const label = targetLanguage === 'it' ? 'Italiano' : 'English'

  return (
    <Button
      component={Link}
      hrefLang={targetLanguage}
      lang={targetLanguage}
      onClick={() => writeStoredLanguage(targetLanguage)}
      size="small"
      to={getRoutePath(page, targetLanguage, slug ? { slug } : {})}
      variant="outlined"
    >
      {label}
    </Button>
  )
}
