import { matchPath } from 'react-router-dom'
import { publicPageIds, supportedLanguages, type Language, type PageId } from '../content/schema'

export { supportedLanguages }
export type { Language, PageId }

type RouteDefinition = {
  paths: Record<Language, string>
}

export const routeDefinitions: Record<PageId, RouteDefinition> = {
  home: {
    paths: { it: '', en: '' },
  },
  projects: {
    paths: { it: 'progetti', en: 'projects' },
  },
  projectDetail: {
    paths: { it: 'progetti/:slug', en: 'projects/:slug' },
  },
  skills: {
    paths: { it: 'competenze', en: 'skills' },
  },
  method: {
    paths: { it: 'metodo', en: 'method' },
  },
  profile: {
    paths: { it: 'profilo', en: 'profile' },
  },
  contact: {
    paths: { it: 'contatti', en: 'contact' },
  },
  privacy: {
    paths: { it: 'privacy', en: 'privacy' },
  },
}

export const mainNavigationPages: PageId[] = [
  'home',
  'projects',
  'skills',
  'method',
  'profile',
  'contact',
]

export function isLanguage(value: string | undefined): value is Language {
  return supportedLanguages.some((language) => language === value)
}

export function getRoutePath(page: PageId, language: Language, params: { slug?: string } = {}) {
  const relativePath = routeDefinitions[page].paths[language].replace(
    ':slug',
    encodeURIComponent(params.slug ?? ''),
  )

  return relativePath ? `/${language}/${relativePath}` : `/${language}`
}

export function resolveLocalizedRoute(pathname: string) {
  for (const language of supportedLanguages) {
    for (const page of publicPageIds) {
      const relativePath = routeDefinitions[page].paths[language]
      const pattern = relativePath ? `/${language}/${relativePath}` : `/${language}`
      const match = matchPath({ path: pattern, end: true }, pathname)

      if (match) {
        return { language, page, slug: match.params.slug }
      }
    }
  }

  return null
}
