import axe from 'axe-core'
import { fireEvent, render, screen } from '@testing-library/react'
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
  it.each(['/en', '/en/projects/homeedge-ai-platform', '/en/contact', '/en/method', '/en/privacy'])(
    '%s has no deterministic axe violations',
    async (path) => {
      expect(await getAxeViolations(path)).toEqual([])
    },
  )

  it('keeps contact validation errors accessible', async () => {
    const view = render(
      <DigitalStudioProvider>
        <MemoryRouter initialEntries={['/en/contact']}>
          <AppRoutes />
        </MemoryRouter>
      </DigitalStudioProvider>,
    )
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!)

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'aria-describedby',
      'contact-name-error',
    )
    expect(
      await axe.run(view.container, { rules: { 'color-contrast': { enabled: false } } }),
    ).toMatchObject({
      violations: [],
    })
  })

  it('keeps decorative profile imagery out of the accessible name calculation', () => {
    render(
      <DigitalStudioProvider>
        <MemoryRouter initialEntries={['/en/profile']}>
          <AppRoutes />
        </MemoryRouter>
      </DigitalStudioProvider>,
    )

    expect(document.querySelector('img[src*="LeetCode_logo"]')).toHaveAttribute('alt', '')
  })
})
