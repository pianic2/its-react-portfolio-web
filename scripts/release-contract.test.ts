import { describe, expect, it } from 'vitest'
import {
  compareBudget,
  requirePagesConfiguration,
  siteUrl,
  summarizeAssets,
} from './release-contract.mjs'

describe('release contract', () => {
  it('builds GitHub Pages URLs from one origin and base path', () => {
    expect(siteUrl('/en/projects')).toBe(
      'https://pianic2.github.io/its-react-portfolio-web/en/projects',
    )
  })

  it('rejects missing Pages-only configuration without exposing a value', () => {
    expect(() => requirePagesConfiguration({})).toThrow('missing VITE_WEB3FORMS_ACCESS_KEY')
  })

  it('reports budget violations from isolated asset fixtures', () => {
    const measured = summarizeAssets([
      { path: 'assets/app.js', contents: Buffer.from('too large') },
    ])
    expect(compareBudget(measured, { 'assets/app.js': { bytes: 1, gzipBytes: 1 } })).toHaveLength(1)
  })
})
