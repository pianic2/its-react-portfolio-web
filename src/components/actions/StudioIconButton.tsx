import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StudioIconButton = styled(IconButton)(({ theme }) => {
  const { borderWidths, colors, focus, motion, shadowOffsets, shadows } = theme.digitalStudio

  return {
    backgroundColor: colors.surface,
    border: `${borderWidths.bold}px solid ${colors.border}`,
    boxShadow: shadows.small,
    color: colors.text,
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: motion.duration.fast,
      easing: motion.easing.standard,
    }),
    '&:hover': {
      backgroundColor: colors.surface,
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
    '&.Mui-disabled': {
      borderColor: colors.border,
      boxShadow: 'none',
      opacity: 0.58,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '&:hover, &:active': {
        transform: 'none',
      },
    },
  }
})
