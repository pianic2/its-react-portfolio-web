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

function validateMethodResourceUrl(problems: string[], url: string, path: string) {
  const hostname = new URL(url).hostname.replace(/^www\./, '')
  const allowedHosts = new Set([
    'agilemanifesto.org',
    'scrumguides.org',
    'atlassian.com',
    'github.com',
    'openai.com',
  ])
  if (!allowedHosts.has(hostname) || hostname === 'atlassian.net') {
    problems.push(`entity=repository path=${path}: unsupported public resource host "${hostname}"`)
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
  const publicEvidenceIds = repository.publicEvidence.map((evidence) => evidence.id)
  const publicEvidenceIdSet = new Set(publicEvidenceIds)

  addDuplicates(problems, coreIds, 'entity=repository', 'projects')
  addDuplicates(problems, capabilityIds, 'entity=repository', 'capabilities')
  addDuplicates(problems, assetIds, 'entity=repository', 'assets')
  addDuplicates(problems, publicEvidenceIds, 'entity=repository', 'publicEvidence')

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
    const localizedPublicEvidenceIds = locale.publicEvidence.map((evidence) => evidence.evidenceId)

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
    addDuplicates(
      problems,
      localizedPublicEvidenceIds,
      `${localeContext} entity=site`,
      'publicEvidence',
    )

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
    if (sorted(localizedPublicEvidenceIds) !== sorted(publicEvidenceIds)) {
      problems.push(
        `${localeContext} entity=site path=publicEvidence: localized evidence set does not match shared records`,
      )
    }

    for (const evidence of locale.publicEvidence) {
      if (!publicEvidenceIdSet.has(evidence.evidenceId)) {
        problems.push(
          `${localeContext} entity=site path=publicEvidence.${evidence.evidenceId}: unknown public evidence id`,
        )
      }
    }

    for (const group of locale.skillsPage.groups) {
      addDuplicates(
        problems,
        group.references.map((reference) => reference.id),
        `${localeContext} entity=site`,
        `skillsPage.groups.${group.id}.references`,
      )
      for (const evidenceId of group.evidenceIds) {
        if (!publicEvidenceIdSet.has(evidenceId)) {
          problems.push(
            `${localeContext} entity=site path=skillsPage.groups.${group.id}.evidenceIds: unknown public evidence id "${evidenceId}"`,
          )
        }
      }
    }
    for (const example of locale.methodPage.examples) {
      addDuplicates(
        problems,
        example.evidenceLinks.map((link) => link.evidenceId),
        `${localeContext} entity=site`,
        `methodPage.examples.${example.id}.evidenceLinks`,
      )
      for (const evidenceLink of example.evidenceLinks) {
        const evidenceId = evidenceLink.evidenceId
        if (!publicEvidenceIdSet.has(evidenceId)) {
          problems.push(
            `${localeContext} entity=site path=methodPage.examples.${example.id}.evidenceLinks: unknown public evidence id "${evidenceId}"`,
          )
        }
      }
    }

    const methodResources = [
      ...locale.methodPage.foundations.resources.map(
        (resource) => [`methodPage.foundations.resources.${resource.id}`, resource.url] as const,
      ),
      [
        `methodPage.agenticDelivery.resource.${locale.methodPage.agenticDelivery.resource.id}`,
        locale.methodPage.agenticDelivery.resource.url,
      ] as const,
    ]
    for (const [path, url] of methodResources) {
      validateMethodResourceUrl(problems, url, `${localeContext} ${path}`)
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
    ['skillsPage.groups', italian.skillsPage.groups, english.skillsPage.groups],
    ['methodPage.examples', italian.methodPage.examples, english.methodPage.examples],
    ['methodPage.principles', italian.methodPage.principles, english.methodPage.principles],
    [
      'methodPage.agenticDelivery.concepts',
      italian.methodPage.agenticDelivery.concepts,
      english.methodPage.agenticDelivery.concepts,
    ],
    ['methodPage.tools.items', italian.methodPage.tools.items, english.methodPage.tools.items],
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

  const ctaContracts = [
    ['skillsPage.hero', italian.skillsPage.hero, english.skillsPage.hero],
    ['skillsPage.closing', italian.skillsPage.closing, english.skillsPage.closing],
    ['methodPage.hero', italian.methodPage.hero, english.methodPage.hero],
    ['methodPage.closing', italian.methodPage.closing, english.methodPage.closing],
  ] as const
  for (const [path, italianBlock, englishBlock] of ctaContracts) {
    const italianCtas = [italianBlock.primaryCta, italianBlock.secondaryCta].map(
      (cta) => `${cta.kind}:${cta.analyticsId ?? 'none'}`,
    )
    const englishCtas = [englishBlock.primaryCta, englishBlock.secondaryCta].map(
      (cta) => `${cta.kind}:${cta.analyticsId ?? 'none'}`,
    )
    if (sorted(italianCtas) !== sorted(englishCtas)) {
      problems.push(
        `entity=repository path=locales.${path}: Italian and English CTA contracts differ`,
      )
    }
  }

  for (const groupId of italian.skillsPage.groups.map((group) => group.id)) {
    const italianGroup = italian.skillsPage.groups.find((group) => group.id === groupId)
    const englishGroup = english.skillsPage.groups.find((group) => group.id === groupId)
    if (!italianGroup || !englishGroup) continue
    const italianReferences = italianGroup.references.map(
      (reference) => `${reference.id}:${reference.kind}:${Boolean(reference.url)}`,
    )
    const englishReferences = englishGroup.references.map(
      (reference) => `${reference.id}:${reference.kind}:${Boolean(reference.url)}`,
    )
    if (sorted(italianReferences) !== sorted(englishReferences)) {
      problems.push(
        `entity=repository path=locales.skillsPage.groups.${groupId}.references: Italian and English reference contracts differ`,
      )
    }
  }

  if (
    italian.methodPage.agenticDelivery.workflow.length !==
    english.methodPage.agenticDelivery.workflow.length
  ) {
    problems.push(
      'entity=repository path=methodPage.agenticDelivery.workflow: Italian and English workflow lengths differ',
    )
  }

  const italianExamplesById = new Map(
    italian.methodPage.examples.map((example) => [example.id, example]),
  )
  for (const englishExample of english.methodPage.examples) {
    const italianExample = italianExamplesById.get(englishExample.id)
    if (!italianExample) continue
    if (italianExample.diagram?.kind !== englishExample.diagram?.kind) {
      problems.push(
        `entity=repository path=methodPage.examples.${englishExample.id}.diagram.kind: Italian and English diagram kinds differ`,
      )
    }
    if (italianExample.diagram?.labels.length !== englishExample.diagram?.labels.length) {
      problems.push(
        `entity=repository path=methodPage.examples.${englishExample.id}.diagram.labels: Italian and English diagram structures differ`,
      )
    }
  }

  for (const exampleId of italian.methodPage.examples.map((example) => example.id)) {
    const italianExample = italian.methodPage.examples.find((example) => example.id === exampleId)
    const englishExample = english.methodPage.examples.find((example) => example.id === exampleId)
    if (!italianExample || !englishExample) continue
    const italianEvidenceIds = italianExample.evidenceLinks.map((link) => link.evidenceId)
    const englishEvidenceIds = englishExample.evidenceLinks.map((link) => link.evidenceId)
    if (sorted(italianEvidenceIds) !== sorted(englishEvidenceIds)) {
      problems.push(
        `entity=repository path=methodPage.examples.${exampleId}.evidenceLinks: Italian and English evidence sets differ`,
      )
    }
  }

  const pageEvidenceUrls = repository.publicEvidence.map((evidence) => evidence.url)
  const competenceReferenceUrls = supportedLanguages.flatMap((language) =>
    repository.locales[language].skillsPage.groups.flatMap((group) =>
      group.references.map((reference) => reference.url),
    ),
  )
  if (
    [...pageEvidenceUrls, ...competenceReferenceUrls].some(
      (url) => url !== undefined && url.includes('atlassian.net'),
    )
  ) {
    problems.push(
      'entity=repository path=publicEvidence: Jira and Confluence URLs are not allowed in public page evidence',
    )
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
