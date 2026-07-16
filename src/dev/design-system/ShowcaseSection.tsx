import { Box, CardContent, Stack, Typography } from '@mui/material'
import { useId, type ReactNode } from 'react'
import { StudioCard } from '../../components/surfaces/StudioCard'

type ShowcaseSectionProps = {
  children: ReactNode
  description?: string
  eyebrow: string
  title: string
  wide?: boolean
}

export function ShowcaseSection({
  children,
  description,
  eyebrow,
  title,
  wide = false,
}: ShowcaseSectionProps) {
  const headingId = useId()

  return (
    <StudioCard
      aria-labelledby={headingId}
      component="section"
      sx={{ gridColumn: wide ? { lg: '1 / -1' } : undefined, inlineSize: '100%' }}
    >
      <CardContent
        sx={(theme) => ({
          p: {
            xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
            sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
            md: `${theme.digitalStudio.layout.panelInset.wide}px`,
          },
          '&:last-child': {
            pb: {
              xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
              sm: `${theme.digitalStudio.layout.panelInset.regular}px`,
              md: `${theme.digitalStudio.layout.panelInset.wide}px`,
            },
          },
        })}
      >
        <Stack spacing={5}>
          <Box>
            <Typography color="text.secondary" variant="overline">
              {eyebrow}
            </Typography>
            <Typography component="h2" id={headingId} variant="h3">
              {title}
            </Typography>
            {description ? (
              <Typography color="text.secondary" sx={{ mt: 3, maxWidth: '72ch' }}>
                {description}
              </Typography>
            ) : null}
          </Box>
          {children}
        </Stack>
      </CardContent>
    </StudioCard>
  )
}
