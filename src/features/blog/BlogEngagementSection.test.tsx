import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PortfolioContentProvider } from '../../content/context'
import { DigitalStudioProvider } from '../../theme'
import { BackendContext } from '../../services/backend/BackendContext'
import type { PortfolioBackend } from '../../services/backend'
import { BlogEngagementSection } from './BlogEngagementSection'

describe('BlogEngagementSection', () => {
  it('uses readable text color for the configured label in the light theme', () => {
    const backend: PortfolioBackend = {
      listPages: vi.fn<PortfolioBackend['listPages']>().mockResolvedValue([]),
      getPage: vi.fn<PortfolioBackend['getPage']>(),
      findBySlug: vi.fn<PortfolioBackend['findBySlug']>(),
      findByStableId: vi.fn<PortfolioBackend['findByStableId']>(),
      resolveAssetUrl: (path) => path,
    }

    render(
      <DigitalStudioProvider>
        <MemoryRouter initialEntries={['/en/profile']}>
          <PortfolioContentProvider language="en">
            <BackendContext.Provider value={backend}>
              <BlogEngagementSection />
            </BackendContext.Provider>
          </PortfolioContentProvider>
        </MemoryRouter>
      </DigitalStudioProvider>,
    )

    expect(getComputedStyle(screen.getByText('FROM THE BLOG')).color).toBe(
      'var(--mui-palette-text-primary)',
    )
  })
})
