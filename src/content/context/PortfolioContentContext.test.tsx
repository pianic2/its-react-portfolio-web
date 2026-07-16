import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { PortfolioContentProvider } from './PortfolioContentProvider'
import { usePortfolioContent } from './usePortfolioContent'

describe('PortfolioContentProvider', () => {
  it('fails with an action-oriented error outside the provider', () => {
    expect(() => renderHook(() => usePortfolioContent())).toThrow(
      'usePortfolioContent must be used within PortfolioContentProvider',
    )
  })

  it('exposes validated localized projects and stable lookup APIs', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PortfolioContentProvider language="it">{children}</PortfolioContentProvider>
    )
    const { result } = renderHook(() => usePortfolioContent(), { wrapper })

    expect(result.current.language).toBe('it')
    expect(result.current.projects.map((project) => project.id)).toEqual([
      'homeedge-ai-platform',
      'its-library-api-laravel',
      'node-list-manager',
    ])
    expect(result.current.featuredProjects).toHaveLength(3)
    expect(result.current.getProjectById('node-list-manager')?.slug).toBe('gestore-liste-node')
    expect(result.current.getProjectBySlug('gestore-liste-node')?.id).toBe('node-list-manager')
    expect(result.current.getProjectBySlug('unknown')).toBeNull()
    expect(result.current.getProjectPath('node-list-manager', 'en')).toBe(
      '/en/projects/node-list-manager',
    )
  })
})
