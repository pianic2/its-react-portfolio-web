import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '../routes/AppRoutes'
import { DigitalStudioProvider } from '../theme'

export function App() {
  return (
    <DigitalStudioProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DigitalStudioProvider>
  )
}
