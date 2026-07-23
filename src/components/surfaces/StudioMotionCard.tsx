import type { Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { StudioCard, type StudioCardProps } from './StudioCard'

type StudioMotionCardProps = Omit<StudioCardProps, 'sx'> & {
  children: ReactNode
  rotation?: number
  sx?: (theme: Theme) => object
}

export function StudioMotionCard({ children, rotation = 0, sx, ...props }: StudioMotionCardProps) {
  return (
    <StudioCard
      {...props}
      sx={(theme) => ({
        border: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
        borderRadius: `${theme.digitalStudio.radii.lg}px`,
        boxShadow: theme.digitalStudio.shadows.medium,
        marginBlockEnd: `${theme.digitalStudio.shadowOffsets.large}px`,
        marginInlineEnd: `${theme.digitalStudio.shadowOffsets.large}px`,
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeIn,
        }),
        '&:hover': {
          boxShadow: theme.digitalStudio.shadows.small,
          transform: `translate(${theme.digitalStudio.shadowOffsets.medium}px, ${theme.digitalStudio.shadowOffsets.medium}px) rotate(${rotation}deg)`,
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
        transform: { md: `rotate(${rotation}deg)` },
        ...sx?.(theme),
      })}
    >
      {children}
    </StudioCard>
  )
}
