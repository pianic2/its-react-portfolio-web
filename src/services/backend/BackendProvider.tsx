import { useMemo, type ReactNode } from 'react'
import { createPortfolioBackend } from './adapter'
import { BackendContext } from './BackendContext'

export function PortfolioBackendProvider({ children }: { children: ReactNode }) {
  const backend = useMemo(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL
    return baseUrl ? createPortfolioBackend(baseUrl) : null
  }, [])

  return <BackendContext.Provider value={backend}>{children}</BackendContext.Provider>
}
