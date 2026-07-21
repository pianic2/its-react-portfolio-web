import { Box, Stack, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import type { Language } from '../../routes/routeConfig'
import { EvidenceLinks } from '../supporting-pages/EvidenceLinks'
import { SupportingPageCta } from '../supporting-pages/SupportingPageCtas'
import { MethodPageContainer } from './MethodPageContainer'

type MethodCaseStudy = {
  id: string
  eyebrow: string
  title: string
  body: string
  decision: string
  result: string
  evidence: Array<{
    evidenceId: string
    label: string
    description: string
    url: string
  }>
  cta: {
    kind: 'internal' | 'external' | 'anchor'
    label: string
    href: string
    analyticsId?: string | undefined
  }
  diagram?:
    | {
        kind: 'quality-pipeline' | 'content-contract'
        labels: string[]
        title: string
      }
    | undefined
}

type MethodCaseStudySectionProps = {
  caseStudy: MethodCaseStudy
  decisionLabel: string
  evidenceTitle: string
  language: Language
  resultLabel: string
  index: number
}

export function MethodCaseStudySection({
  caseStudy,
  decisionLabel,
  evidenceTitle,
  language,
  resultLabel,
  index,
}: MethodCaseStudySectionProps) {
  const contentContract = caseStudy.diagram?.kind === 'content-contract'
  const qualityPipeline = caseStudy.diagram?.kind === 'quality-pipeline'

  return (
    <PageSection
      aria-labelledby={`method-case-title-${caseStudy.id}`}
      data-testid={`method-case-${caseStudy.id}`}
      id={`method-case-${caseStudy.id}`}
      sx={(theme) => ({
        backgroundColor:
          index % 2 === 0 ? theme.digitalStudio.colors.canvas : theme.palette.background.paper,
        backgroundImage: index % 2 === 1 ? theme.digitalStudio.patterns.halftone : null,
        backgroundSize: qualityPipeline ? undefined : '20px 20px',
      })}
    >
      <MethodPageContainer>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 12 },
            gridTemplateColumns: contentContract
              ? 'minmax(0, 1fr)'
              : {
                  xs: '1fr',
                  md:
                    index % 2 === 0
                      ? 'minmax(0, 1.5fr) minmax(0, 1fr)'
                      : 'minmax(0, 1fr) minmax(0, 1.5fr)',
                },
          }}
        >
          <Stack
            spacing={2.5}
            sx={{ maxWidth: '68ch', order: { xs: 1, md: index % 2 === 0 ? 0 : 1 } }}
          >
            <Typography variant="overline">{caseStudy.eyebrow}</Typography>
            <Typography component="h2" id={`method-case-title-${caseStudy.id}`} variant="h3">
              {caseStudy.title}
            </Typography>
            <Typography sx={{ fontSize: { sm: '1.1rem' } }}>{caseStudy.body}</Typography>
            <Typography variant="overline">{decisionLabel}</Typography>
            <Typography>{caseStudy.decision}</Typography>
          </Stack>
          <Stack
            spacing={{ sm: 6, md: 8 }}
            sx={{
              alignSelf: 'start',
              gridColumn: contentContract ? { md: '1 / -1' } : undefined,
              order: contentContract ? { xs: 3, md: 3 } : undefined,
            }}
          >
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
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
              <Typography variant="overline">{resultLabel}</Typography>
              <Typography sx={{ fontWeight: 900 }}>{caseStudy.result}</Typography>
            </Box>
            <EvidenceLinks
              evidence={caseStudy.evidence}
              heading={caseStudy.id}
              language={language}
              title={evidenceTitle}
            />
            <SupportingPageCta cta={caseStudy.cta} emphasis="primary" language={language} />
          </Stack>
        </Box>
      </MethodPageContainer>
    </PageSection>
  )
}
