import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { analyzeSourceFiles, findPossibleDeadFiles } from './architecture-rules.mjs'

function files(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

const sourceFiles = files('src')
  .filter((path) => /\.(ts|tsx)$/.test(path))
  .map((path) => ({ path: relative('.', path), source: readFileSync(path, 'utf8') }))
const report = analyzeSourceFiles(sourceFiles)
const deadFileCandidates = findPossibleDeadFiles(sourceFiles)

if (report.blocking.length) {
  console.error(
    `Architecture blocking checks failed:\n${report.blocking.map((item) => `- ${item}`).join('\n')}`,
  )
  process.exitCode = 1
} else {
  console.log('Architecture blocking checks passed.')
}

const informational = [...report.informational, ...deadFileCandidates]
if (informational.length) {
  console.warn(
    `Architecture informational report (non-blocking):\n${informational.map((item) => `- ${item}`).join('\n')}`,
  )
} else {
  console.log('Architecture informational report: no candidates found.')
}

console.log(
  'Architecture manual review (IRPW-31): semantic component duplication, practical reusability, page composition, UX monolithicity, visual regressions and communication quality.',
)
