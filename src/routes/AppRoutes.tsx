import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../app/AppLayout'
import { DesignSystemPage } from '../dev/DesignSystemPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PagePlaceholder } from '../pages/PagePlaceholder'
import { ProjectDetailPage } from '../pages/ProjectDetailPage'
import { readStoredLanguage } from '../preferences/preferences'
import { routeDefinitions, supportedLanguages, type Language, type PageId } from './routeConfig'

const pageIds = Object.keys(routeDefinitions) as PageId[]

function pageElement(page: PageId, language: Language) {
  return page === 'projectDetail' ? (
    <ProjectDetailPage language={language} />
  ) : (
    <PagePlaceholder language={language} page={page} />
  )
}

function RootLanguageRedirect() {
  return <Navigate to={`/${readStoredLanguage() ?? 'it'}`} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLanguageRedirect />} />
      {import.meta.env.DEV ? (
        <Route path="/__dev/design-system" element={<DesignSystemPage />} />
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
        </Route>
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
