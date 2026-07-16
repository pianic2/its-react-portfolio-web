import { getRoutePath, type Language, type PageId } from '../routes/routeConfig'
import { validateContentRepository } from './validation'

const repository = validateContentRepository()

export function getSiteContent(language: Language) {
  return repository.locales[language]
}

export function getProjectById(language: Language, projectId: string) {
  const localized = repository.locales[language].projects.find((project) => project.projectId === projectId)
  const core = repository.projects.find((project) => project.id === projectId)
  if (!localized || !core) return null
  return { ...core, ...localized }
}

export function getProjectBySlug(language: Language, slug: string | undefined) {
  if (!slug) return null
  const localized = repository.locales[language].projects.find((project) => project.slug === slug)
  return localized ? getProjectById(language, localized.projectId) : null
}

export function getAllProjects(language: Language) {
  return repository.projects
    .map((project) => getProjectById(language, project.id))
    .filter((project): project is NonNullable<typeof project> => project !== null)
    .sort((left, right) => left.order - right.order)
}

export function getLocalizedProjectPath(projectId: string, language: Language) {
  const project = getProjectById(language, projectId)
  return project ? getRoutePath('projectDetail', language, { slug: project.slug }) : null
}

export function getNavigation(language: Language) {
  return repository.locales[language].navigation.map((item) => ({
    ...item,
    href: getRoutePath(item.page, language),
  }))
}

export function getPageLabel(language: Language, page: PageId) {
  return repository.locales[language].navigation.find((item) => item.page === page)?.label ?? page
}
