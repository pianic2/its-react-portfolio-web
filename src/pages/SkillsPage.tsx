import { Stack } from '@mui/material'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { getSkillsPage } from '../content/loaders'
import { PopArtConversionSection } from '../features/supporting-pages/PopArtConversionSection'
import { SupportingPageCta } from '../features/supporting-pages/SupportingPageCtas'
import { SkillsGroups } from '../features/skills/SkillsGroups'

export function SkillsPage() {
  const { language } = usePortfolioContent()
  const page = getSkillsPage(language)

  return (
    <>
      <PageSection
        aria-labelledby="skills-page-title"
        spacing="spacious"
        sx={{
          paddingBlockEnd: 'clamp(88px, 10vw, 144px)',
          paddingBlockStart: 'clamp(112px, 14vw, 176px)',
          minHeight: '50vh',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <PageContainer sx={{ maxInlineSize: { lg: 1440 } }}>
          <Stack spacing={{ xs: 5, md: 7 }}>
            <EditorialSectionHeader
              description={page.hero.description}
              eyebrow={page.hero.eyebrow}
              headingLevel="h1"
              id="skills-page-title"
              title={page.hero.title}
              layout="single"
            />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2.5}
              sx={{
                '& > a, & > button': {
                  minHeight: 52,
                  width: { xs: '100%', sm: 'auto' },
                },
              }}
            >
              <SupportingPageCta
                cta={page.hero.primaryCta}
                language={language}
                emphasis="primary"
              />
              <SupportingPageCta
                cta={page.hero.secondaryCta}
                emphasis="secondary"
                language={language}
              />
            </Stack>
          </Stack>
        </PageContainer>
      </PageSection>

      <SkillsGroups groups={page.groups} labels={page.labels} language={language} />

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
