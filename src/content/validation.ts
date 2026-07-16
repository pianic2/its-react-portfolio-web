import { ZodError } from 'zod'
import { rawContentRepository } from './data'
import {
  contentRepositorySchema,
  supportedLanguages,
  type ContentRepository,
  type Language,
  type PageId,
} from './schema'

export class ContentValidationError extends Error {
  readonly problems: string[]

  constructor(problems: string[]) {
    super(`Content validation failed:\n${problems.map((problem) => `- ${problem}`).join('\n')}`)
    this.name = 'ContentValidationError'
    this.problems = problems
  }
}

function issueContext(input: unknown, path: PropertyKey[]) {
  if (typeof input !== 'object' || input === null) return ''

  const repository = input as Partial<ContentRepository>
  if (path[0] === 'projects' && typeof path[1] === 'number') {
    const id = repository.projects?.[path[1]]?.id ?? 'unknown'
    return `entity=project id=${id} `
  }
  if (path[0] === 'locales' && typeof path[1] === 'string') {
    const locale = path[1]
    if (path[2] === 'projects' && typeof path[3] === 'number') {
      const project = repository.locales?.[locale as Language]?.projects[path[3]]
      return `locale=${locale} entity=project id=${project?.projectId ?? 'unknown'} `
    }
    return `locale=${locale} entity=site `
  }
  return 'entity=repository '
}

function formatZodError(error: ZodError, input: unknown) {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : 'repository'
    return `${issueContext(input, issue.path)}path=${path}: ${issue.message}`
  })
}

function duplicates(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))]
}

function sorted(values: string[]) {
  return [...values].sort().join('|')
}

function addDuplicates(problems: string[], values: string[], context: string, entity: string) {
  for (const duplicate of duplicates(values)) {
    problems.push(`${context} path=${entity}: duplicate id "${duplicate}"`)
  }
}

