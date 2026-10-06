import { Box, Stack, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import { MethodPageContainer } from './MethodPageContainer'

type MethodPrinciple = {
  id: string
  number: string
  title: string
  description: string
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
  return (
    <PageSection
      aria-labelledby={`method-principle-${principle.id}-title`}
      data-testid={`method-principle-${principle.id}`}
      id={`method-principle-${principle.id}`}
      spacing="regular"
      sx={(theme) => ({
        backgroundColor:
          index % 2 === 0 ? theme.palette.background.default : theme.palette.background.paper,
        backgroundImage: index % 2 === 1 ? theme.digitalStudio.patterns.diagonal : null,
      })}
    >
      <MethodPageContainer>
        <Box
          component="article"
          sx={{
            alignItems: 'center',
            display: 'grid',
            gap: { xs: 3, md: 8 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.5fr) minmax(16rem, 0.75fr)' },
          }}
        >
          <Stack spacing={1.5} sx={{ maxWidth: '68ch' }}>
            <Typography color="secondary.main" sx={{ fontWeight: 900 }} variant="overline">
              {principle.number}
            </Typography>
            <Typography component="h2" id={`method-principle-${principle.id}-title`} variant="h3">
              {principle.title}
            </Typography>
            <Typography sx={{ fontSize: { sm: '1.05rem' } }}>{principle.description}</Typography>
          </Stack>
          <Box
            sx={(theme) => ({
              borderInlineStart: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.palette.secondary.main}`,
              p: { xs: 2, sm: 3 },
            })}
          >
            <Typography color="text.secondary" sx={{ fontWeight: 900 }} variant="overline">
              {outputLabel}
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>{principle.output}</Typography>
          </Box>
        </Box>
      </MethodPageContainer>
    </PageSection>
  )
}
