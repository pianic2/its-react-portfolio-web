import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { DigitalStudioProvider } from '../../theme'
import { LanguageSwitch } from './LanguageSwitch'
import { PrimaryNavigation } from './PrimaryNavigation'
import { SiteHeader } from './SiteHeader'
import { ThemeToggle } from './ThemeToggle'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}</output>
}

function renderWithProviders(children: ReactNode, initialPath = '/it') {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        {children}
        <LocationProbe />
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

// JSDOM does not apply viewport media queries. Apply the rendered Emotion
// min-width rules for the requested viewport so visibility uses real CSS.
function applyViewportRules(width: number) {
  const rules: string[] = []
  for (const sheet of Array.from(document.styleSheets)) {
    for (const rule of Array.from(sheet.cssRules)) {
      if (rule instanceof CSSMediaRule) {
        const minimumWidth = /\(min-width:\s*(\d+)px\)/.exec(rule.conditionText)
        if (minimumWidth && width >= Number(minimumWidth[1])) {
          rules.push(...Array.from(rule.cssRules, (child) => child.cssText))
        }
      }
    }
  }
  const style = document.createElement('style')
  style.textContent = rules.join('\n')
  document.head.append(style)
  return () => style.remove()
}

describe('shared navigation primitives', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it.each(
    (['it', 'en'] as const).flatMap((language) =>
      [1199, 1200].map((width) => ({ language, width })),
    ),
  )('uses the desktop controls from 1200px: $language at $width', ({ language, width }) => {
    renderWithProviders(<SiteHeader language={language} />, `/${language}`)
    let removeViewportRules = () => {}
    try {
      const desktop = width >= 1200
      const navigation = screen.getByRole('navigation', {
        name: language === 'it' ? 'Navigazione principale' : 'Main navigation',
        hidden: true,
      })
      const languageControl = screen.getByRole('link', {
        name: language === 'it' ? "Passa all'inglese" : 'Switch to Italian',
        hidden: true,
      })
      const themeControl = screen.getByRole('button', {
        name: language === 'it' ? 'Attiva il tema scuro' : 'Activate dark theme',
        hidden: true,
      })
      const drawerTrigger = screen.getByRole('button', {
        name: language === 'it' ? 'Apri navigazione' : 'Open navigation',
        hidden: true,
      })
      removeViewportRules = applyViewportRules(width)
      expect(screen.queryByRole('navigation')).toBe(desktop ? navigation : null)
      expect(
        screen.queryByRole('link', { name: languageControl.getAttribute('aria-label')! }),
      ).toBe(desktop ? languageControl : null)
      expect(screen.queryByRole('button', { name: themeControl.getAttribute('aria-label')! })).toBe(
        desktop ? themeControl : null,
      )
      expect(
        screen.queryByRole('button', { name: drawerTrigger.getAttribute('aria-label')! }),
      ).toBe(desktop ? null : drawerTrigger)
    } finally {
      removeViewportRules()
    }
  })

  it.each([
    { language: 'it', path: '/it/progetti', label: 'Progetti' },
    { language: 'en', path: '/en/projects', label: 'Projects' },
  ] as const)(
    'marks the current $language route structurally and with aria-current',
    ({ language, path, label }) => {
      renderWithProviders(<PrimaryNavigation language={language} />, path)

      const activeLink = screen.getByRole('link', { name: label })
      expect(activeLink).toHaveAttribute('aria-current', 'page')
      expect(window.getComputedStyle(activeLink).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
      expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    },
  )

  it('keeps desktop links quiet at rest with 48px targets', () => {
    renderWithProviders(<PrimaryNavigation language="it" />, '/it/progetti')
    const resting = window.getComputedStyle(screen.getByRole('link', { name: 'Home' }))
    expect(resting.backgroundColor).toBe('rgba(0, 0, 0, 0)')
    expect(resting.boxShadow).toBe('none')
    // JSDOM preserves calc() rather than resolving CSS custom properties.
    expect(resting.minHeight).toBe('calc(12 * var(--mui-spacing))')
    expect(
      window.getComputedStyle(document.documentElement).getPropertyValue('--mui-spacing'),
    ).toBe('4px')
  })

  it('exposes the canonical localized home link and shared brand asset', () => {
    renderWithProviders(<SiteHeader language="en" />, '/en')

    const identity = screen.getByRole('link', { name: 'Niccolò Piazzi — Home' })
    expect(identity).toHaveAttribute('href', '/en')
    expect(identity.querySelector('img')).toHaveAttribute('src', '/brand-mark.svg')
  })

  it('switches through one destination-language flag control and stores the preference', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LanguageSwitch />, '/it/progetti/gestore-liste-node')

    expect(screen.getByTestId('language-flag-en')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: "Passa all'inglese" }))

    expect(screen.getByTestId('location')).toHaveTextContent('/en/projects/node-list-manager')
    expect(window.localStorage.getItem('irpw.language-preference')).toBe('en')
  })

  it('exposes the active theme as a pressed toggle state', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ThemeToggle language="it" />)

    const lightControl = screen.getByRole('button', { name: 'Attiva il tema scuro' })
    expect(lightControl).toHaveAttribute('aria-pressed', 'false')

    await user.click(lightControl)

    expect(screen.getByRole('button', { name: 'Attiva il tema chiaro' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('opens an accessible mobile navigation dialog and restores focus after Escape', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SiteHeader language="it" />)

    const trigger = screen.getByRole('button', { name: 'Apri navigazione', hidden: true })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Navigazione' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveFocus()
    const closeControl = within(dialog).getByRole('button', { name: 'Chiudi navigazione' })
    const themeControl = within(dialog).getByRole('button', { name: 'Attiva il tema scuro' })
    themeControl.focus()
    await user.tab()
    expect(closeControl).toHaveFocus()
    await user.tab({ shift: true })
    expect(themeControl).toHaveFocus()
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Navigazione' })).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })
})
