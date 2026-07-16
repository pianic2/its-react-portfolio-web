import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { SiteFooter } from '../components/navigation/SiteFooter'
import { SiteHeader } from '../components/navigation/SiteHeader'
import { PortfolioContentProvider } from '../content/context'
import type { Language } from '../routes/routeConfig'
import { RouteFocusManager } from './RouteFocusManager'
import { SkipLink } from './SkipLink'

type AppLayoutProps = {
  language: Language
}

const skipLabels: Record<Language, string> = {
  it: 'Vai al contenuto',
  en: 'Skip to content',
}

export function AppLayout({ language }: AppLayoutProps) {
  return (
    <PortfolioContentProvider language={language}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: 0 }}>
        <SkipLink label={skipLabels[language]} targetId="main-content" />
        <RouteFocusManager targetId="main-content" />
        <SiteHeader language={language} />
        <Box
          component="main"
          id="main-content"
          sx={{ flex: 1, minWidth: 0, outline: 'none' }}
          tabIndex={-1}
        >
          <Outlet />
        </Box>
        <SiteFooter language={language} />
      </Box>
    </PortfolioContentProvider>
  )
}
