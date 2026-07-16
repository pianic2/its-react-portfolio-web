import { Box, type BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { ElementType } from 'react'

const PageContainerRoot = styled(Box, {
  shouldForwardProp: (property) => property !== 'reserveShadowClearance',
})<{ reserveShadowClearance: boolean }>(({ reserveShadowClearance, theme }) => {
  const { pageGutter, shadowClearance } = theme.digitalStudio.layout

  const inlineEnd = (gutter: number) => gutter + (reserveShadowClearance ? shadowClearance : 0)

  return {
    marginInline: 'auto',
    maxWidth: theme.breakpoints.values.xl,
    minWidth: 0,
    paddingInlineEnd: `max(${inlineEnd(pageGutter.compact)}px, calc(env(safe-area-inset-right) + ${reserveShadowClearance ? shadowClearance : 0}px))`,
    paddingInlineStart: `max(${pageGutter.compact}px, env(safe-area-inset-left))`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingInlineEnd: `max(${inlineEnd(pageGutter.regular)}px, calc(env(safe-area-inset-right) + ${reserveShadowClearance ? shadowClearance : 0}px))`,
      paddingInlineStart: `max(${pageGutter.regular}px, env(safe-area-inset-left))`,
    },
    [theme.breakpoints.up('md')]: {
      paddingInlineEnd: `max(${inlineEnd(pageGutter.wide)}px, calc(env(safe-area-inset-right) + ${reserveShadowClearance ? shadowClearance : 0}px))`,
      paddingInlineStart: `max(${pageGutter.wide}px, env(safe-area-inset-left))`,
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
