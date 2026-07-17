import { Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { writeStoredLanguage } from '../../preferences/preferences'
import { getLocalizedProjectPath, getProjectBySlug } from '../../content/loaders'
import { getRoutePath, resolveLocalizedRoute, type Language } from '../../routes/routeConfig'
import { LanguageFlag } from './LanguageFlag'

const alternativeLanguage: Record<Language, Language> = {
  it: 'en',
  en: 'it',
}

const languageNames: Record<Language, string> = {
  it: 'Italiano',
  en: 'English',
}

const switchLabels: Record<Language, string> = {
  it: "Passa all'inglese",
  en: 'Switch to Italian',
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
  const targetLanguage = alternativeLanguage[language]
  const visibleLabel =
    presentation === 'compact' ? targetLanguage.toUpperCase() : languageNames[targetLanguage]
  const project = page === 'projectDetail' ? getProjectBySlug(language, slug) : null
  const targetPath = project
    ? getLocalizedProjectPath(project.projectId, targetLanguage)
    : getRoutePath(page, targetLanguage, slug ? { slug } : {})

  return (
    <Button
      aria-label={switchLabels[language]}
      component={Link}
      hrefLang={targetLanguage}
      lang={targetLanguage}
      onClick={() => writeStoredLanguage(targetLanguage)}
      size="small"
      startIcon={<LanguageFlag language={targetLanguage} />}
      sx={(theme) => ({
        alignSelf: presentation === 'full' ? 'stretch' : undefined,
        bgcolor: 'background.paper',
        color: 'text.primary',
        justifyContent: presentation === 'full' ? 'center' : 'flex-start',
        minWidth: presentation === 'full' ? '100%' : undefined,
        whiteSpace: 'nowrap',
        '& .MuiButton-startIcon': {
          marginInlineEnd: theme.spacing(2),
          marginInlineStart: 0,
        },
      })}
      title={switchLabels[language]}
      to={targetPath ?? getRoutePath('projects', targetLanguage)}
      variant="outlined"
    >
      {visibleLabel}
    </Button>
  )
}
