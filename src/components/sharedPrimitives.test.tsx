import { CardContent, Typography } from '@mui/material'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { DigitalStudioProvider } from '../theme'
import { ButtonLink, ExternalLink, InternalLink } from './actions/AppLink'
import { PageContainer } from './layout/PageContainer'
import { PageSection } from './layout/PageSection'
import { StudioCard } from './surfaces/StudioCard'

function renderWithProviders(children: ReactNode) {
  return render(
    <DigitalStudioProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </DigitalStudioProvider>,
  )
}

describe('shared layout and interaction primitives', () => {
  it('preserves semantic section and card elements', () => {
    renderWithProviders(
      <PageSection aria-label="Evidence section">
        <PageContainer>
          <StudioCard component="article" variant="featured">
            <CardContent>
              <Typography>Architecture evidence</Typography>
            </CardContent>
          </StudioCard>
        </PageContainer>
      </PageSection>,
    )

    expect(screen.getByRole('region', { name: 'Evidence section' })).toBeInTheDocument()
    expect(screen.getByRole('article')).toHaveTextContent('Architecture evidence')
  })

  it('keeps navigation links distinct from action buttons', () => {
    renderWithProviders(
      <>
        <InternalLink to="/it/progetti">Internal</InternalLink>
        <ButtonLink to="/it/contatti">Contact</ButtonLink>
        <ExternalLink href="https://example.com" language="en" newTab>
          External
        </ExternalLink>
      </>,
    )

    expect(screen.getByRole('link', { name: 'Internal' })).toHaveAttribute('href', '/it/progetti')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/it/contatti')
    expect(screen.getByRole('link', { name: /External/ })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    )
    expect(screen.getByRole('link', { name: /External/ })).toHaveAttribute('target', '_blank')
  })
})
