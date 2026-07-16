import { styled } from '@mui/material/styles'
import type { MouseEvent } from 'react'

const SkipAnchor = styled('a')(({ theme }) => {
  const { borderWidths, colors, focus, motion, radii, shadows } = theme.digitalStudio

  return {
    backgroundColor: colors.warning,
    border: `${borderWidths.bold}px solid ${colors.border}`,
    borderRadius: radii.md,
    boxShadow: shadows.medium,
    color: colors.onWarning,
    fontWeight: 900,
    insetBlockStart: `max(${theme.spacing(2)}, env(safe-area-inset-top))`,
    insetInlineStart: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
    opacity: 0,
    padding: theme.spacing(3, 4),
    pointerEvents: 'none',
    position: 'fixed',
    textDecoration: 'none',
    transform: 'translateY(-200%)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: motion.duration.fast,
      easing: motion.easing.standard,
    }),
    zIndex: theme.zIndex.tooltip,
    '&:focus-visible': {
      boxShadow: `0 0 0 ${focus.outerWidth}px ${colors.focusOuter}, ${shadows.medium}`,
      opacity: 1,
      outline: `${focus.width}px solid ${colors.focusInner}`,
      outlineOffset: focus.offset,
      pointerEvents: 'auto',
      transform: 'none',
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  }
})

type SkipLinkProps = {
  label: string
  targetId: string
}

export function SkipLink({ label, targetId }: SkipLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    target?.focus({ preventScroll: true })
    target?.scrollIntoView?.({ block: 'start' })
  }

  return (
    <SkipAnchor href={`#${targetId}`} onClick={handleClick}>
      {label}
    </SkipAnchor>
  )
}
