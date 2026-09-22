import { useContext } from 'react'
import { BackendContext } from './BackendContext'

export function usePortfolioBackend() {
  return useContext(BackendContext)
}
