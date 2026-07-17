import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

export type EditorialSectionHeaderProps = {
  eyebrow: string
  title: string
  description: string
  supportingContent?: ReactNode
  headingLevel?: 'h1' | 'h2'
  id?: string
  testId?: string
}

export function EditorialSectionHeader({
  description,
  eyebrow,
  headingLevel = 'h2',
  id,
  supportingContent,
  testId,
  title,
}: EditorialSectionHeaderProps) {
  return (
    <Box
      data-testid={testId}
      sx={{
        alignItems: { md: 'start' },
        display: 'grid',
        gap: { xs: 3, md: 6 },
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.9fr) minmax(18rem, 1.1fr)' },
        minWidth: 0,
      }}
    >
      <Stack
        data-testid={testId ? `${testId}-heading` : undefined}
        spacing={1.5}
        sx={{ minWidth: 0 }}
      >
        <Typography sx={{ letterSpacing: 0 }} variant="overline">
          {eyebrow}
        </Typography>
        <Typography
          component={headingLevel}
          id={id}
          sx={{
            fontSize: { xs: '2.25rem', sm: '3rem', md: '4rem' },
            letterSpacing: 0,
            maxWidth: '16ch',
            overflowWrap: 'break-word',
          }}
          variant={headingLevel === 'h1' ? 'h1' : 'h2'}
        >
          {title}
        </Typography>
      </Stack>
      <Stack
        data-testid={testId ? `${testId}-description` : undefined}
        spacing={2}
        sx={{ minWidth: 0, paddingBlockStart: { md: 3 } }}
      >
        <Typography color="text.secondary" sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '58ch' }}>
          {description}
        </Typography>
        {supportingContent}
      </Stack>
    </Box>
  )
}
