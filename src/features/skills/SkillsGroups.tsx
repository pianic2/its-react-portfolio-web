import { Box, Chip, Stack, Typography } from '@mui/material'
import type { Language } from '../../routes/routeConfig'
import { StudioMotionCard } from '../../components/surfaces/StudioMotionCard'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { CompetenceReferences } from '../supporting-pages/CompetenceReferences'
import { EvidenceLinks } from '../supporting-pages/EvidenceLinks'
import { SupportingPageCta } from '../supporting-pages/SupportingPageCtas'
import type { getSkillsPage } from '../../content/loaders'
import { Icon } from '@iconify/react/dist/iconify.js'

type SkillsPageContent = ReturnType<typeof getSkillsPage>

type SkillsGroupsProps = {
  groups: SkillsPageContent['groups']
  labels: SkillsPageContent['labels']
  language: Language
}

export function SkillsGroups({ groups, labels, language }: SkillsGroupsProps) {
  return (
    <>
      {groups.map((group, index) => (
        <PageSection
          aria-labelledby={`skills-group-title-${group.id}`}
          data-testid={`skills-group-section-${group.id}`}
          key={group.id}
          spacing="spacious"
          sx={(theme) => {
            return {
              backgroundColor:
                index % 2 === 0
                  ? theme.digitalStudio.colors.surface
                  : theme.digitalStudio.colors.surfaceStrong,
              color:
                index % 2 === 0
                  ? theme.digitalStudio.colors.text
                  : theme.digitalStudio.colors.textMuted,
              backgroundImage: index % 2 === 0 ? theme.digitalStudio.patterns.halftone : null,
              backgroundSize: '18px 18px',
            }
          }}
        >
          <PageContainer>
            <Box component="section">
              <Stack spacing={{ xs: 4, md: 6 }}>
                <Typography component="h2" id={`skills-group-title-${group.id}`} variant="h2">
                  {group.title}
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gap: 8,
                    gridTemplateColumns: {
                      xs: 'repeat(auto-fill, minmax(240px, 1fr))',
                      sm: 'repeat(auto-fill, minmax(300px, 1fr))',
                      md: 'repeat(auto-fill, minmax(360px, 1fr))',
                    },
                  }}
                >
                  <Stack
                    spacing={{ xs: 4, md: 6 }}
                    sx={{ order: { md: index % 2 === 0 ? 1 : -1 } }}
                  >
                    <StudioMotionCard
                      component="section"
                      rotation={index % 2 === 0 ? 1 : -1}
                      sx={(theme) => ({
                        textAlign: 'center',
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        p: { xs: 4, md: 6 },
                      })}
                    >
                      <Typography
                        sx={{ fontWeight: 900, lineHeight: 1.25, textWrap: 'balance' }}
                        variant="h6"
                      >
                        {group.problem}
                      </Typography>
                    </StudioMotionCard>
                    <EvidenceLinks
                      evidence={group.evidence}
                      heading={group.id}
                      language={language}
                      title={group.evidenceTitle}
                      variant="default"
                    />
                    <CompetenceReferences
                      language={language}
                      references={group.references}
                      title={labels.referencesTitle}
                    />
                  </Stack>

                  <Stack spacing={{ xs: 4, md: 6 }}>
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: 'clamp(1rem, 0.94rem + 0.25vw, 1.16rem)',
                        lineHeight: 1.65,
                        maxWidth: '65ch',
                      }}
                    >
                      {group.description}
                    </Typography>
                    <Box
                      aria-label={
                        language === 'it' ? 'Tecnologie di supporto' : 'Supporting technologies'
                      }
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, md: 1.25 } }}
                    >
                      {group.tools.map((tool) => (
                        <Chip
                          key={`${group.id}-${tool}`}
                          icon={
                            <Icon icon={`devicon:${tool.toLowerCase().replace(/\s+/g, '-')}`} />
                          }
                          label={tool}
                          size="small"
                          sx={{ fontWeight: 800, minHeight: 36, px: 3 }}
                          variant="filled"
                        />
                      ))}
                    </Box>

                    <SupportingPageCta cta={group.cta} fullWidth language={language} />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </PageContainer>
        </PageSection>
      ))}
    </>
  )
}
