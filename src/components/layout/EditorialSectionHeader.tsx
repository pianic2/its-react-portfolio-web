import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

export type EditorialSectionHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
  description: string
  asideContent?: ReactNode
  layout?: 'split' | 'single'
  supportingContent?: ReactNode
  titleMaxWidth?: string
  headingLevel?: 'h1' | 'h2'
  id?: string
  testId?: string
}

export function EditorialSectionHeader({
  description,
  asideContent,
  eyebrow,
  headingLevel = 'h2',
  id,
  layout = 'split',
  supportingContent,
  subtitle,
  testId,
  titleMaxWidth,
  title,
}: EditorialSectionHeaderProps) {
  return (
    <Box
      data-testid={testId}
      sx={{
        alignItems: { md: 'start' },
        display: 'grid',
        gap: { xs: 3, md: 8 },
        gridTemplateColumns:
          layout === 'single'
            ? 'minmax(0, 1fr)'
            : { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.9fr) minmax(18rem, 1.1fr)' },
        minWidth: 0,
      }}
    >
      <Stack
        data-testid={testId ? `${testId}-heading` : undefined}
        spacing={4}
        sx={{ minWidth: 0 }}
      >
        <Typography sx={{ letterSpacing: 0 }} variant="overline">
          {eyebrow}
        </Typography>
        <Typography
          component={headingLevel}
          id={id}
          sx={{
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' },
            lineHeight: { xs: 1.05, md: 1.08 },
            letterSpacing: 0,
            maxWidth: titleMaxWidth,
            overflowWrap: 'break-word',
            textWrap: 'balance',
          }}
          variant={headingLevel === 'h1' ? 'h1' : 'h2'}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            color="text.secondary"
            sx={{ fontSize: { sm: '1.6rem' }, fontWeight: 800, maxWidth: '66ch' }}
            variant="subtitle1"
          >
            {subtitle}
          </Typography>
        ) : null}
        {layout === 'single' ? (
          <Typography color="text.secondary" sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '66ch' }}>
            {description}
          </Typography>
        ) : null}
        {layout === 'single' ? supportingContent : null}
      </Stack>
      {layout === 'split' ? (
        <Stack
          data-testid={testId ? `${testId}-description` : undefined}
          spacing={2}
          sx={{ minWidth: 0, paddingBlockStart: { md: 3 } }}
        >
          <Typography color="text.secondary" sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '66ch' }}>
            {description}
          </Typography>
          {supportingContent}
          {asideContent}
        </Stack>
      ) : null}
    </Box>
  )
}
