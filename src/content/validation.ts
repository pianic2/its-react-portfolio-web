import { ZodError } from 'zod'
import { rawContentRepository } from './data'
import { contentRepositorySchema, type ContentRepository } from './schema'
import type { Language, PageId } from '../routes/routeConfig'

export class ContentValidationError extends Error {
  constructor(readonly problems: string[]) {
    super(`Content validation failed:\n${problems.map((problem) => `- ${problem}`).join('\n')}`)
    this.name = 'ContentValidationError'
  }
}

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : 'repository'
    return `${path}: ${issue.message}`
  })
}

function duplicates(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))]
}

export function validateContentRepository(input: unknown = rawContentRepository): ContentRepository {
  const parsed = contentRepositorySchema.safeParse(input)
  if (!parsed.success) {
    throw new ContentValidationError(formatZodError(parsed.error))
  }

  const repository = parsed.data
  const problems: string[] = []
  const coreIds = repository.projects.map((project) => project.id)
  const coreIdSet = new Set(coreIds)
  const evidenceByProject = new Map(
    repository.projects.map((project) => [project.id, new Set(project.evidence.map((evidence) => evidence.id))]),
  )

  for (const duplicate of duplicates(coreIds)) problems.push(`projects: duplicate project id "${duplicate}"`)

  for (const language of Object.keys(repository.locales) as Language[]) {
    const locale = repository.locales[language]
    const projectIds = locale.projects.map((project) => project.projectId)
    const slugs = locale.projects.map((project) => project.slug)
    const capabilityIds = new Set(locale.capabilities.map((capability) => capability.id))
    const navigationPages = locale.navigation.map((item) => item.page)

    if (locale.locale !== language) problems.push(`locales.${language}.locale: expected "${language}"`)
    for (const duplicate of duplicates(projectIds)) problems.push(`locales.${language}.projects: duplicate project id "${duplicate}"`)
    for (const duplicate of duplicates(slugs)) problems.push(`locales.${language}.projects: duplicate slug "${duplicate}"`)
    for (const duplicate of duplicates(navigationPages)) problems.push(`locales.${language}.navigation: duplicate page "${duplicate}"`)

    for (const project of locale.projects) {
      if (!coreIdSet.has(project.projectId)) {
        problems.push(`locales.${language}.projects.${project.projectId}: missing shared project record`)
        continue
      }
      const evidenceIds = evidenceByProject.get(project.projectId) ?? new Set<string>()
      for (const evidenceId of project.claim.evidenceIds) {
        if (!evidenceIds.has(evidenceId)) {
          problems.push(`locales.${language}.projects.${project.projectId}.claim: unknown evidence id "${evidenceId}"`)
        }
      }
    }

    for (const project of repository.projects) {
      if (!projectIds.includes(project.id)) problems.push(`locales.${language}.projects: missing project "${project.id}"`)
      for (const capabilityId of project.capabilityIds) {
        if (!capabilityIds.has(capabilityId)) {
          problems.push(`locales.${language}.capabilities: missing capability "${capabilityId}" used by "${project.id}"`)
        }
      }
    }
  }

  const italianIds = repository.locales.it.projects.map((project) => project.projectId).sort()
  const englishIds = repository.locales.en.projects.map((project) => project.projectId).sort()
  if (italianIds.join('|') !== englishIds.join('|')) problems.push('locales: Italian and English project sets are not equivalent')

  const italianPages = repository.locales.it.navigation.map((item) => item.page).sort()
  const englishPages = repository.locales.en.navigation.map((item) => item.page).sort()
  if (italianPages.join('|') !== englishPages.join('|')) problems.push('locales: Italian and English navigation sets are not equivalent')

  for (const projectId of coreIds) {
    const italian = repository.locales.it.projects.find((project) => project.projectId === projectId)
    const english = repository.locales.en.projects.find((project) => project.projectId === projectId)
    if (italian && english && italian.claim.status !== english.claim.status) {
      problems.push(`locales: claim status differs for project "${projectId}"`)
    }
  }

  if (problems.length > 0) throw new ContentValidationError(problems)
  return repository
}

export function assertNavigationPage(page: string): asserts page is PageId {
  const pages = rawContentRepository.locales.it.navigation.map((item) => item.page)
  if (!pages.includes(page as PageId)) throw new ContentValidationError([`navigation: unknown page "${page}"`])
}
