import { describe, expect, it } from 'vitest'
import { rawContentRepository } from './data'
import { getAllProjects, getLocalizedProjectPath, getProjectBySlug } from './loaders'
import { ContentValidationError, validateContentRepository } from './validation'

function cloneRepository() {
  return structuredClone(rawContentRepository)
}

describe('content repository validation', () => {
  it('accepts the four equivalent Italian and English project records', () => {
    const repository = validateContentRepository()

    expect(repository.projects).toHaveLength(4)
    expect(repository.locales.it.projects.map((project) => project.projectId)).toEqual(
      repository.locales.en.projects.map((project) => project.projectId),
    )
  })

  it('rejects a demonstrated claim without evidence', () => {
    const repository = cloneRepository()
    repository.locales.it.projects[0].claim = { status: 'demonstrated', evidenceIds: [] }

    expect(() => validateContentRepository(repository)).toThrow(ContentValidationError)
  })

  it('rejects missing locale project data', () => {
    const repository = cloneRepository()
    repository.locales.en.projects.pop()

    expect(() => validateContentRepository(repository)).toThrow(/projects/)
  })

  it('rejects unknown evidence references', () => {
    const repository = cloneRepository()
    repository.locales.en.projects[0].claim = {
      status: 'verified',
      evidenceIds: ['missing-evidence'],
    }

    expect(() => validateContentRepository(repository)).toThrow(/unknown evidence id/)
  })

  it('rejects duplicate localized slugs', () => {
    const repository = cloneRepository()
    repository.locales.en.projects[1].slug = repository.locales.en.projects[0].slug

    expect(() => validateContentRepository(repository)).toThrow(/duplicate slug/)
  })
})

describe('content loaders', () => {
  it('loads projects by localized slug', () => {
    expect(getProjectBySlug('it', 'homeedge-ai-platform')?.projectId).toBe('homeedge-ai-platform')
    expect(getProjectBySlug('en', 'missing-project')).toBeNull()
  })

  it('returns projects in the shared portfolio order', () => {
    expect(getAllProjects('en').map((project) => project.projectId)).toEqual([
      'homeedge-ai-platform',
      'restaurant-kitchef-brain',
      'ai-social-agent',
      'its-libreria-api',
    ])
  })

  it('resolves the corresponding localized project route from a stable id', () => {
    expect(getLocalizedProjectPath('restaurant-kitchef-brain', 'it')).toBe(
      '/it/progetti/restaurant-kitchef-brain',
    )
    expect(getLocalizedProjectPath('restaurant-kitchef-brain', 'en')).toBe(
      '/en/projects/restaurant-kitchef-brain',
    )
  })
})
