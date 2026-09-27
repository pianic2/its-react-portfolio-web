import { ContactSection } from '../features/home/ContactSection'
import { HomeHero } from '../features/home/HomeHero'
import { LearningSection } from '../features/home/LearningSection'
import { ProcessSection } from '../features/home/ProcessSection'
import { SkillsSection } from '../features/home/SkillsSection'
import { ProjectShowcase } from '../features/projects/components/ProjectShowcase'

export function HomePage() {
  return (
    <>
      <HomeHero />
      <ProjectShowcase variant="home" />
      <SkillsSection variant="home" />
      <LearningSection />
      <ProcessSection />
      <ContactSection />
    </>
  )
}
