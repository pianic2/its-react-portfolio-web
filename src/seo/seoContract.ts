import { getLocalizedProjectPath, getProjectBySlug, getSiteContent } from '../content/loaders'
import {
  getRoutePath,
  resolveLocalizedRoute,
  supportedLanguages,
  type Language,
} from '../routes/routeConfig'
import { githubPagesBasePath, siteOrigin } from '../routes/sitemap'

export type SeoMetadata = {
  alternates: Record<Language, string>
  canonical?: string
  description: string
  indexable: boolean
  language: Language
  title: string
}

function absolute(path: string) {
  return new URL(`${githubPagesBasePath.replace(/\/$/, '')}${path}`, siteOrigin).href
}

export function getSeoMetadata(pathname: string): SeoMetadata {
  const resolved = resolveLocalizedRoute(pathname)
  const language = resolved?.language ?? 'it'
  const content = getSiteContent(language)
  if (
    !resolved ||
    !resolved.page ||
    (resolved.page === 'projectDetail' && !getProjectBySlug(language, resolved.slug))
  ) {
    return {
      alternates: { it: absolute('/it'), en: absolute('/en') },
      description: content.portfolio.metadata.description,
      indexable: false,
      language,
      title: content.portfolio.metadata.title,
    }
  }
  const project =
    resolved.page === 'projectDetail' ? getProjectBySlug(language, resolved.slug) : null
  const title =
    project?.metadata.title ??
    (resolved.page === 'home'
      ? content.portfolio.metadata.title
      : `${content.navigation.find((item) => item.page === resolved.page)?.label ?? resolved.page} | ${content.identity.name}`)
  const description = project?.metadata.description ?? content.portfolio.metadata.description
  const alternates = Object.fromEntries(
    supportedLanguages.map((locale) => {
    const localizedPath = project ? getLocalizedProjectPath(project.id, locale) : null
    return [
      locale,
      absolute(
        localizedPath ?? getRoutePath(resolved.page, locale),
      ),
      ]
    }),
  ) as Record<Language, string>
  return {
    alternates,
    canonical: absolute(
      getRoutePath(resolved.page, language, project ? { slug: project.slug } : {}),
    ),
    description,
    indexable: true,
    language,
    title,
  }
}
