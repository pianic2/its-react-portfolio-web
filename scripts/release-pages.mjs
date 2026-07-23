import { requirePagesConfiguration } from './release-contract.mjs'

try {
  requirePagesConfiguration(process.env)
  console.log('Pages release configuration is present.')
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Pages release configuration is invalid.')
  process.exitCode = 1
}
