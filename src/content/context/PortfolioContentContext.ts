import { createContext } from 'react'
import type { getPortfolio, ProjectViewModel } from '../loaders'
import type { Language, SiteContent } from '../schema'

export type PortfolioContentContextValue = {
  language: Language
  siteContent: SiteContent
  portfolio: ReturnType<typeof getPortfolio>
  projects: ProjectViewModel[]
  featuredProjects: ProjectViewModel[]
  getProjectById: (projectId: string) => ProjectViewModel | null
  getProjectBySlug: (slug: string | undefined) => ProjectViewModel | null
  getProjectPath: (projectId: string, language?: Language) => string | null
}

export const PortfolioContentContext = createContext<PortfolioContentContextValue | null>(null)
