import { describe, expect, it } from 'vitest'
import { rawContentRepository } from './data'
import {
  getAllProjects,
  getFeaturedProjects,
  getLocalizedProjectPath,
  getMethodPage,
  getProjectById,
  getProjectBySlug,
  getSkillsPage,
} from './loaders'
import type { ContentRepository } from './schema'
import {
  findContentStringProblems,
  validateContentRepository,
  validateStaticSeoDescriptions,
} from './validation'

function cloneRepository() {
  return structuredClone(rawContentRepository) as ContentRepository
}

describe('content repository validation', () => {
  it('accepts the canonical equivalent Italian and English dataset', () => {
    const repository = validateContentRepository()

    expect(repository.projects).toHaveLength(3)
    expect(repository.locales.it.projects.map((project) => project.projectId)).toEqual(
      repository.locales.en.projects.map((project) => project.projectId),
    )
  })

  it('keeps the complete editorial narrative contract equivalent across locales', () => {
    const repository = validateContentRepository()
    const narrativeFields = [
      'cardSummary',
      'cardValue',
      'heroSummary',
      'idea',
      'built',
      'value',
      'currentStage',
      'evidenceIntroduction',
    ]

    for (const language of ['it', 'en'] as const) {
      for (const project of repository.locales[language].projects) {
        expect(Object.keys(project.narrative)).toEqual(expect.arrayContaining(narrativeFields))
        expect(project.evidence.every((evidence) => evidence.description.length > 0)).toBe(true)
      }
    }
  })

  it('keeps Home and Projects collection contracts aligned across locales', () => {
    const repository = validateContentRepository()
    expect(repository.locales.it.homePage.learning.items).toHaveLength(6)
    expect(repository.locales.en.homePage.learning.items).toHaveLength(6)
    expect(repository.locales.it.homePage.skills.groups).toHaveLength(5)
    expect(repository.locales.en.homePage.skills.groups).toHaveLength(5)
    expect(repository.locales.it.homePage.process.steps).toHaveLength(4)
    expect(repository.locales.en.homePage.process.steps).toHaveLength(4)
    expect(repository.locales.it.projectsPage.comparison.projects).toHaveLength(3)
    expect(repository.locales.en.projectsPage.comparison.projects).toHaveLength(3)
  })

  it('keeps supporting-page evidence curated and competence references explicit', () => {
    for (const language of ['it', 'en'] as const) {
      const skills = getSkillsPage(language)
      const method = getMethodPage(language)

      expect(skills.groups).toHaveLength(4)
      expect(skills.groups.every((group) => group.evidence.length <= 2)).toBe(true)
      expect(skills.groups.every((group) => group.references.length <= 2)).toBe(true)
      expect(method.foundations.resources).toHaveLength(2)
      expect(method.tools.items).toHaveLength(3)
      expect(method.principles).toHaveLength(5)
      expect(method.value.items).toHaveLength(6)
      expect(method.agenticDelivery.concepts).toHaveLength(7)
      expect(method.agenticDelivery.workflow).toHaveLength(5)
      expect(method.agenticDelivery.workflowDescriptions).toHaveLength(5)
      expect(method.agenticDelivery.workflow).toEqual(
        language === 'it'
          ? ['INTENTO', 'CONTESTO', 'DELEGA', 'VERIFICA', 'INTEGRAZIONE']
          : ['INTENT', 'CONTEXT', 'DELEGATION', 'VERIFICATION', 'INTEGRATION'],
      )
      expect(method.examples).toHaveLength(3)
      expect(method.examples.every((example) => example.evidence.length <= 2)).toBe(true)
    }
  })

  it('requires explicit editorial fields for every localized project', () => {
    const repository = validateContentRepository()
    for (const language of ['it', 'en'] as const) {
      for (const project of repository.locales[language].projects) {
        expect(project.question).not.toHaveLength(0)
        expect(project.supportingText).not.toHaveLength(0)
        expect(project.whatIWorkedOn).not.toHaveLength(0)
        expect(project.futureImprovement).not.toHaveLength(0)
      }
    }
  })

  it('rejects duplicate page-content ids', () => {
    const repository = cloneRepository()
    repository.locales.en.homePage.learning.items[1]!.id =
      repository.locales.en.homePage.learning.items[0]!.id
    expect(() => validateContentRepository(repository)).toThrow(/duplicate id "frontend"/)
  })

  it('enforces one personal project and two ITS training projects by stable id', () => {
    const projects = validateContentRepository().projects

    expect(projects.filter((project) => project.origin === 'personal-long-term')).toHaveLength(1)
    expect(projects.filter((project) => project.origin === 'its-training')).toHaveLength(2)
    expect(projects.find((project) => project.id === 'homeedge-ai-platform')?.origin).toBe(
      'personal-long-term',
    )
    expect(projects.find((project) => project.id === 'its-library-api-laravel')?.origin).toBe(
      'its-training',
    )
    expect(projects.find((project) => project.id === 'node-list-manager')?.origin).toBe(
      'its-training',
    )
  })

  it('rejects an invalid project-origin distribution', () => {
    const repository = cloneRepository()
    repository.projects[0]!.origin = 'its-training'

    expect(() => validateContentRepository(repository)).toThrow(
      /expected exactly one personal-long-term project/,
    )
  })

  it('validates HomeEdge transparency evidence and localized link labels', () => {
    const repository = validateContentRepository()
    const shared = repository.projects.find((project) => project.id === 'homeedge-ai-platform')!
    const english = repository.locales.en.projects.find(
      (project) => project.projectId === 'homeedge-ai-platform',
    )!
    const italian = repository.locales.it.projects.find(
      (project) => project.projectId === 'homeedge-ai-platform',
    )!

    expect(
      shared.evidence.find((evidence) => evidence.id === 'homeedge-product-vision'),
    ).toMatchObject({
      type: 'documentation',
      url: 'https://github.com/pianic2/homeedge-ai-platform/blob/main/docs/product/product-vision.md',
    })
    expect(
      shared.evidence.find((evidence) => evidence.id === 'homeedge-stakeholder-review'),
    ).toMatchObject({
      type: 'report',
      url: 'https://niccolopiazzi01.atlassian.net/wiki/spaces/IEHAP/overview',
    })
    expect(
      english.evidence.find((item) => item.evidenceId === 'homeedge-product-vision')?.linkLabel,
    ).toBe('Read the Product Vision')
    expect(
      italian.evidence.find((item) => item.evidenceId === 'homeedge-stakeholder-review')?.linkLabel,
    ).toBe('Apri lo spazio stakeholder di HomeEdge')
  })

  it('localizes the public claim taxonomy without changing internal statuses', () => {
    const repository = validateContentRepository()

    expect(repository.locales.en.common.claimStatusLabels).toEqual({
      verified: 'Verified',
      demonstrated: 'Backed by evidence',
      declared: 'Documented direction',
      planned: 'Planned next step',
    })
    expect(repository.locales.it.common.claimStatusLabels).toEqual({
      verified: 'Verificato',
      demonstrated: 'Supportato da evidenze',
      declared: 'Direzione documentata',
      planned: 'Prossimo passo pianificato',
    })
  })

  it('rejects a project missing from one language', () => {
    const repository = cloneRepository()
    repository.locales.en.projects.pop()

    expect(() => validateContentRepository(repository)).toThrow(/locale=en.*path=projects/)
  })

  it('rejects a duplicate localized slug', () => {
    const repository = cloneRepository()
    repository.locales.en.projects[1]!.slug = repository.locales.en.projects[0]!.slug

    expect(() => validateContentRepository(repository)).toThrow(/locale=en.*duplicate slug/)
  })

  it('rejects a duplicate shared project id', () => {
    const repository = cloneRepository()
    repository.projects.push(structuredClone(repository.projects[0]!))

    expect(() => validateContentRepository(repository)).toThrow(
      /duplicate id "homeedge-ai-platform"/,
    )
  })

  it('rejects an unknown capability reference', () => {
    const repository = cloneRepository()
    repository.projects[0]!.capabilityIds = ['missing-capability']

    expect(() => validateContentRepository(repository)).toThrow(/unknown capability id/)
  })

  it('rejects an unknown evidence reference', () => {
    const repository = cloneRepository()
    repository.locales.en.projects[0]!.claims[0]!.evidenceIds = ['missing-evidence']

    expect(() => validateContentRepository(repository)).toThrow(/unknown evidence id/)
  })

  it('rejects an unknown asset reference', () => {
    const repository = cloneRepository()
    repository.projects[0]!.assetIds = ['missing-asset']

    expect(() => validateContentRepository(repository)).toThrow(/unknown asset id/)
  })

  it.each(['demonstrated', 'verified'] as const)(
    'rejects a %s claim without evidence',
    (status) => {
      const repository = cloneRepository()
      repository.locales.it.projects[0]!.claims[0] = {
        id: 'unsupported-claim',
        text: 'Unsupported claim fixture.',
        status,
        evidenceIds: [],
      }

      expect(() => validateContentRepository(repository)).toThrow(/evidenceIds/)
    },
  )

  it('rejects a non-HTTPS external URL with actionable context', () => {
    const repository = cloneRepository()
    repository.projects[0]!.links[0]!.url = 'http://example.com/project'

    expect(() => validateContentRepository(repository)).toThrow(
      /entity=project id=homeedge-ai-platform path=projects\.0\.links\.0\.url: External URLs must use HTTPS/,
    )
  })

  it('rejects a project without one canonical repository link', () => {
    const repository = cloneRepository()
    repository.projects[0]!.links[0]!.kind = 'documentation'

    expect(() => validateContentRepository(repository)).toThrow(
      /entity=project id=homeedge-ai-platform.*Projects require exactly one repository link/,
    )
  })

  it('reports whitespace-only and placeholder content without touching repository files', () => {
    expect(findContentStringProblems({ title: '   ', body: 'TODO: write this' })).toEqual([
      'entity=content path=title: empty string after trim',
      'entity=content path=body: known placeholder text',
    ])
    expect(findContentStringProblems({ image: { alt: '' } })).toEqual([])
  })

  it('rejects missing and duplicated static SEO descriptions in an isolated fixture', () => {
    const descriptions = {
      it: {
        projects: 'Duplicata',
        skills: 'Duplicata',
        method: 'Metodo',
        profile: 'Profilo',
        contact: 'Contatti',
        privacy: 'Privacy',
      },
      en: {
        projects: 'Projects',
        skills: 'Skills',
        method: 'Method',
        profile: 'Profile',
        contact: 'Contact',
      },
    }

    expect(validateStaticSeoDescriptions(descriptions)).toEqual(
      expect.arrayContaining([
        'locale=it entity=seo path=description: duplicate description "Duplicata"',
        'locale=en entity=seo path=privacy.description: missing description',
      ]),
    )
  })
})

