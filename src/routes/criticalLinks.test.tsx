import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { DigitalStudioProvider } from '../theme'
import { externalLinks } from '../config/externalLinks'

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>
}

function renderRoute(path: string) {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
        <LocationProbe />
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('critical CTA and link behaviour', () => {
  it('keeps Home CTA routes localized and protects the GitHub destination', () => {
    renderRoute('/en')
    expect(screen.getByRole('link', { name: 'View my projects' })).toHaveAttribute(
      'href',
      '/en/projects',
    )
    expect(screen.getByRole('link', { name: 'See how I work' })).toHaveAttribute(
      'href',
      '/en/method',
    )
    const github = screen.getByRole('link', { name: /Look at GitHub/ })
    expect(github).toHaveAttribute('href', externalLinks.githubProfile)
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('navigates from the localized footer to Privacy and preserves project language switching', async () => {
    const user = userEvent.setup()
    renderRoute('/it/progetti/gestore-liste-node')
    await user.click(screen.getByRole('link', { name: "Passa all'inglese" }))
    expect(screen.getByTestId('location')).toHaveTextContent('/en/projects/node-list-manager')
    await user.click(screen.getByRole('link', { name: 'Privacy' }))
    expect(screen.getByTestId('location')).toHaveTextContent('/en/privacy')
  })

  it('keeps public profile and project evidence links secure', () => {
    const profile = renderRoute('/en/profile')
    const leetCode = screen.getByRole('link', { name: /Open my LeetCode profile/ })
    expect(leetCode).toHaveAttribute('href', externalLinks.leetCodeProfile)
    expect(leetCode).toHaveAttribute('rel', 'noopener noreferrer')
    profile.unmount()
    renderRoute('/en/projects/homeedge-ai-platform')
    expect(
      screen.queryByRole('link', { name: /HomeEdge stakeholder space/ }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open the repository/ })).toHaveAttribute(
      'href',
      'https://github.com/pianic2/homeedge-ai-platform',
    )
  })
})
