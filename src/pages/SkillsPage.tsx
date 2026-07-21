import { Box, Chip, Stack, Typography } from '@mui/material'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { StudioCard } from '../components/surfaces/StudioCard'
import { usePortfolioContent } from '../content/context'
import { getSkillsPage } from '../content/loaders'
import { CompetenceReferences } from '../features/supporting-pages/CompetenceReferences'
import { EvidenceLinks } from '../features/supporting-pages/EvidenceLinks'
import { PopArtConversionSection } from '../features/supporting-pages/PopArtConversionSection'
import { SupportingPageIndex } from '../features/supporting-pages/SupportingPageIndex'
import { SupportingPageCta } from '../features/supporting-pages/SupportingPageCtas'

const groupColors = ['info', 'secondary', 'primary', 'warning'] as const

export function SkillsPage() {
  const { language } = usePortfolioContent()
  const page = getSkillsPage(language)

  return (
    <>
      <PageSection aria-labelledby="skills-page-title" spacing="spacious">
        <PageContainer>
          <Stack spacing={4}>
            <EditorialSectionHeader
              description={page.hero.description}
              eyebrow={page.hero.eyebrow}
              headingLevel="h1"
              id="skills-page-title"
              asideContent={
                <StudioCard
                  component="aside"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                    p: { xs: 2.5, md: 4 },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="overline">{page.labels.groupsTitle}</Typography>
                    {page.groups.map((group) => (
                      <Typography
                        component="a"
                        href={`#skills-group-title-${group.id}`}
                        key={group.id}
                        sx={{ color: 'inherit', fontWeight: 900 }}
                      >
                        {group.title}
                      </Typography>
                    ))}
                  </Stack>
                </StudioCard>
              }
              title={page.hero.title}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <SupportingPageCta
                cta={page.hero.primaryCta}
                language={language}
                emphasis="primary"
              />
              <SupportingPageCta cta={page.hero.secondaryCta} emphasis="link" language={language} />
            </Stack>
          </Stack>
          <SupportingPageIndex
            items={[
              { href: '#skills-groups-title', label: page.labels.groupsIndexLabel },
              { href: '#skills-evidence', label: page.labels.evidenceIndexLabel },
              { href: '#skills-closing-title', label: page.labels.contactIndexLabel },
            ]}
            label={page.labels.pageIndexLabel}
          />
        </PageContainer>
      </PageSection>

      <PageSection aria-labelledby="skills-groups-title" id="skills-evidence" spacing="regular">
        <PageContainer>
          <Typography component="h2" id="skills-groups-title" sx={{ mb: 4 }} variant="h3">
            {page.labels.groupsTitle}
          </Typography>
        </PageContainer>
      </PageSection>

      {page.groups.map((group, index) => (
        <PageSection
          aria-labelledby={`skills-group-title-${group.id}`}
          data-testid={`skills-group-section-${group.id}`}
          key={group.id}
          spacing="spacious"
          sx={(theme) => {
            const palette = theme.palette[groupColors[index % groupColors.length] ?? 'info']
            return {
              backgroundColor: palette.main,
              color: palette.contrastText,
              backgroundImage:
                'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)',
              backgroundSize: '18px 18px',
            }
          }}
        >
          <PageContainer>
            <StudioCard
              aria-labelledby={`skills-group-title-${group.id}`}
              component="article"
              sx={{ p: { xs: 3, md: 6 } }}
            >
              <Stack spacing={2.5}>
                <Typography component="h2" id={`skills-group-title-${group.id}`} variant="h3">
                  {group.title}
                </Typography>
                <Typography color="secondary.main" sx={{ fontWeight: 900 }} variant="h5">
                  {group.problem}
                </Typography>
                <Typography color="text.secondary">{group.description}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {group.tools.map((tool) => (
                    <Chip
                      key={`${group.id}-${tool}`}
                      label={tool}
                      size="small"
                      sx={{ fontWeight: 800 }}
                      variant="outlined"
                    />
                  ))}
                </Box>
                <EvidenceLinks
                  evidence={group.evidence}
                  heading={group.id}
                  language={language}
                  title={page.labels.evidenceTitle}
                />
                <CompetenceReferences
                  language={language}
                  references={group.references}
                  title={page.labels.referencesTitle}
                />
                <SupportingPageCta cta={group.cta} language={language} />
              </Stack>
            </StudioCard>
          </PageContainer>
        </PageSection>
      ))}

      <PopArtConversionSection
        description={page.closing.description}
        id="skills-closing-title"
        language={language}
        primaryCta={page.closing.primaryCta}
        secondaryCta={page.closing.secondaryCta}
        title={page.closing.title}
      />
    </>
  )
}
