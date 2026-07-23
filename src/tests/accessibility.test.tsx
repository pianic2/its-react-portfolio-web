import axe from 'axe-core'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../routes/AppRoutes'
import { DigitalStudioProvider } from '../theme'

async function getAxeViolations(path: string) {
  const view = render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
  const result = await axe.run(view.container, {
    rules: { 'color-contrast': { enabled: false } },
  })
  return result.violations
}

describe('representative public accessibility surfaces', () => {
  it.each(['/en', '/en/projects/homeedge-ai-platform', '/en/contact', '/en/privacy'])(
    '%s has no deterministic axe violations',
    async (path) => {
      expect(await getAxeViolations(path)).toEqual([])
    },
  )
})
