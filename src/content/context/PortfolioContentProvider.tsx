import { useMemo, type ReactNode } from 'react'
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
import {
  PortfolioContentContext,
  type PortfolioContentContextValue,
} from './PortfolioContentContext'

type PortfolioContentProviderProps = {
  children: ReactNode
  language: Language
}

export function PortfolioContentProvider({ children, language }: PortfolioContentProviderProps) {
  const value = useMemo<PortfolioContentContextValue>(
    () => ({
      language,
      siteContent: getSiteContent(language),
      portfolio: getPortfolio(language),
      projects: getAllProjects(language),
      featuredProjects: getFeaturedProjects(language),
      getProjectById: (projectId) => getProjectById(language, projectId),
      getProjectBySlug: (slug) => getProjectBySlug(language, slug),
      getProjectPath: (projectId, targetLanguage = language) =>
        getLocalizedProjectPath(projectId, targetLanguage),
    }),
    [language],
  )

  return (
    <PortfolioContentContext.Provider value={value}>{children}</PortfolioContentContext.Provider>
  )
}