describe('content loaders', () => {
  it('loads a project by a valid slug and returns null for an unknown slug', () => {
    expect(getProjectBySlug('it', 'homeedge-ai-platform')?.projectId).toBe('homeedge-ai-platform')
    expect(getProjectBySlug('en', 'missing-project')).toBeNull()
  })

  it('maps the same stable project id to localized slugs and paths', () => {
    expect(getProjectById('it', 'node-list-manager')?.slug).toBe('gestore-liste-node')
    expect(getProjectById('en', 'node-list-manager')?.slug).toBe('node-list-manager')
    expect(getLocalizedProjectPath('node-list-manager', 'it')).toBe(
      '/it/progetti/gestore-liste-node',
    )
    expect(getLocalizedProjectPath('node-list-manager', 'en')).toBe(
      '/en/projects/node-list-manager',
    )
  })

  it('returns all public projects in canonical order', () => {
    expect(getAllProjects('en').map((project) => project.projectId)).toEqual([
      'homeedge-ai-platform',
      'its-library-api-laravel',
      'node-list-manager',
    ])
  })

  it('exposes localized project-origin labels through the view model', () => {
    expect(getProjectById('en', 'homeedge-ai-platform')).toMatchObject({
      origin: 'personal-long-term',
      originLabel: 'PERSONAL PROJECT',
    })
    expect(getProjectById('it', 'its-library-api-laravel')).toMatchObject({
      origin: 'its-training',
      originLabel: 'PROGETTO ITS',
    })
  })

  it('returns featured projects in the order required by the future Home page', () => {
    expect(getFeaturedProjects('it').map((project) => project.projectId)).toEqual([
      'homeedge-ai-platform',
      'its-library-api-laravel',
      'node-list-manager',
    ])
  })

  it('publishes exactly three projects and excludes the rejected initial records', () => {
    const ids = getAllProjects('en').map((project) => project.projectId)

    expect(ids).toHaveLength(3)
    expect(ids).not.toContain('restaurant-kitchef-brain')
    expect(ids).not.toContain('ai-social-agent')
  })
})
