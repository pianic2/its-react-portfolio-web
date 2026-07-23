import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { releaseContract } from './release-contract.mjs'

const dist = 'dist'
const failures = releaseContract.requiredFiles
  .filter((file) => !existsSync(join(dist, file)))
  .map((file) => `Missing required Pages artifact: ${file}`)
const index = existsSync(join(dist, 'index.html'))
  ? readFileSync(join(dist, 'index.html'), 'utf8')
  : ''
if (!index.includes(`${releaseContract.basePath}assets/`))
  failures.push('index.html does not use the Pages asset base path.')
const robots = existsSync(join(dist, 'robots.txt'))
  ? readFileSync(join(dist, 'robots.txt'), 'utf8')
  : ''
if (!robots.includes(`Sitemap: ${releaseContract.origin}${releaseContract.basePath}sitemap.xml`))
  failures.push('robots.txt does not reference the generated sitemap.')
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else console.log('Pages bundle contract passed.')
