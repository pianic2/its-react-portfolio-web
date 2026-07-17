import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '../routes/AppRoutes'
import { DigitalStudioProvider } from '../theme'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export function App() {
  return (
    <DigitalStudioProvider>
      <BrowserRouter basename={routerBasename}>
        <AppRoutes />
      </BrowserRouter>
    </DigitalStudioProvider>
  )
}
