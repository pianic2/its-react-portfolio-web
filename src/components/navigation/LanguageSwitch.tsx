import { Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { writeStoredLanguage } from '../../preferences/preferences'
import { getLocalizedProjectPath, getProjectBySlug } from '../../content/loaders'
import { getRoutePath, resolveLocalizedRoute, type Language } from '../../routes/routeConfig'
import { LanguageFlag } from './LanguageFlag'
import { usePortfolioBackend } from '../../services/backend'
import { loadBlogPost, loadTranslatedBlogPost } from '../../features/blog/blogContent'

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
  const backend = usePortfolioBackend()
  const [targetBlogPath, setTargetBlogPath] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    if (currentRoute?.page !== 'blogDetail' || !currentRoute.slug) {
      setTargetBlogPath(null)
      return () => {
        active = false
      }
    }
    const targetLanguage = alternativeLanguage[currentRoute.language]
    void loadBlogPost(backend, currentRoute.language, currentRoute.slug).then(async (post) => {
      const translated = post
        ? await loadTranslatedBlogPost(backend, targetLanguage, post.stable_id)
        : null
      if (active) {
        setTargetBlogPath(
          translated?.meta?.slug
            ? getRoutePath('blogDetail', targetLanguage, { slug: translated.meta.slug })
            : getRoutePath('blog', targetLanguage),
        )
      }
    })
    return () => {
      active = false
    }
  }, [backend, currentRoute?.language, currentRoute?.page, currentRoute?.slug])

  if (!currentRoute) {
    return null
  }

  const { language, page, slug } = currentRoute
  const targetLanguage = alternativeLanguage[language]
  const visibleLabel =
    presentation === 'compact' ? targetLanguage.toUpperCase() : languageNames[targetLanguage]
  const project = page === 'projectDetail' ? getProjectBySlug(language, slug) : null
  const targetPath =
    page === 'blogDetail'
      ? (targetBlogPath ?? getRoutePath('blog', targetLanguage))
      : project
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
