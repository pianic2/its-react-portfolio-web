import { Box, type BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { ElementType } from 'react'

type SectionSpacing = 'compact' | 'regular' | 'spacious'

const PageSectionRoot = styled(Box, {
  shouldForwardProp: (property) => property !== 'sectionSpacing',
})<{ sectionSpacing: SectionSpacing }>(({ sectionSpacing, theme }) => {
  const { sectionGap, shadowClearance } = theme.digitalStudio.layout

  const compact = sectionSpacing === 'compact' ? sectionGap.compact : sectionGap.regular
  const regular =
    sectionSpacing === 'compact'
      ? sectionGap.compact
      : sectionSpacing === 'regular'
        ? sectionGap.regular
        : sectionGap.wide
  const wide =
    sectionSpacing === 'compact'
      ? sectionGap.regular
      : sectionSpacing === 'regular'
        ? sectionGap.wide
        : sectionGap.wide + shadowClearance

  return {
    minWidth: 0,
    paddingBlock: `${compact}px`,
    scrollMarginTop: '104px',
    [theme.breakpoints.up('sm')]: {
      paddingBlock: `${regular}px`,
    },
    [theme.breakpoints.up('md')]: {
      paddingBlock: `${wide}px`,
    },
    [theme.breakpoints.up('lg')]: {
      scrollMarginTop: '160px',
    },
  }
})

export type PageSectionProps = Omit<BoxProps, 'component'> & {
  component?: ElementType
  spacing?: SectionSpacing
}

export function PageSection({
  component = 'section',
  spacing = 'regular',
  ...props
}: PageSectionProps) {
  return <PageSectionRoot as={component} sectionSpacing={spacing} {...props} />
}
