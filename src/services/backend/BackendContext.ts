import { createContext } from 'react'
import type { PortfolioBackend } from './adapter'

export const BackendContext = createContext<PortfolioBackend | null>(null)
