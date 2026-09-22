import { Box, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ButtonLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { getSiteContent } from '../content/loaders'
import { getRoutePath, type Language } from '../routes/routeConfig'

type NotFoundPageProps = {
  language?: Language
}

export function NotFoundPage({ language }: NotFoundPageProps) {
  const { pathname } = useLocation()
  const resolvedLanguage =
    language ?? (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it')
  const headingId = 'not-found-title'
  const page = getSiteContent(resolvedLanguage).notFoundPage

  return (
    <PageSection
      aria-labelledby={headingId}
      spacing="spacious"
      sx={{ alignItems: 'center', display: 'flex', minHeight: 'min(66vh, 44rem)' }}
    >
      <PageContainer>
        <Stack
          spacing={4}
          sx={{
            alignItems: 'center',
            marginInline: 'auto',
            maxWidth: '38rem',
            textAlign: 'center',
          }}
        >
          <NotFoundIllustration />
          <Typography component="h1" id={headingId} variant="h2">
            {page.title}
          </Typography>
          <Typography>{page.description}</Typography>
          <ButtonLink to={getRoutePath('home', resolvedLanguage)} variant="contained">
            {page.ctaLabel}
          </ButtonLink>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}

function NotFoundIllustration() {
  return (
    <Box
      aria-hidden="true"
      data-testid="not-found-illustration"
      sx={{ inlineSize: 'min(100%, 22rem)' }}
    >
      <svg
        focusable="false"
        height="auto"
        role="presentation"
        viewBox="0 0 360 180"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="currentColor" height="132" rx="24" width="348" x="6" y="24" />
        <rect
          fill="var(--mui-palette-background-paper)"
          height="108"
          rx="14"
          width="324"
          x="18"
          y="36"
        />
        <path
          d="M80 72h36v60H92v-32H72V88h8V72Zm68 0h40v12h12v36h-12v12h-40v-12h-12V84h12V72Zm12 12v36h16V84h-16Zm72-12h36v60h-24v-32h-20V88h8V72Z"
          fill="currentColor"
        />
        <circle cx="300" cy="60" fill="var(--mui-palette-secondary-main)" r="12" />
        <path
          d="M286 118h28"
          fill="none"
          stroke="var(--mui-palette-primary-main)"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
    </Box>
  )
}
