import { matchPath } from 'react-router-dom'

export const supportedLanguages = ['it', 'en'] as const

export type Language = (typeof supportedLanguages)[number]

export type PageId =
  'home' | 'projects' | 'projectDetail' | 'skills' | 'method' | 'profile' | 'contact' | 'privacy'

type RouteDefinition = {
  paths: Record<Language, string>
  labels: Record<Language, string>
}

export const routeDefinitions: Record<PageId, RouteDefinition> = {
  home: {
    paths: { it: '', en: '' },
    labels: { it: 'Home', en: 'Home' },
  },
  projects: {
    paths: { it: 'progetti', en: 'projects' },
    labels: { it: 'Progetti', en: 'Projects' },
  },
  projectDetail: {
    paths: { it: 'progetti/:slug', en: 'projects/:slug' },
    labels: { it: 'Dettaglio progetto', en: 'Project detail' },
  },
  skills: {
    paths: { it: 'competenze', en: 'skills' },
    labels: { it: 'Competenze', en: 'Skills' },
  },
  method: {
    paths: { it: 'metodo', en: 'method' },
    labels: { it: 'Metodo', en: 'Method' },
  },
  profile: {
    paths: { it: 'profilo', en: 'profile' },
    labels: { it: 'Profilo', en: 'Profile' },
  },
  contact: {
    paths: { it: 'contatti', en: 'contact' },
    labels: { it: 'Contatti', en: 'Contact' },
  },
  privacy: {
    paths: { it: 'privacy', en: 'privacy' },
    labels: { it: 'Privacy', en: 'Privacy' },
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
    for (const page of Object.keys(routeDefinitions) as PageId[]) {
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
