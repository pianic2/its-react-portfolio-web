import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { DigitalStudioProvider } from '../theme'
import { DesignSystemPage } from './DesignSystemPage'

function renderShowcase() {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter initialEntries={['/__dev/design-system']}>
        <DesignSystemPage />
      </MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('responsive design-system showcase', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the complete review matrix with shared and composed components', () => {
    renderShowcase()

    expect(screen.getByRole('heading', { name: 'Pop! Digital Studio' })).toBeInTheDocument()
    expect(screen.getByText('Development only · IRPW-17')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Roles instead of scattered hex values' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Material UI with a Digital Studio voice' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Focused field')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Focus, disabled state and optional motion' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Composed components under realistic pressure' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Edge telemetry decision lab' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Release readiness' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Start with the problem, not the pitch.' }),
    ).toBeInTheDocument()
  }, 20_000)

  it('exposes active navigation and disabled interaction states', () => {
    renderShowcase()

    expect(screen.getByRole('link', { name: 'Current showcase route' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: 'Disabled action' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Disabled icon action' })).toBeDisabled()
    expect(screen.getByLabelText('Disabled field')).toBeDisabled()
  })

  it('can force and release the reduced-motion preview without persistence', async () => {
    const user = userEvent.setup()
    const { container } = renderShowcase()
    const previewControl = screen.getByLabelText('Force reduced-motion preview')
    const root = container.firstElementChild

    expect(root).toHaveAttribute('data-force-reduced-motion', 'false')
    await user.click(previewControl)
    expect(root).toHaveAttribute('data-force-reduced-motion', 'true')
    expect(window.localStorage.getItem('irpw.reduced-motion-preview')).toBeNull()
    await user.click(previewControl)
    expect(root).toHaveAttribute('data-force-reduced-motion', 'false')
  }, 20_000)

  it('uses the real theme provider and temporary navigation drawer', async () => {
    const user = userEvent.setup()
    renderShowcase()

    await user.click(screen.getByRole('button', { name: 'Activate dark theme' }))
    expect(screen.getByText('Theme: dark')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open navigation preview' }))
    expect(screen.getByRole('heading', { name: 'Navigation' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Close navigation' }))
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Navigation' })).not.toBeInTheDocument()
    })
  }, 20_000)
})
