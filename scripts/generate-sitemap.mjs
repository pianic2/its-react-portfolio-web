import { mkdirSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

const vite = await createServer({ server: { hmr: false, middlewareMode: true, watch: null } })
const { createRobotsTxt, createSitemapXml, getIndexableSitemapPaths } =
  await vite.ssrLoadModule('/src/routes/sitemap.ts')

mkdirSync('dist', { recursive: true })
writeFileSync('dist/sitemap.xml', createSitemapXml())
writeFileSync('dist/robots.txt', createRobotsTxt())
await vite.close()
console.log(`Generated sitemap with ${getIndexableSitemapPaths().length} contract routes.`)
