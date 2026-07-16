import { Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ButtonLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { getRoutePath, type Language } from '../routes/routeConfig'

type NotFoundPageProps = {
  language?: Language
}

export function NotFoundPage({ language }: NotFoundPageProps) {
  const { pathname } = useLocation()
  const resolvedLanguage =
    language ?? (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it')
  const english = resolvedLanguage === 'en'
  const headingId = 'not-found-title'

  return (
    <PageSection aria-labelledby={headingId} spacing="spacious">
      <PageContainer>
        <Stack spacing={3}>
          <Typography component="h1" id={headingId} variant="h2">
            {english ? 'Page not found' : 'Pagina non trovata'}
          </Typography>
          <Typography>
            {english ? 'The requested page does not exist.' : 'La pagina richiesta non esiste.'}
          </Typography>
          <ButtonLink
            sx={{ alignSelf: 'flex-start' }}
            to={getRoutePath('home', resolvedLanguage)}
            variant="contained"
          >
            {english ? 'Back to home' : 'Torna alla home'}
          </ButtonLink>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
