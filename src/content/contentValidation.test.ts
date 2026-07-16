import { describe, expect, it } from 'vitest'
import { rawContentRepository } from './data'
import {
  getAllProjects,
  getFeaturedProjects,
  getLocalizedProjectPath,
  getProjectById,
  getProjectBySlug,
} from './loaders'
import type { ContentRepository } from './schema'
import { validateContentRepository } from './validation'

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
