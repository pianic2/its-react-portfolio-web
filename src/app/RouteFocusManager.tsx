import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

type RouteFocusManagerProps = {
  targetId: string
}

export function RouteFocusManager({ targetId }: RouteFocusManagerProps) {
  const { hash, pathname } = useLocation()
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (hash) {
      return
    }

    document.getElementById(targetId)?.focus()
  }, [hash, pathname, targetId])

  return null
}
