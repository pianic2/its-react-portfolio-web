import { rawContentRepository } from '../content/data/index.ts'
import {
  getIndexableStaticRoutePaths,
  getRoutePath,
  routeDefinitions,
  supportedLanguages,
} from './routeConfig.ts'

export const siteOrigin = 'https://pianic2.github.io'
export const githubPagesBasePath = '/its-react-portfolio-web/'

function absoluteUrl(pathname: string) {
  return new URL(`${githubPagesBasePath.replace(/\/$/, '')}${pathname}`, siteOrigin).href
}

export function getIndexableSitemapPaths() {
  const staticPaths = getIndexableStaticRoutePaths()
  const detailPaths = routeDefinitions.projectDetail.indexable
    ? supportedLanguages.flatMap((language) =>
        rawContentRepository.locales[language].projects.map((project) =>
          getRoutePath('projectDetail', language, { slug: project.slug }),
        ),
      )
    : []
  return [...staticPaths, ...detailPaths]
}

export function createSitemapXml() {
  const urls = getIndexableSitemapPaths().map(
    (path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`,
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function createRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
}
