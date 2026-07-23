import { describe, expect, it } from 'vitest'
import { createRobotsTxt, createSitemapXml, getIndexableSitemapPaths } from './sitemap'

describe('generated sitemap contract', () => {
  it('derives static and localized project detail routes from contracts', () => {
    expect(getIndexableSitemapPaths()).toContain('/en/projects/node-list-manager')
    expect(getIndexableSitemapPaths()).toContain('/it/progetti/gestore-liste-node')
  })

  it('generates Pages-origin URLs and a matching robots declaration', () => {
    expect(createSitemapXml()).toContain('https://pianic2.github.io/its-react-portfolio-web/en')
    expect(createRobotsTxt()).toContain(
      'https://pianic2.github.io/its-react-portfolio-web/sitemap.xml',
    )
  })
})
