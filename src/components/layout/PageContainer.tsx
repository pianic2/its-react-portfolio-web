import { Box, type BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { ElementType } from 'react'

const PageContainerRoot = styled(Box, {
  shouldForwardProp: (property) => property !== 'reserveShadowClearance',
})<{ reserveShadowClearance: boolean }>(({ reserveShadowClearance, theme }) => {
  const { pageGutter, shadowClearance } = theme.digitalStudio.layout
  const maxWidth = `${theme.breakpoints.values.xl}px`

  const inlinePadding = (gutter: number) =>
    gutter + (reserveShadowClearance ? shadowClearance : 0)
  const safeAreaPadding = reserveShadowClearance ? shadowClearance : 0

  const paddingFor = (gutter: number, safeArea: 'left' | 'right') =>
    `max(${inlinePadding(gutter)}px, calc(env(safe-area-inset-${safeArea}) + ${safeAreaPadding}px))`

  return {
    boxSizing: 'border-box',
    inlineSize: '100%',
    marginInline: 'auto',
    maxInlineSize: maxWidth,
    minWidth: 0,
    paddingInlineEnd: paddingFor(pageGutter.compact, 'right'),
    paddingInlineStart: paddingFor(pageGutter.compact, 'left'),
    [theme.breakpoints.up('sm')]: {
      paddingInlineEnd: paddingFor(pageGutter.regular, 'right'),
      paddingInlineStart: paddingFor(pageGutter.regular, 'left'),
    },
    [theme.breakpoints.up('md')]: {
      paddingInlineEnd: paddingFor(pageGutter.wide, 'right'),
      paddingInlineStart: paddingFor(pageGutter.wide, 'left'),
    },
  }
})

export type PageContainerProps = Omit<BoxProps, 'component'> & {
  component?: ElementType
  reserveShadowClearance?: boolean
}

export function PageContainer({
  component = 'div',
  reserveShadowClearance = true,
  ...props
}: PageContainerProps) {
  return (
    <PageContainerRoot
      component={component}
      reserveShadowClearance={reserveShadowClearance}
      {...props}
    />
  )
}
