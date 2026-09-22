import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { DigitalStudioProvider } from '../theme'
import { NotFoundPage } from './NotFoundPage'

function renderNotFoundPage(pathname: string, language?: 'it' | 'en') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[pathname]}>
        {language ? <NotFoundPage language={language} /> : <NotFoundPage />}
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('NotFoundPage', () => {
  it('uses localized content and a decorative illustration inside the application shell', () => {
    renderNotFoundPage('/en/unknown', 'en')

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(
      screen.getByText('The requested page does not exist or is no longer available.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/en')
    const illustration = screen.getByTestId('not-found-illustration')
    const svg = illustration.querySelector('svg')

    expect(illustration).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('focusable', 'false')
    expect(svg).toHaveAttribute('role', 'presentation')
  })

  it('resolves the global fallback language from the requested path', () => {
    renderNotFoundPage('/en/missing')

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/en')
  })

  it('defaults the global fallback to Italian', () => {
    renderNotFoundPage('/missing')

    expect(screen.getByRole('heading', { name: 'Pagina non trovata' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Torna alla home' })).toHaveAttribute('href', '/it')
  })
})
