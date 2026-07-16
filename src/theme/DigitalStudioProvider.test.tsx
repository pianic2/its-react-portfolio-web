import { Button } from '@mui/material'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useDigitalStudioTheme } from './DigitalStudioContext'
import { DigitalStudioProvider } from './DigitalStudioProvider'

function ThemeProbe() {
  const { mode, toggleMode } = useDigitalStudioTheme()

  return <Button onClick={toggleMode}>Current mode: {mode}</Button>
}

describe('DigitalStudioProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  it('restores a valid stored theme preference', async () => {
    window.localStorage.setItem('irpw.theme-preference', 'dark')

    render(
      <DigitalStudioProvider>
        <ThemeProbe />
      </DigitalStudioProvider>,
    )

    expect(screen.getByRole('button', { name: 'Current mode: dark' })).toBeInTheDocument()
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'))
  })

  it('persists an explicit mode change', async () => {
    window.localStorage.setItem('irpw.theme-preference', 'light')
    const user = userEvent.setup()

    render(
      <DigitalStudioProvider>
        <ThemeProbe />
      </DigitalStudioProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Current mode: light' }))

    expect(screen.getByRole('button', { name: 'Current mode: dark' })).toBeInTheDocument()
    expect(window.localStorage.getItem('irpw.theme-preference')).toBe('dark')
  })
})
