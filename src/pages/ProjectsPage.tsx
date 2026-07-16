import { Typography } from '@mui/material'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { ProjectComparison } from '../features/projects/components/ProjectComparison'
import { ProjectGuide } from '../features/projects/components/ProjectGuide'
import { ProjectJourneySection } from '../features/projects/components/ProjectJourneySection'
import { ProjectShowcase } from '../features/projects/components/ProjectShowcase'
import { ProjectsClosingSection } from '../features/projects/components/ProjectsClosingSection'

export function ProjectsPage() {
  const { siteContent } = usePortfolioContent()
  const hero = siteContent.projectsPage.hero
  return (
    <>
      <PageSection aria-labelledby="projects-page-title" spacing="spacious">
        <PageContainer>
          <EditorialSectionHeader
            description={hero.description}
            eyebrow={hero.eyebrow}
            headingLevel="h1"
            id="projects-page-title"
            supportingContent={
              <Typography sx={{ fontWeight: 800, maxWidth: '58ch' }}>
                {hero.supportingText}
              </Typography>
            }
            testId="projects-hero"
            title={hero.title}
          />
        </PageContainer>
      </PageSection>
      <ProjectGuide />
      <ProjectShowcase showHeader={false} variant="projects" />
      <ProjectComparison />
      <ProjectJourneySection />
      <ProjectsClosingSection />
    </>
  )
}
