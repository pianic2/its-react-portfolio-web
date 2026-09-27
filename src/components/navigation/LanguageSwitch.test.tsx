import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import type { PortfolioBackend } from '../../services/backend'
import { BackendContext } from '../../services/backend/BackendContext'
import { DigitalStudioProvider } from '../../theme'
import { LanguageSwitch } from './LanguageSwitch'

describe('LanguageSwitch', () => {
  it('falls back to the translated Blog listing when detail lookup rejects', async () => {
    const backend: PortfolioBackend = {
      listPages: vi.fn<PortfolioBackend['listPages']>(async () => []),
      getPage: vi.fn<PortfolioBackend['getPage']>(async () => ({})),
      findBySlug: vi
        .fn<PortfolioBackend['findBySlug']>()
        .mockRejectedValue(new Error('backend unavailable')),
      findByStableId: vi.fn<PortfolioBackend['findByStableId']>(async () => null),
      resolveAssetUrl: (path) => path,
    }

    render(
      <DigitalStudioProvider>
        <MemoryRouter initialEntries={['/en/blog/article-slug']}>
          <BackendContext.Provider value={backend}>
            <Routes>
              <Route
                element={<LanguageSwitch presentation="full" />}
                path="/:language/blog/:slug"
              />
            </Routes>
          </BackendContext.Provider>
        </MemoryRouter>
      </DigitalStudioProvider>,
    )

    const switchLink = screen.getByRole('link', { name: 'Switch to Italian' })
    expect(switchLink).toHaveAttribute('href', '/it/blog')
    await waitFor(() => expect(backend.findBySlug).toHaveBeenCalledOnce())
    expect(switchLink).toHaveAttribute('href', '/it/blog')
  })
})
