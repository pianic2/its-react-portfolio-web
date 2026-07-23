import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../routes/AppRoutes'
import { DigitalStudioProvider } from '../theme'

afterEach(() => {
  cleanup()
  document.head
    .querySelectorAll(
      '[data-seo-alternate], [data-seo-canonical], meta[name="robots"], meta[name="description"]',
    )
    .forEach((element) => element.remove())
})

describe('SeoMetadata integration', () => {
  it('updates the real document head without duplicate canonical or alternate links', async () => {
    const user = userEvent.setup()
    render(
      <DigitalStudioProvider>
        <MemoryRouter initialEntries={['/en']}>
          <AppRoutes />
        </MemoryRouter>
      </DigitalStudioProvider>,
    )
    expect(document.title).toContain('Software development portfolio')
    await user.click(screen.getByRole('link', { name: 'View my projects' }))
    expect(document.title).toContain('Projects')
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content,
    ).toContain('Selected software projects')
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(2)
    expect(document.documentElement.lang).toBe('en')
  })

  it('sets noindex and removes canonical for an unknown route', () => {
    render(
      <DigitalStudioProvider>
        <MemoryRouter initialEntries={['/en/unknown']}>
          <AppRoutes />
        </MemoryRouter>
      </DigitalStudioProvider>,
    )
    expect(document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content).toBe(
      'noindex, nofollow',
    )
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })
})
