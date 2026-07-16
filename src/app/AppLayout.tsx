import { Box, Button, Container, Stack } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import {
  getRoutePath,
  mainNavigationPages,
  routeDefinitions,
  type Language,
} from '../routes/routeConfig'
import { LanguageSwitch } from './LanguageSwitch'

type AppLayoutProps = {
  language: Language
}

export function AppLayout({ language }: AppLayoutProps) {
  const skipLabel = language === 'it' ? 'Vai al contenuto' : 'Skip to content'

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Button
        component="a"
        href="#main-content"
        sx={{ position: 'absolute', left: -10_000, '&:focus': { left: 8 } }}
      >
        {skipLabel}
      </Button>
      <Box component="header" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Stack
            aria-label={language === 'it' ? 'Navigazione principale' : 'Main navigation'}
            component="nav"
            direction="row"
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {mainNavigationPages.map((page) => (
              <Button component={Link} key={page} size="small" to={getRoutePath(page, language)}>
                {routeDefinitions[page].labels[language]}
              </Button>
            ))}
          </Stack>
          <LanguageSwitch />
        </Container>
      </Box>
      <Container component="main" id="main-content" sx={{ flex: 1, py: { xs: 6, md: 10 } }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 2 }}>
        <Container>
          <Button component={Link} size="small" to={getRoutePath('privacy', language)}>
            {routeDefinitions.privacy.labels[language]}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