export function validateContentRepository(
  input: unknown = rawContentRepository,
): ContentRepository {
  const parsed = contentRepositorySchema.safeParse(input)
  if (!parsed.success) {
    throw new ContentValidationError(formatZodError(parsed.error, input))
  }

  const repository = parsed.data
  const problems: string[] = []
  const coreIds = repository.projects.map((project) => project.id)
  const coreIdSet = new Set(coreIds)
  const capabilityIds = repository.capabilities.map((capability) => capability.id)
  const capabilityIdSet = new Set(capabilityIds)
  const assetIds = repository.assets.map((asset) => asset.id)
  const assetIdSet = new Set(assetIds)

  addDuplicates(problems, coreIds, 'entity=repository', 'projects')
  addDuplicates(problems, capabilityIds, 'entity=repository', 'capabilities')
  addDuplicates(problems, assetIds, 'entity=repository', 'assets')

  const personalProjects = repository.projects.filter(
    (project) => project.origin === 'personal-long-term',
  )
  const trainingProjects = repository.projects.filter(
    (project) => project.origin === 'its-training',
  )
  if (personalProjects.length !== 1) {
    problems.push(
      `entity=repository path=projects.origin: expected exactly one personal-long-term project, received ${personalProjects.length}`,
    )
  }
  if (trainingProjects.length !== 2) {
    problems.push(
      `entity=repository path=projects.origin: expected exactly two its-training projects, received ${trainingProjects.length}`,
    )
  }
  const expectedOrigins = new Map([
    ['homeedge-ai-platform', 'personal-long-term'],
    ['its-library-api-laravel', 'its-training'],
    ['node-list-manager', 'its-training'],
  ])
  for (const [projectId, expectedOrigin] of expectedOrigins) {
    const actualOrigin = repository.projects.find((project) => project.id === projectId)?.origin
    if (actualOrigin !== expectedOrigin) {
      problems.push(
        `entity=project id=${projectId} path=origin: expected "${expectedOrigin}", received "${actualOrigin ?? 'missing'}"`,
      )
    }
  }

  for (const project of repository.projects) {
    const context = `entity=project id=${project.id}`
    addDuplicates(
      problems,
      project.evidence.map((evidence) => evidence.id),
      context,
      'evidence',
    )
    addDuplicates(
      problems,
      project.links.map((link) => link.id),
      context,
      'links',
    )

    for (const capabilityId of project.capabilityIds) {
      if (!capabilityIdSet.has(capabilityId)) {
        problems.push(`${context} path=capabilityIds: unknown capability id "${capabilityId}"`)
      }
    }
    for (const assetId of project.assetIds) {
      if (!assetIdSet.has(assetId)) {
        problems.push(`${context} path=assetIds: unknown asset id "${assetId}"`)
      }
    }
    for (const evidence of project.evidence) {
      if (evidence.assetId && !assetIdSet.has(evidence.assetId)) {
        problems.push(
          `${context} path=evidence.${evidence.id}.assetId: unknown asset id "${evidence.assetId}"`,
        )
      }
    }
  }

  for (const language of supportedLanguages) {
    const locale = repository.locales[language]
    const localeContext = `locale=${language}`
    const projectIds = locale.projects.map((project) => project.projectId)
    const slugs = locale.projects.map((project) => project.slug)
    const localizedCapabilityIds = locale.capabilities.map((capability) => capability.capabilityId)
    const navigationPages = locale.navigation.map((item) => item.page)

    if (locale.locale !== language) {
      problems.push(`${localeContext} entity=site path=locale: expected "${language}"`)
    }
    addDuplicates(problems, projectIds, `${localeContext} entity=site`, 'projects')
    for (const duplicate of duplicates(slugs)) {
      problems.push(
        `${localeContext} entity=site path=projects.slug: duplicate slug "${duplicate}"`,
      )
    }
    addDuplicates(problems, localizedCapabilityIds, `${localeContext} entity=site`, 'capabilities')
    addDuplicates(problems, navigationPages, `${localeContext} entity=site`, 'navigation')

    if (sorted(projectIds) !== sorted(coreIds)) {
      problems.push(
        `${localeContext} entity=site path=projects: project set does not match shared records`,
      )
    }
    if (sorted(localizedCapabilityIds) !== sorted(capabilityIds)) {
      problems.push(
        `${localeContext} entity=site path=capabilities: capability set does not match shared records`,
      )
    }

    for (const localized of locale.projects) {
      const core = repository.projects.find((project) => project.id === localized.projectId)
      const context = `${localeContext} entity=project id=${localized.projectId}`
      if (!coreIdSet.has(localized.projectId) || !core) {
        problems.push(`${context} path=projectId: missing shared project record`)
        continue
      }

      const evidenceIds = new Set(core.evidence.map((evidence) => evidence.id))
      const linkIds = new Set(core.links.map((link) => link.id))
      addDuplicates(
        problems,
        localized.claims.map((claim) => claim.id),
        context,
        'claims',
      )
      addDuplicates(
        problems,
        localized.evidence.map((evidence) => evidence.evidenceId),
        context,
        'evidence',
      )
      addDuplicates(
        problems,
        localized.links.map((link) => link.linkId),
        context,
        'links',
      )
      addDuplicates(
        problems,
        localized.assets.map((asset) => asset.assetId),
        context,
        'assets',
      )

      for (const claim of localized.claims) {
        for (const evidenceId of claim.evidenceIds) {
          if (!evidenceIds.has(evidenceId)) {
            problems.push(
              `${context} path=claims.${claim.id}.evidenceIds: unknown evidence id "${evidenceId}"`,
            )
          }
        }
      }
      if (
        sorted(localized.evidence.map((evidence) => evidence.evidenceId)) !==
        sorted([...evidenceIds])
      ) {
        problems.push(
          `${context} path=evidence: localized evidence set does not match shared evidence`,
        )
      }
      if (sorted(localized.links.map((link) => link.linkId)) !== sorted([...linkIds])) {
        problems.push(`${context} path=links: localized link set does not match shared links`)
      }
      if (sorted(localized.assets.map((asset) => asset.assetId)) !== sorted(core.assetIds)) {
        problems.push(
          `${context} path=assets: localized asset set does not match shared asset references`,
        )
      }
    }
  }

  const italian = repository.locales.it
  const english = repository.locales.en
  const parallelCollections = [
    ['homePage.learning.items', italian.homePage.learning.items, english.homePage.learning.items],
    ['homePage.skills.groups', italian.homePage.skills.groups, english.homePage.skills.groups],
    ['homePage.process.steps', italian.homePage.process.steps, english.homePage.process.steps],
    [
      'projectsPage.comparison.projects',
      italian.projectsPage.comparison.projects,
      english.projectsPage.comparison.projects,
    ],
  ] as const

  for (const [path, italianItems, englishItems] of parallelCollections) {
    const italianIds = italianItems.map((item) => ('projectId' in item ? item.projectId : item.id))
    const englishIds = englishItems.map((item) => ('projectId' in item ? item.projectId : item.id))
    addDuplicates(problems, italianIds, 'locale=it entity=site', path)
    addDuplicates(problems, englishIds, 'locale=en entity=site', path)
    if (sorted(italianIds) !== sorted(englishIds)) {
      problems.push(`entity=repository path=locales.${path}: Italian and English item sets differ`)
    }
  }

  if (
    italian.homePage.hero.description.url !== 'https://www.itsprodigi.it/' ||
    english.homePage.hero.description.url !== 'https://www.itsprodigi.it/'
  ) {
    problems.push(
      'entity=repository path=locales.homePage.hero.description.url: expected the official HTTPS ITS Prodigi URL',
    )
  }
  if (
    sorted(italian.navigation.map((item) => item.page)) !==
    sorted(english.navigation.map((item) => item.page))
  ) {
    problems.push(
      'entity=repository path=locales.navigation: Italian and English navigation sets differ',
    )
  }

  for (const projectId of coreIds) {
    const it = italian.projects.find((project) => project.projectId === projectId)
    const en = english.projects.find((project) => project.projectId === projectId)
    if (!it || !en) continue
    const context = `entity=project id=${projectId}`
    if (sorted(Object.keys(it.narrative)) !== sorted(Object.keys(en.narrative))) {
      problems.push(
        `${context} path=locales.narrative: Italian and English narrative fields differ`,
      )
    }
    if (Boolean(it.originDescription) !== Boolean(en.originDescription)) {
      problems.push(
        `${context} path=locales.originDescription: Italian and English origin descriptions differ`,
      )
    }
    const itEvidence = it.evidence.map(
      (evidence) => `${evidence.evidenceId}:${Boolean(evidence.linkLabel)}`,
    )
    const enEvidence = en.evidence.map(
      (evidence) => `${evidence.evidenceId}:${Boolean(evidence.linkLabel)}`,
    )
    if (sorted(itEvidence) !== sorted(enEvidence)) {
      problems.push(
        `${context} path=locales.evidence: Italian and English evidence link contracts differ`,
      )
    }
    const itClaims = it.claims.map(
      (claim) => `${claim.id}:${claim.status}:${sorted(claim.evidenceIds)}`,
    )
    const enClaims = en.claims.map(
      (claim) => `${claim.id}:${claim.status}:${sorted(claim.evidenceIds)}`,
    )
    if (sorted(itClaims) !== sorted(enClaims)) {
      problems.push(`${context} path=locales.claims: Italian and English claim contracts differ`)
    }
  }

  if (problems.length > 0) throw new ContentValidationError(problems)
  return repository
}

export function assertNavigationPage(page: string): asserts page is PageId {
  const pages = rawContentRepository.locales.it.navigation.map((item) => item.page)
  if (!(pages as PageId[]).includes(page as PageId)) {
    throw new ContentValidationError([`entity=navigation id=${page} path=page: unknown page`])
  }
}
