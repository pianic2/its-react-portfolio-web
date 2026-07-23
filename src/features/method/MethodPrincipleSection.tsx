import { Box, Stack, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import { MethodPageContainer } from './MethodPageContainer'

type MethodPrinciple = {
  id: string
  number: string
  question: string
  title: string
  description: string
  activities: string[]
  output: string
}

type MethodPrincipleSectionProps = {
  index: number
  principle: MethodPrinciple
  outputLabel: string
}

export function MethodPrincipleSection({
  index,
  outputLabel,
  principle,
}: MethodPrincipleSectionProps) {
  const reverse = index % 2 === 1

  return (
    <PageSection
      aria-labelledby={`method-principle-${principle.id}-title`}
      data-testid={`method-principle-${principle.id}`}
      id={`method-principle-${principle.id}`}
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor:
          index % 2 === 0 ? theme.palette.background.default : theme.palette.background.paper,
        position: 'relative',
        backgroundImage: index % 2 === 1 ? theme.digitalStudio.patterns.diagonal : null,
        backgroundSize: index % 2 === 0 ? '20px 20px' : undefined,
      })}
    >
      <MethodPageContainer>
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: {
              xs: '1fr',
              md: reverse ? 'minmax(0, 1fr) minmax(0, 1.5fr)' : 'minmax(0, 1.5fr) minmax(0, 1fr)',
            },
          }}
        >
          <Stack spacing={2.5} sx={{ order: { xs: 1, md: reverse ? 2 : 1 }, maxWidth: '68ch' }}>
            <Typography
              aria-hidden="true"
              color="secondary.main"
              sx={{ fontWeight: 900 }}
              variant="h3"
            >
              {principle.number}
            </Typography>
            <Typography component="p" color="text.secondary" sx={{ fontWeight: 700 }} variant="h6">
              {principle.question}
            </Typography>
            <Typography component="h2" id={`method-principle-${principle.id}-title`} variant="h3">
              {principle.title}
            </Typography>
            <Typography sx={{ fontSize: { sm: '1.1rem' } }}>{principle.description}</Typography>
          </Stack>
          <Stack spacing={3} sx={{ order: { xs: 2, md: reverse ? 1 : 2 } }}>
            <Box
              data-motion-sensitive="true"
              sx={(theme) => ({
                backgroundColor:
                  index === 0
                    ? theme.palette.warning.main
                    : index === 1
                      ? theme.palette.info.main
                      : index === 2
                        ? theme.palette.secondary.main
                        : index === 3
                          ? theme.palette.success.main
                          : index === 4
                            ? theme.digitalStudio.colors.surface
                            : theme.palette.error.main,
                color:
                  index === 0
                    ? theme.palette.warning.contrastText
                    : index === 1
                      ? theme.palette.info.contrastText
                      : index === 2
                        ? theme.palette.secondary.contrastText
                        : index === 3
                          ? theme.palette.success.contrastText
                          : index === 4
                            ? theme.palette.getContrastText(theme.digitalStudio.colors.surface)
                            : theme.palette.error.contrastText,
                border: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                borderRadius: `${theme.digitalStudio.radii.lg}px`,
                boxShadow: theme.digitalStudio.shadows.medium,
                marginBlockEnd: `${theme.digitalStudio.shadowOffsets.large}px`,
                marginInlineEnd: `${theme.digitalStudio.shadowOffsets.large}px`,
                p: 6,
                textAlign: 'center',
                transition: theme.transitions.create(['box-shadow', 'transform'], {
                  duration: theme.transitions.duration.standard,
                  easing: theme.transitions.easing.easeIn,
                }),
                '&:hover': {
                  boxShadow: theme.digitalStudio.shadows.small,
                  transform: `translate(${theme.digitalStudio.shadowOffsets.medium}px, ${theme.digitalStudio.shadowOffsets.medium}px) rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                  '&:hover': { transform: 'none' },
                },
              })}
            >
              <Typography variant="overline" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                {outputLabel}
              </Typography>
              <Typography sx={{ fontWeight: 900 }}>{principle.output}</Typography>
            </Box>
          </Stack>
        </Box>
      </MethodPageContainer>
    </PageSection>
  )
}
