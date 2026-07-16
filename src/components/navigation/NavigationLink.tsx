import { styled } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const StyledNavigationLink = styled(NavLink, {
  shouldForwardProp: (property) => property !== 'fullWidth',
})<{ fullWidth: boolean }>(({ fullWidth, theme }) => {
  const { borderWidths, colors, focus, motion, radii, shadowOffsets, shadows } = theme.digitalStudio

  return {
    alignItems: 'center',
    backgroundColor: colors.surface,
    border: `${borderWidths.bold}px solid ${colors.border}`,
    borderRadius: radii.md,
    boxShadow: shadows.small,
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
      boxShadow: shadows.medium,
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
    '&.is-active': {
      backgroundColor: colors.primary,
      boxShadow: 'none',
      color: colors.onPrimary,
      transform: `translate(${shadowOffsets.small}px, ${shadowOffsets.small}px)`,
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
      '&:hover, &:active, &.is-active': {
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
    <StyledNavigationLink
      className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      end={end}
      fullWidth={fullWidth}
      onClick={() => onNavigate?.()}
      to={to}
    >
      {children}
    </StyledNavigationLink>
  )
}
