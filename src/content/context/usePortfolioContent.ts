import { useContext } from 'react'
import { PortfolioContentContext } from './PortfolioContentContext'

export function usePortfolioContent() {
  const content = useContext(PortfolioContentContext)

  if (!content) {
    throw new Error(
      'usePortfolioContent must be used within PortfolioContentProvider. Mount the provider around the localized application layout.',
    )
  }

  return content
}
