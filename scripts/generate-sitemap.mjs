import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const origin = 'https://pianic2.github.io'
const basePath = '/its-react-portfolio-web/'
const routeSource = readFileSync('src/routes/routeConfig.ts', 'utf8')
const routeMatcher = /(\w+): \{\s*indexable: true,\s*paths: \{ it: '([^']*)', en: '([^']*)' \}/g
const routes = [...routeSource.matchAll(routeMatcher)].map(([, page, it, en]) => ({ page, it, en }))
if (!routes.length) throw new Error('Could not read indexable routes from the route contract.')

const slugs = Object.fromEntries(
  ['it', 'en'].map((language) => [
    language,
    [...readFileSync(`src/content/data/${language}.ts`, 'utf8').matchAll(/slug: '([^']+)'/g)].map(
      (match) => match[1],
    ),
  ]),
)
const paths = routes.flatMap((route) =>
  ['it', 'en'].flatMap((language) => {
    const pattern = route[language]
    if (route.page !== 'projectDetail') return [`/${language}${pattern ? `/${pattern}` : ''}`]
    return slugs[language].map((slug) => `/${language}/${pattern.replace(':slug', slug)}`)
  }),
)
const absolute = (path) => new URL(`${basePath.replace(/\/$/, '')}${path}`, origin).href
mkdirSync('dist', { recursive: true })
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${absolute(path)}</loc></url>`).join('\n')}\n</urlset>\n`,
)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`)
console.log(`Generated sitemap with ${paths.length} contract routes.`)
