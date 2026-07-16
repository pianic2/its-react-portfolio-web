import { Card, type CardProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { ElementType } from 'react'

export type StudioCardVariant = 'standard' | 'featured'

const StudioCardRoot = styled(Card, {
  shouldForwardProp: (property) => property !== 'studioVariant',
})<{ studioVariant: StudioCardVariant }>(({ studioVariant, theme }) => {
  const featured = studioVariant === 'featured'
  const shadowOffset = featured
    ? theme.digitalStudio.shadowOffsets.large
    : theme.digitalStudio.shadowOffsets.medium

  return {
    backgroundColor: featured
      ? theme.digitalStudio.colors.surfaceStrong
      : theme.digitalStudio.colors.surface,
    boxShadow: featured ? theme.digitalStudio.shadows.large : theme.digitalStudio.shadows.medium,
    marginBlockEnd: shadowOffset,
    marginInlineEnd: shadowOffset,
    minWidth: 0,
    overflow: 'visible',
  }
})

export type StudioCardProps = Omit<CardProps, 'variant'> & {
  component?: ElementType
  variant?: StudioCardVariant
}

export function StudioCard({ variant = 'standard', ...props }: StudioCardProps) {
  return <StudioCardRoot studioVariant={variant} {...props} />
}
