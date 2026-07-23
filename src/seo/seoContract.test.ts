import { describe, expect, it } from 'vitest'
import { getSeoMetadata } from './seoContract'

describe('SEO contract', () => {
  it('derives localized project metadata and Pages canonical URLs', () => {
    const metadata = getSeoMetadata('/en/projects/node-list-manager')
    expect(metadata.canonical).toBe(
      'https://pianic2.github.io/its-react-portfolio-web/en/projects/node-list-manager',
    )
    expect(metadata.alternates.it).toBe(
      'https://pianic2.github.io/its-react-portfolio-web/it/progetti/gestore-liste-node',
    )
    expect(metadata.title).toBe('ITS Node.js Project')
  })

  it('marks unknown routes and project slugs as non-indexable', () => {
    expect(getSeoMetadata('/en/unknown').indexable).toBe(false)
    expect(getSeoMetadata('/en/projects/unknown').indexable).toBe(false)
  })
})
