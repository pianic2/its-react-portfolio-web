import { getRoutePath } from '../routes/routeConfig'
import { buildProjectViewModel } from './viewModels'
import { validateContentRepository } from './validation'
import type { Language, PageId, SiteContent } from './schema'

const repository = validateContentRepository()

const utilityPageLabels: Record<Language, Partial<Record<PageId, string>>> = {
  it: { privacy: 'Privacy' },
  en: { privacy: 'Privacy' },
}

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
      : cta.kind === 'external'
        ? { ...cta, href: cta.url }
        : cta

  return {
    ...portfolio,
    primaryCta: resolveCta(portfolio.primaryCta),
    secondaryCta: resolveCta(portfolio.secondaryCta),
    contactCta: resolveCta(portfolio.contactCta),
  }
}

function resolvePageCta(language: Language, cta: SiteContent['skillsPage']['hero']['primaryCta']) {
  return cta.kind === 'internal'
    ? { ...cta, href: getRoutePath(cta.page, language) }
    : cta.kind === 'external'
      ? { ...cta, href: cta.url }
      : cta
}

function getPublicEvidence(language: Language) {
  const sharedEvidence = new Map(repository.publicEvidence.map((item) => [item.id, item]))
  const evidence = new Map(
    getSiteContent(language).publicEvidence.map((item) => [item.evidenceId, item]),
  )
  return new Map(
    [...evidence].map(([evidenceId, localized]) => {
      const shared = sharedEvidence.get(evidenceId)
      if (!shared?.url) {
        throw new Error(`Public evidence "${evidenceId}" has no external URL.`)
      }
      return [evidenceId, { ...shared, ...localized, url: shared.url }] as const
    }),
  )
}

export function getSkillsPage(language: Language) {
  const page = getSiteContent(language).skillsPage
  const evidence = getPublicEvidence(language)
  return {
    ...page,
    hero: {
      ...page.hero,
      primaryCta: resolvePageCta(language, page.hero.primaryCta),
      secondaryCta: resolvePageCta(language, page.hero.secondaryCta),
    },
    groups: page.groups.map((group) => ({
      ...group,
      evidence: group.evidenceIds.map((evidenceId) => evidence.get(evidenceId)),
      cta: resolvePageCta(language, group.cta),
    })),
    closing: {
      ...page.closing,
      primaryCta: resolvePageCta(language, page.closing.primaryCta),
      secondaryCta: resolvePageCta(language, page.closing.secondaryCta),
    },
  }
}

export function getMethodPage(language: Language) {
  const page = getSiteContent(language).methodPage
  const evidence = getPublicEvidence(language)
  return {
    ...page,
    hero: {
      ...page.hero,
      primaryCta: resolvePageCta(language, page.hero.primaryCta),
      secondaryCta: resolvePageCta(language, page.hero.secondaryCta),
    },
    examples: page.examples.map((example) => ({
      ...example,
      evidence: example.evidenceLinks
        .map((link) => {
          const resolved = evidence.get(link.evidenceId)
          return resolved ? { ...resolved, ...link } : undefined
        })
        .filter((item): item is NonNullable<typeof item> => item !== undefined),
      cta: resolvePageCta(language, example.cta),
    })),
    closing: {
      ...page.closing,
      primaryCta: resolvePageCta(language, page.closing.primaryCta),
      secondaryCta: resolvePageCta(language, page.closing.secondaryCta),
    },
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
  return (
    repository.locales[language].navigation.find((item) => item.page === page)?.label ??
    utilityPageLabels[language][page] ??
    page
  )
}
