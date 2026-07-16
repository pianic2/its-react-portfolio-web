import { Stack, Typography } from '@mui/material'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { ButtonLink, ExternalButtonLink, ExternalLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { ProjectShowcase } from '../features/projects/components/ProjectShowcase'

export function HomePage() {
  const { language, portfolio } = usePortfolioContent()

  return (
    <>
      <PageSection aria-labelledby="home-page-title" spacing="spacious">
        <PageContainer>
          <Stack spacing={{ xs: 3, sm: 4 }} sx={{ maxWidth: '72rem', minWidth: 0 }}>
            <Stack spacing={3} sx={{ maxWidth: '66rem', minWidth: 0 }}>
              <Typography sx={{ letterSpacing: 0 }} variant="overline">
                {portfolio.eyebrow}
              </Typography>
              <Typography
                component="h1"
                id="home-page-title"
                sx={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.75rem)',
                  letterSpacing: 0,
                  maxWidth: '15ch',
                  overflowWrap: 'normal',
                }}
                variant="h1"
              >
                {portfolio.headline}
              </Typography>
              <Typography sx={{ fontSize: { sm: '1.2rem' }, maxWidth: '62ch' }}>
                {portfolio.introduction}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: '68ch' }}>
                {portfolio.training.prefix}
                <ExternalLink
                  href={portfolio.training.url}
                  language={language}
                  newTab
                  sx={{ fontWeight: 900 }}
                >
                  {portfolio.training.linkLabel}
                </ExternalLink>
                {portfolio.training.suffix}
              </Typography>
            </Stack>
            <Stack
              data-testid="home-hero-actions"
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ alignItems: { sm: 'center' }, flexWrap: 'wrap', gap: 2, minWidth: 0 }}
            >
              {portfolio.primaryCta.kind === 'internal' ? (
                <ButtonLink
                  sx={{ minHeight: 44, width: { xs: '100%', sm: 'auto' } }}
                  to={portfolio.primaryCta.href}
                  variant="contained"
                >
                  {portfolio.primaryCta.label}
                </ButtonLink>
              ) : null}
              {portfolio.secondaryCta.kind === 'external' ? (
                <ExternalButtonLink
                  endIcon={<OpenInNewRounded aria-hidden="true" />}
                  href={portfolio.secondaryCta.href}
                  language={language}
                  newTab
                  sx={{ minHeight: 44, width: { xs: '100%', sm: 'auto' } }}
                  variant="outlined"
                >
                  {portfolio.secondaryCta.label}
                </ExternalButtonLink>
              ) : null}
              {portfolio.contactCta.kind === 'internal' ? (
                <ButtonLink
                  sx={{ minHeight: 44, width: { xs: '100%', sm: 'auto' } }}
                  to={portfolio.contactCta.href}
                  variant="text"
                >
                  {portfolio.contactCta.label}
                </ButtonLink>
              ) : null}
            </Stack>
          </Stack>
        </PageContainer>
      </PageSection>
      <ProjectShowcase variant="home" />
    </>
  )
}
