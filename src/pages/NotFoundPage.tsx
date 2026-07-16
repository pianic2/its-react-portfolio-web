import { Button, Container, Stack, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

export function NotFoundPage() {
  const { pathname } = useLocation()
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')

  return (
    <Container component="main" sx={{ py: { xs: 8, md: 12 } }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h2">
          {isEnglish ? 'Page not found' : 'Pagina non trovata'}
        </Typography>
        <Typography>
          {isEnglish ? 'The requested page does not exist.' : 'La pagina richiesta non esiste.'}
        </Typography>
        <Button component={Link} to={isEnglish ? '/en' : '/it'} variant="contained">
          {isEnglish ? 'Back to home' : 'Torna alla home'}
        </Button>
      </Stack>
    </Container>
  )
}
