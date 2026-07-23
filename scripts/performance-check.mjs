import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { compareBudget, summarizeAssets } from './release-contract.mjs'

const baseline = JSON.parse(readFileSync('scripts/performance-budget.json', 'utf8'))
const files = readdirSync('dist/assets').map((name) => ({
  path: `assets/${name}`,
  contents: readFileSync(join('dist/assets', name)),
}))
const measured = summarizeAssets(files)
const budget = Object.fromEntries(
  Object.entries(baseline.assets).map(([path, asset]) => [
    path,
    {
      bytes:
        asset.bytes +
        Math.max(
          baseline.allowance.absoluteBytes,
          Math.ceil(asset.bytes * baseline.allowance.relative),
        ),
      gzipBytes:
        asset.gzipBytes +
        Math.max(
          baseline.allowance.absoluteBytes,
          Math.ceil(asset.gzipBytes * baseline.allowance.relative),
        ),
    },
  ]),
)
const errors = compareBudget(measured, budget)
if (errors.length) {
  console.error(`Performance budget failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  process.exitCode = 1
} else console.log(`Performance budget passed for ${measured.length} emitted assets.`)
