import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { createContentAdapter } from '../adapter'
import {
  getAllProjects,
  getFeaturedProjects,
  getLocalizedProjectPath,
  getPortfolio,
  getProjectById,
  getProjectBySlug,
  getSiteContent,
} from '../loaders'
import type { Language } from '../schema'
import { validateContentRepository } from '../validation'
import {
  PortfolioContentContext,
  type PortfolioContentContextValue,
} from './PortfolioContentContext'

type PortfolioContentProviderProps = {
  children: ReactNode
  language: Language
}

export function PortfolioContentProvider({ children, language }: PortfolioContentProviderProps) {
  const [contentRepository, setContentRepository] = useState(() => validateContentRepository())
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let active = true
    setStatus('loading')
    void createContentAdapter()
      .load()
      .then((nextRepository) => {
        if (!active) return
        setContentRepository(nextRepository)
        setError(null)
        setStatus('ready')
      })
      .catch((reason: unknown) => {
        if (!active) return
        setError(reason instanceof Error ? reason : new Error('Portfolio content failed to load.'))
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo<PortfolioContentContextValue>(
    () => ({
      language,
      status,
      error,
      siteContent: getSiteContent(language, contentRepository),
      portfolio: getPortfolio(language, contentRepository),
      projects: getAllProjects(language, contentRepository),
      featuredProjects: getFeaturedProjects(language, contentRepository),
      getProjectById: (projectId) => getProjectById(language, projectId, contentRepository),
      getProjectBySlug: (slug) => getProjectBySlug(language, slug, contentRepository),
      getProjectPath: (projectId, targetLanguage = language) =>
        getLocalizedProjectPath(projectId, targetLanguage, contentRepository),
    }),
    [contentRepository, error, language, status],
  )

  return (
    <PortfolioContentContext.Provider value={value}>{children}</PortfolioContentContext.Provider>
  )
}
