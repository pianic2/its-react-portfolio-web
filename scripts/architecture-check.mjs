import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

function files(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

const sourceFiles = files('src').filter((path) => /\.(ts|tsx)$/.test(path))
const blocking = []
const informational = []
for (const path of sourceFiles) {
  const source = readFileSync(path, 'utf8')
  const label = relative('.', path)
  if (!path.startsWith('src/services/contact/') && /api\.web3forms\.com/.test(source))
    blocking.push(`${label}: direct Web3Forms access outside the adapter`)
  if (!/\.test\./.test(path) && /console\.(log|debug|info)\(/.test(source))
    blocking.push(`${label}: production console logging`)
  if (/\bany\b/.test(source)) blocking.push(`${label}: explicit any`)
  if (source.split('\n').length > 500)
    informational.push(`${label}: exceeds 500 lines; review composition manually`)
}
if (blocking.length) {
  console.error(
    `Architecture blocking checks failed:\n${blocking.map((item) => `- ${item}`).join('\n')}`,
  )
  process.exitCode = 1
} else console.log('Architecture blocking checks passed.')
if (informational.length)
  console.warn(
    `Architecture informational report:\n${informational.map((item) => `- ${item}`).join('\n')}`,
  )
