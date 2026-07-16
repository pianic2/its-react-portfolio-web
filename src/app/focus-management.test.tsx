import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import { DigitalStudioProvider } from '../theme'
import { RouteFocusManager } from './RouteFocusManager'
import { SkipLink } from './SkipLink'

function FocusHarness() {
  return (
    <>
      <SkipLink label="Skip to content" targetId="main-content" />
      <RouteFocusManager targetId="main-content" />
      <Link to="/next">Next route</Link>
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/next" element={<h1>Next</h1>} />
        </Routes>
      </main>
    </>
  )
}

describe('application focus management', () => {
  it('moves focus to main content from the skip link', async () => {
    const user = userEvent.setup()
    render(
      <DigitalStudioProvider>
        <MemoryRouter>
          <FocusHarness />
        </MemoryRouter>
      </DigitalStudioProvider>,
    )

    await user.click(screen.getByRole('link', { name: 'Skip to content' }))
    expect(document.getElementById('main-content')).toHaveFocus()
  })

  it('moves focus to the main landmark after client-side navigation', async () => {
    const user = userEvent.setup()
    render(
      <DigitalStudioProvider>
        <MemoryRouter>
          <FocusHarness />
        </MemoryRouter>
      </DigitalStudioProvider>,
    )

    await user.click(screen.getByRole('link', { name: 'Next route' }))

    expect(screen.getByRole('heading', { name: 'Next' })).toBeInTheDocument()
    expect(document.getElementById('main-content')).toHaveFocus()
  })
})
