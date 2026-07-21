import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../app/AppLayout'
import { DesignSystemPage } from '../dev/DesignSystemPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { HomePage } from '../pages/HomePage'
import { ContactPage } from '../pages/ContactPage'
import { PagePlaceholder } from '../pages/PagePlaceholder'
import { PrivacyPage } from '../pages/PrivacyPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ProjectDetailPage } from '../pages/ProjectDetailPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { SkillsPage } from '../pages/SkillsPage'
import { MethodPage } from '../pages/MethodPage'
import { readStoredLanguage } from '../preferences/preferences'
import { routeDefinitions, supportedLanguages, type Language, type PageId } from './routeConfig'

const pageIds = Object.keys(routeDefinitions) as PageId[]

function pageElement(page: PageId, language: Language) {
  if (page === 'home') return <HomePage />
  if (page === 'projects') return <ProjectsPage />
  if (page === 'skills') return <SkillsPage />
  if (page === 'method') return <MethodPage />
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
          <Route path="*" element={<NotFoundPage language={language} />} />
        </Route>
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
