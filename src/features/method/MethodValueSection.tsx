import { Box, Stack, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import { MethodPageContainer } from './MethodPageContainer'

type MethodValue = {
  eyebrow: string
  title: string
  introduction: string
  items: string[]
  closing: string
}

type MethodValueSectionProps = {
  value: MethodValue
}

export function MethodValueSection({ value }: MethodValueSectionProps) {
  return (
    <PageSection
      aria-labelledby="method-value-title"
      data-testid="method-value"
      id="method-value"
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor: theme.digitalStudio.colors.surfaceStrong,
        backgroundImage: theme.digitalStudio.patterns.diagonal,
      })}
    >
      <MethodPageContainer>
        <Stack spacing={5}>
          <Box sx={{ maxWidth: '72ch' }}>
            <Stack spacing={2.5}>
              <Typography variant="overline">{value.eyebrow}</Typography>
              <Typography component="h2" id="method-value-title" variant="h2">
                {value.title}
              </Typography>
              <Typography sx={{ fontSize: { sm: '1.1rem' } }}>{value.introduction}</Typography>
            </Stack>
          </Box>
          <Box
            component="ol"
            sx={(theme) => ({
              display: 'grid',
              gap: { xs: 0, md: 1 },
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              listStyle: 'none',
              m: 0,
              p: 0,
              '& li': {
                borderBlockStart: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'auto 1fr',
                py: 2.5,
              },
            })}
          >
            {value.items.map((item, index) => (
              <Box component="li" key={item}>
                <Typography aria-hidden="true" color="secondary.main" sx={{ fontWeight: 900 }}>
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography sx={{ fontWeight: 800 }}>{item}</Typography>
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontWeight: 900, maxWidth: '62ch' }}>{value.closing}</Typography>
        </Stack>
      </MethodPageContainer>
    </PageSection>
  )
}
