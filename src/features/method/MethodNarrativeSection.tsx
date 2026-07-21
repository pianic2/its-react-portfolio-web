import { Box, CardContent, Chip, Stack, Typography } from '@mui/material'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { StudioCard } from '../../components/surfaces/StudioCard'

type MethodNarrativeSectionProps = {
  eyebrow: string
  title: string
  paragraphs: string[]
  closing: string
  id: string
  tone?: 'canvas' | 'strong'
}

export function MethodNarrativeSection({
  closing,
  eyebrow,
  id,
  paragraphs,
  title,
  tone = 'canvas',
}: MethodNarrativeSectionProps) {
  return (
    <PageSection
      aria-labelledby={`${id}-title`}
      data-testid={id}
      id={id}
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor:
          tone === 'strong'
            ? theme.digitalStudio.colors.surfaceStrong
            : theme.palette.background.default,
        backgroundImage: tone === 'strong' ? theme.digitalStudio.patterns.halftone : undefined,
        backgroundSize: '18px 18px',
      })}
    >
      <PageContainer>
        <StudioCard variant="featured">
          <CardContent
            sx={(theme) => ({
              overflow: 'hidden',
              p: { xs: 3, sm: 5, md: 7 },
              position: 'relative',
              '&:last-child': { pb: { xs: 3, sm: 5, md: 7 } },
              '&::before': {
                backgroundImage: theme.digitalStudio.patterns.halftone,
                backgroundRepeat: 'repeat',
                backgroundSize: '18px 18px',
                content: '""',
                inset: 0,
                opacity: 0.14,
                pointerEvents: 'none',
                position: 'absolute',
              },
            })}
          >
            <Stack spacing={3.5} sx={{ maxWidth: '70ch', position: 'relative' }}>
              <Chip
                color={tone === 'strong' ? 'warning' : 'info'}
                label={eyebrow}
                sx={{ alignSelf: 'flex-start' }}
              />
              <Typography component="h2" id={`${id}-title`} variant="h2">
                {title}
              </Typography>
              {paragraphs.map((paragraph) => (
                <Typography key={paragraph} sx={{ fontSize: { sm: '1.1rem' } }}>
                  {paragraph}
                </Typography>
              ))}
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.palette.warning.main,
                  color: theme.palette.warning.contrastText,
                  p: { xs: 2.5, md: 3 },
                  transform: { sm: 'translateX(1rem) rotate(-1deg)' },
                })}
              >
                <Typography sx={{ fontWeight: 900 }}>{closing}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </StudioCard>
      </PageContainer>
    </PageSection>
  )
}
