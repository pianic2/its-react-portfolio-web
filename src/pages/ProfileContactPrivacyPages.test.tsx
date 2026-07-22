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
  it('builds the English profile as a chronological narrative with conversion and external evidence', () => {
    renderPage('en', 'profile')

    expect(
      screen.getByRole('heading', {
        name: 'I found in software the way to turn curiosity and logic into something concrete.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Before the code, there was a need to understand.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'I started with what I had: limited time, online resources and a lot of practice.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Today I am turning individual learning into professional preparation.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Other places where you can follow my progress.' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5)
    expect(screen.getAllByRole('link', { name: 'Contact me' })).toHaveLength(2)
    expect(screen.getAllByRole('link', { name: /Explore GitHub/ })).toHaveLength(2)
    expect(screen.getByRole('link', { name: /Open my LeetCode profile/ })).toHaveAttribute(
      'href',
      'https://leetcode.com/u/pianic2',
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
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4)
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
