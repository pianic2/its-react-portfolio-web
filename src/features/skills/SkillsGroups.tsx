import { Box, Chip, Stack, Typography } from '@mui/material'
import type { Language } from '../../routes/routeConfig'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { CompetenceReferences } from '../supporting-pages/CompetenceReferences'
import { EvidenceLinks } from '../supporting-pages/EvidenceLinks'
import { SupportingPageCta } from '../supporting-pages/SupportingPageCtas'
import type { getSkillsPage } from '../../content/loaders'

type SkillsPageContent = ReturnType<typeof getSkillsPage>

type SkillsGroupsProps = {
  groups: SkillsPageContent['groups']
  labels: SkillsPageContent['labels']
  language: Language
}

export function SkillsGroups({ groups, labels, language }: SkillsGroupsProps) {
  return (
    <PageSection
      aria-labelledby="skills-groups-title"
      data-testid="skills-groups"
      spacing="spacious"
    >
      <PageContainer>
        <Stack spacing={4}>
          <Typography component="h2" id="skills-groups-title" variant="h2">
            {labels.groupsTitle}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 3, lg: 4 },
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            {groups.map((group) => (
              <Box
                aria-labelledby={`skills-group-title-${group.id}`}
                component="article"
                data-testid={`skills-group-section-${group.id}`}
                key={group.id}
                sx={(theme) => ({
                  backgroundColor: theme.digitalStudio.colors.surface,
                  border: `${theme.digitalStudio.borderWidths.regular}px solid ${theme.digitalStudio.colors.border}`,
                  boxShadow: theme.digitalStudio.shadows.small,
                  minWidth: 0,
                  p: { xs: 3, md: 4 },
                })}
              >
                <Stack spacing={2.5}>
                  <Typography component="h3" id={`skills-group-title-${group.id}`} variant="h4">
                    {group.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ maxWidth: '65ch' }}>
                    {group.description}
                  </Typography>
                  <Box
                    aria-label={
                      language === 'it' ? 'Tecnologie e pratiche' : 'Technologies and practices'
                    }
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                  >
                    {group.tools.map((tool) => (
                      <Chip
                        key={`${group.id}-${tool}`}
                        label={tool}
                        size="small"
                        sx={{ fontWeight: 800, minHeight: 36, px: 2 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <EvidenceLinks
                    evidence={group.evidence}
                    heading={group.id}
                    language={language}
                    title={group.evidenceTitle}
                  />
                  <CompetenceReferences
                    language={language}
                    references={group.references}
                    title={labels.referencesTitle}
                  />
                  <SupportingPageCta cta={group.cta} fullWidth language={language} />
                </Stack>
              </Box>
            ))}
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
