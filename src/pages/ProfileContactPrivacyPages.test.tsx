import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PortfolioContentProvider } from '../content/context'
import { DigitalStudioProvider } from '../theme'
import { ContactPage } from './ContactPage'
import { PrivacyPage } from './PrivacyPage'
import { ProfilePage } from './ProfilePage'

function renderPage(language: 'it' | 'en', page: 'profile' | 'contact' | 'privacy') {
  const element =
    page === 'profile' ? <ProfilePage /> : page === 'contact' ? <ContactPage /> : <PrivacyPage />

  return render(
    <DigitalStudioProvider>
      <MemoryRouter>
        <PortfolioContentProvider language={language}>{element}</PortfolioContentProvider>
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('Profile, Contact and Privacy pages', () => {
  it('builds the English profile as a navigable professional narrative', () => {
    renderPage('en', 'profile')

    expect(
      screen.getByRole('heading', { name: 'A technical path built one project at a time.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'What this means in practice' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'Explore my projects' })).toHaveAttribute(
      'href',
      '/en/projects',
    )
    expect(screen.getByRole('link', { name: 'Let’s talk' })).toHaveAttribute('href', '/en/contact')
    expect(screen.getByRole('link', { name: /View GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
  }, 20_000)

  it('presents the Italian contact form with visible labels and useful guidance', () => {
    renderPage('it', 'contact')

    expect(
      screen.getByRole('heading', { name: 'Raccontami su cosa stai lavorando.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Buoni motivi per scrivermi' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Iniziamo la conversazione' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Nome/ })).toBeRequired()
    expect(screen.getByRole('textbox', { name: /Email/ })).toBeRequired()
    expect(screen.getByRole('textbox', { name: /Messaggio/ })).toBeRequired()
    expect(screen.getByText('Massimo 80 caratteri.')).toBeInTheDocument()
    expect(screen.getByText('Da 20 a 2.000 caratteri.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Usa GitHub in alternativa/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
  }, 20_000)

  it('makes the English privacy notice scannable and identifies both external contacts', () => {
    renderPage('en', 'privacy')

    expect(
      screen.getByRole('heading', { name: 'How the contact form handles your data.' }),
    ).toBeInTheDocument()
    const index = screen.getByRole('navigation', { name: 'On this page' })
    expect(index).toBeInTheDocument()
    expect(index.querySelectorAll('a')).toHaveLength(4)
    expect(
      screen.getByRole('link', { name: /Read the Web3Forms privacy information/ }),
    ).toHaveAttribute('href', 'https://web3forms.com/privacy')
    expect(screen.getByRole('link', { name: /Contact the site owner on GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2',
    )
    expect(screen.getByText('Last updated: 21 July 2026')).toBeInTheDocument()
  }, 20_000)
})
