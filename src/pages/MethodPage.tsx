import { Stack } from '@mui/material'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { getMethodPage } from '../content/loaders'
import { AgenticDeliverySection } from '../features/method/AgenticDeliverySection'
import { MethodCaseStudySection } from '../features/method/MethodCaseStudySection'
import { MethodFoundationsSection } from '../features/method/MethodFoundationsSection'
import { MethodPageContainer } from '../features/method/MethodPageContainer'
import { MethodPrincipleSection } from '../features/method/MethodPrincipleSection'
import { MethodToolsSection } from '../features/method/MethodToolsSection'
import { MethodValueSection } from '../features/method/MethodValueSection'
import { PopArtConversionSection } from '../features/supporting-pages/PopArtConversionSection'
import { SupportingPageCta } from '../features/supporting-pages/SupportingPageCtas'

export function MethodPage() {
  const { language } = usePortfolioContent()
  const page = getMethodPage(language)

  return (
    <>
      <PageSection
        aria-labelledby="method-page-title"
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
        <MethodPageContainer>
          <Stack spacing={8}>
            <EditorialSectionHeader
              description={page.hero.description}
              eyebrow={page.hero.eyebrow}
              headingLevel="h1"
              id="method-page-title"
              layout="single"
              subtitle={page.hero.subtitle}
              title={page.hero.title}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <SupportingPageCta
                cta={page.hero.primaryCta}
                emphasis="primary"
                language={language}
              />
              <SupportingPageCta
                cta={page.hero.secondaryCta}
                emphasis="secondary"
                language={language}
              />
            </Stack>
          </Stack>
        </MethodPageContainer>
      </PageSection>

      <MethodFoundationsSection
        foundation={page.foundations}
        language={language}
        resourcesTitle={page.labels.resourcesTitle}
      />

      {page.principles.map((principle, index) => (
        <MethodPrincipleSection
          index={index}
          key={principle.id}
          outputLabel={page.labels.outputLabel}
          principle={principle}
        />
      ))}

      <MethodValueSection value={page.value} />

      <MethodToolsSection
        closing={page.tools.closing}
        eyebrow={page.tools.eyebrow}
        introduction={page.tools.introduction}
        language={language}
        title={page.tools.title}
        tools={page.tools.items}
      />

      {page.examples.map((example, index) => (
        <MethodCaseStudySection
          caseStudy={example}
          decisionLabel={page.labels.decisionLabel}
          evidenceTitle={page.labels.evidenceTitle}
          key={example.id}
          index={index}
          language={language}
          resultLabel={page.labels.resultLabel}
        />
      ))}

      <AgenticDeliverySection
        closing={page.agenticDelivery.closing}
        concepts={page.agenticDelivery.concepts}
        eyebrow={page.agenticDelivery.eyebrow}
        language={language}
        paragraphs={page.agenticDelivery.paragraphs}
        resource={page.agenticDelivery.resource}
        resourceTitle={page.agenticDelivery.resourceTitle}
        responseLabel={page.agenticDelivery.responseLabel}
        subtitle={page.agenticDelivery.subtitle}
        title={page.agenticDelivery.title}
        workflow={page.agenticDelivery.workflow}
        workflowTitle={page.agenticDelivery.workflowTitle}
      />

      <PopArtConversionSection
        description={page.closing.description}
        id="method-closing-title"
        language={language}
        primaryCta={page.closing.primaryCta}
        secondaryCta={page.closing.secondaryCta}
        microcopy={page.closing.microcopy}
        containerMaxWidth={1280}
        title={page.closing.title}
      />
    </>
  )
}
