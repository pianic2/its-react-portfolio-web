import { getRoutePath } from '../routes/routeConfig'
import { buildProjectViewModel } from './viewModels'
import { validateContentRepository } from './validation'
import type { Language, PageId } from './schema'

const repository = validateContentRepository()

function loadProject(language: Language, projectId: string) {
  const project = buildProjectViewModel(repository, language, projectId)
  if (!project) return null

  const primaryClaim = project.claims.at(0)
  if (!primaryClaim) {
    throw new Error(`Validated project "${projectId}" has no claim for locale "${language}".`)
  }
  const repositoryLink = project.links.find((link) => link.kind === 'repository')
  if (!repositoryLink) {
    throw new Error(
      `Validated project "${projectId}" has no repository link for locale "${language}".`,
    )
  }

  return {
    ...project,
    detailPath: getRoutePath('projectDetail', language, { slug: project.slug }),
    path: getRoutePath('projectDetail', language, { slug: project.slug }),
    repositoryUrl: repositoryLink.url,
    claimStatus: primaryClaim.status,
    claimLabel: primaryClaim.statusLabel,
  }
}

export function getSiteContent(language: Language) {
  return repository.locales[language]
}

export function getPortfolio(language: Language) {
  const portfolio = repository.locales[language].portfolio
  const resolveCta = (cta: typeof portfolio.primaryCta) =>
    cta.kind === 'internal'
      ? { ...cta, href: getRoutePath(cta.page, language) }
      : { ...cta, href: cta.url }

  return {
    ...portfolio,
    primaryCta: resolveCta(portfolio.primaryCta),
    secondaryCta: resolveCta(portfolio.secondaryCta),
    contactCta: resolveCta(portfolio.contactCta),
  }
}

export function getProjectById(language: Language, projectId: string) {
  return loadProject(language, projectId)
}

export function getProjectBySlug(language: Language, slug: string | undefined) {
  if (!slug) return null
  const localized = repository.locales[language].projects.find((project) => project.slug === slug)
  return localized ? loadProject(language, localized.projectId) : null
}

export function getAllProjects(language: Language) {
  return repository.projects
    .map((project) => loadProject(language, project.id))
    .filter((project): project is NonNullable<typeof project> => project !== null)
    .sort((left, right) => left.order - right.order)
}

export function getFeaturedProjects(language: Language) {
  return getAllProjects(language).filter((project) => project.featured)
}

export function getLocalizedProjectPath(projectId: string, language: Language) {
  return loadProject(language, projectId)?.detailPath ?? null
}

export type ProjectViewModel = NonNullable<ReturnType<typeof loadProject>>

export function getNavigation(language: Language) {
  return repository.locales[language].navigation.map((item) => ({
    ...item,
    href: getRoutePath(item.page, language),
  }))
}

export function getPageLabel(language: Language, page: PageId) {
  return repository.locales[language].navigation.find((item) => item.page === page)?.label ?? page
}
