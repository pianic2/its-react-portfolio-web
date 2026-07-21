import { Box, Stack, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import type { Language } from '../../routes/routeConfig'
import { MethodResourceLinks } from './MethodResourceLinks'
import { MethodFlowDiagram } from './MethodFlowDiagram'
import { MethodPageContainer } from './MethodPageContainer'

type AgenticConcept = {
  id: string
  title: string
  description: string
}

type AgenticDeliverySectionProps = {
  eyebrow: string
  title: string
  subtitle: string
  responseLabel: string
  paragraphs: string[]
  concepts: AgenticConcept[]
  workflow: string[]
  workflowTitle: string
  closing: string
  resource: Parameters<typeof MethodResourceLinks>[0]['resources'][number]
  resourceTitle: string
  language: Language
}

export function AgenticDeliverySection({
  closing,
  concepts,
  eyebrow,
  language,
  paragraphs,
  resource,
  resourceTitle,
  responseLabel,
  subtitle,
  title,
  workflow,
  workflowTitle,
}: AgenticDeliverySectionProps) {
  return (
    <PageSection
      aria-labelledby="method-agentic-title"
      data-testid="method-agentic"
      id="method-agentic"
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor: theme.digitalStudio.colors.surface,
        backgroundImage: theme.digitalStudio.patterns.halftone,
      })}
    >
      <MethodPageContainer>
        <Stack spacing={5} sx={{ display: 'grid', gap: 3, gridTemplateColumns: { md: '1fr 1fr' } }}>
          <Box>
            <Stack spacing={2.5}>
              <Typography variant="overline">{eyebrow}</Typography>
              <Typography component="h2" id="method-agentic-title" variant="h2">
                {title}
              </Typography>
              <Typography component="h3" variant="h6">
                {subtitle}
              </Typography>
              {paragraphs.map((paragraph) => (
                <Typography key={paragraph} sx={{ fontSize: { sm: '1.1rem' } }}>
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Box>
          <Stack spacing={3}>
            <Typography color="warning.main" variant="overline">
              {responseLabel}
            </Typography>
            <Stack
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
              }}
              spacing={4}
            >
              {concepts.map((concept, index) => (
                <Box
                  component="li"
                  data-testid={`method-agentic-concept-${concept.id}`}
                  key={concept.id}
                  sx={(theme) => ({
                    borderBlockStart: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                    gridColumn: { md: index === concepts.length - 1 ? '1 / -1' : 'auto' },
                    maxWidth: { md: index === concepts.length - 1 ? '50%' : undefined },
                    p: { xs: 2.5, md: 3 },
                  })}
                >
                  <Stack spacing={1}>
                    <Typography component="h3" variant="h4">
                      {concept.title}
                    </Typography>
                    <Typography>{concept.description}</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
          <MethodFlowDiagram labels={workflow} testId="method-agentic-flow" title={workflowTitle} />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.warning.main,
              color: theme.palette.warning.contrastText,
              maxWidth: '70ch',
              p: { xs: 2.5, md: 3 },
            })}
          >
            <Typography sx={{ fontWeight: 900 }}>{closing}</Typography>
          </Box>
          <MethodResourceLinks
            id="method-agentic-resource"
            language={language}
            resources={[resource]}
            title={resourceTitle}
          />
        </Stack>
      </MethodPageContainer>
    </PageSection>
  )
}
