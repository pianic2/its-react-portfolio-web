import { styled } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const StyledNavigationLink = styled(NavLink, {
  shouldForwardProp: (property) => property !== 'fullWidth',
})<{ fullWidth: boolean }>(({ fullWidth, theme }) => {
  const { borderWidths, colors, focus, motion, radii, shadowOffsets, shadows } = theme.digitalStudio

  return {
    alignItems: 'center',
    backgroundColor: fullWidth ? colors.surface : 'transparent',
    border: `${fullWidth ? borderWidths.bold : borderWidths.regular}px solid ${fullWidth ? colors.border : 'transparent'}`,
    borderRadius: fullWidth ? radii.md : radii.sm,
    boxShadow: fullWidth ? shadows.small : 'none',
    color: colors.text,
    display: 'inline-flex',
    fontWeight: 900,
    justifyContent: fullWidth ? 'flex-start' : 'center',
    minHeight: theme.spacing(12),
    paddingInline: theme.spacing(4),
    position: 'relative',
    textDecoration: 'none',
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: motion.duration.fast,
      easing: motion.easing.standard,
    }),
    width: fullWidth ? '100%' : 'auto',
    '&:hover': {
      boxShadow: fullWidth ? shadows.medium : shadows.small,
      transform: `translate(-${shadowOffsets.small}px, -${shadowOffsets.small}px)`,
    },
    '&:active': {
      boxShadow: 'none',
      transform: `translate(${shadowOffsets.small}px, ${shadowOffsets.small}px)`,
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 ${focus.outerWidth}px ${colors.focusOuter}, ${shadows.small}`,
      outline: `${focus.width}px solid ${colors.focusInner}`,
      outlineOffset: focus.offset,
    },
    '&[aria-current="page"]': {
      backgroundColor: fullWidth ? colors.primary : colors.surfaceStrong,
      boxShadow: 'none',
      color: fullWidth ? colors.onPrimary : colors.text,
      transform: fullWidth
        ? `translate(${shadowOffsets.small}px, ${shadowOffsets.small}px)`
        : 'none',
      '&::after': {
        backgroundColor: 'currentColor',
        blockSize: borderWidths.bold,
        content: '""',
        insetBlockEnd: theme.spacing(1),
        insetInline: theme.spacing(3),
        position: 'absolute',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover, &:active, &[aria-current="page"]': {
        transform: 'none',
      },
    },
  }
})

type NavigationLinkProps = {
  children: ReactNode
  end?: boolean
  fullWidth?: boolean
  onNavigate?: (() => void) | undefined
  to: string
}

export function NavigationLink({
  children,
  end = false,
  fullWidth = false,
  onNavigate,
  to,
}: NavigationLinkProps) {
  return (
    <StyledNavigationLink end={end} fullWidth={fullWidth} onClick={() => onNavigate?.()} to={to}>
      {children}
    </StyledNavigationLink>
  )
}
