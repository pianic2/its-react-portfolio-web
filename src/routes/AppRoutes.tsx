import { Box, CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../app/AppLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { HomePage } from '../pages/HomePage'
import { ContactPage } from '../pages/ContactPage'
import { PagePlaceholder } from '../pages/PagePlaceholder'
import { PrivacyPage } from '../pages/PrivacyPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ProjectDetailPage } from '../pages/ProjectDetailPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { SkillsPage } from '../pages/SkillsPage'
import { readStoredLanguage } from '../preferences/preferences'
import { routeDefinitions, supportedLanguages, type Language, type PageId } from './routeConfig'

const pageIds = Object.keys(routeDefinitions) as PageId[]

const MethodPage = lazy(() =>
  import('../pages/MethodPage').then(({ MethodPage: Page }) => ({ default: Page })),
)

const DesignSystemPage = import.meta.env.DEV
  ? lazy(() =>
      import('../dev/DesignSystemPage').then(({ DesignSystemPage: Page }) => ({ default: Page })),
    )
  : null

const loadingLabels: Record<Language, string> = {
  it: 'Caricamento della pagina',
  en: 'Loading page',
}

function RouteLoadingFallback({ language }: { language: Language }) {
  return (
    <Box
      component="output"
      aria-busy="true"
      aria-live="polite"
      aria-label={loadingLabels[language]}
      sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minBlockSize: '50vh' }}
    >
      <CircularProgress aria-hidden="true" color="primary" />
    </Box>
  )
}

function pageElement(page: PageId, language: Language) {
  if (page === 'home') return <HomePage />
  if (page === 'projects') return <ProjectsPage />
  if (page === 'skills') return <SkillsPage />
  if (page === 'method') {
    return (
      <Suspense fallback={<RouteLoadingFallback language={language} />}>
        <MethodPage />
      </Suspense>
    )
  }
  if (page === 'projectDetail') return <ProjectDetailPage />
  if (page === 'profile') return <ProfilePage />
  if (page === 'contact') return <ContactPage />
  if (page === 'privacy') return <PrivacyPage />
  return <PagePlaceholder language={language} page={page} />
}

function RootLanguageRedirect() {
  return <Navigate to={`/${readStoredLanguage() ?? 'it'}`} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLanguageRedirect />} />
      {DesignSystemPage ? (
        <Route
          path="/__dev/design-system"
          element={
            <Suspense fallback={<RouteLoadingFallback language="en" />}>
              <DesignSystemPage />
            </Suspense>
          }
        />
      ) : null}
      {supportedLanguages.map((language) => (
        <Route key={language} path={`/${language}`} element={<AppLayout language={language} />}>
          {pageIds.map((page) => (
            <Route
              key={page}
              index={page === 'home'}
              path={page === 'home' ? undefined : routeDefinitions[page].paths[language]}
              element={pageElement(page, language)}
            />
          ))}
          <Route path="*" element={<NotFoundPage language={language} />} />
        </Route>
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
