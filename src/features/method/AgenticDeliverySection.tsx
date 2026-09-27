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

type AgenticExample = {
  title: string
  intentLabel: string
  intent: string
  executionLabel: string
  execution: string
  resultLabel: string
  result: string
}

type AgenticDeliverySectionProps = {
  eyebrow: string
  title: string
  subtitle: string
  responseLabel: string
  paragraphs: string[]
  example: AgenticExample
  concepts: AgenticConcept[]
  workflow: string[]
  workflowDescriptions: string[]
  workflowTitle: string
  closing: string
  resource: Parameters<typeof MethodResourceLinks>[0]['resources'][number]
  resourceTitle: string
  language: Language
}

export function AgenticDeliverySection({
  closing,
  concepts,
  example,
  eyebrow,
  language,
  paragraphs,
  resource,
  resourceTitle,
  responseLabel,
  subtitle,
  title,
  workflow,
  workflowDescriptions,
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
            <Typography
              sx={(theme) => ({ color: theme.palette.warning.contrastText })}
              variant="overline"
            >
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
            component="section"
            aria-labelledby="method-agentic-example-title"
            data-testid="method-agentic-example"
            sx={{ gridColumn: '1 / -1', maxWidth: '80ch' }}
          >
            <Typography component="h3" id="method-agentic-example-title" variant="h4">
              {example.title}
            </Typography>
            <Stack component="dl" spacing={2} sx={{ m: 0, mt: 2 }}>
              {[
                [example.intentLabel, example.intent],
                [example.executionLabel, example.execution],
                [example.resultLabel, example.result],
              ].map(([label, description]) => (
                <Box component="div" key={label}>
                  <Typography component="dt" sx={{ fontWeight: 900 }}>
                    {label}
                  </Typography>
                  <Typography component="dd" sx={{ m: 0 }}>
                    {description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box
            component="ol"
            data-testid="method-agentic-workflow-descriptions"
            sx={{ gridColumn: '1 / -1', m: 0, pl: 3 }}
          >
            {workflow.map((step, index) => (
              <Box component="li" key={step} sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: 900 }}>
                  {step}:{' '}
                </Typography>
                <Typography component="span">{workflowDescriptions[index]}</Typography>
              </Box>
            ))}
          </Box>
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
