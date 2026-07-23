import { matchPath } from 'react-router-dom'
import { publicPageIds, supportedLanguages, type Language, type PageId } from '../content/schema'

export { supportedLanguages }
export type { Language, PageId }

type RouteDefinition = {
  indexable: boolean
  paths: Record<Language, string>
}

export const routeDefinitions: Record<PageId, RouteDefinition> = {
  home: {
    indexable: true,
    paths: { it: '', en: '' },
  },
  projects: {
    indexable: true,
    paths: { it: 'progetti', en: 'projects' },
  },
  projectDetail: {
    indexable: true,
    paths: { it: 'progetti/:slug', en: 'projects/:slug' },
  },
  skills: {
    indexable: true,
    paths: { it: 'competenze', en: 'skills' },
  },
  method: {
    indexable: true,
    paths: { it: 'metodo', en: 'method' },
  },
  profile: {
    indexable: true,
    paths: { it: 'profilo', en: 'profile' },
  },
  contact: {
    indexable: true,
    paths: { it: 'contatti', en: 'contact' },
  },
  privacy: {
    indexable: true,
    paths: { it: 'privacy', en: 'privacy' },
  },
}

export function getIndexableStaticRoutePaths() {
  return supportedLanguages.flatMap((language) =>
    publicPageIds
      .filter((page) => page !== 'projectDetail' && routeDefinitions[page].indexable)
      .map((page) => getRoutePath(page, language)),
  )
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
