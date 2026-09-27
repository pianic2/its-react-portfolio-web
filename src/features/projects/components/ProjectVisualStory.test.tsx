import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { englishContent } from '../../../content/data/en'
import { DigitalStudioProvider } from '../../../theme'
import { ProjectVisualStory } from './ProjectVisualStory'

describe('ProjectVisualStory', () => {
  it('exposes each project step and lets keyboard users inspect its explanation', async () => {
    const user = userEvent.setup()
    const story = englishContent.projects.find(
      (project) => project.projectId === 'homeedge-ai-platform',
    )?.visualStory
    if (!story) throw new Error('HomeEdge visual story is missing.')

    render(
      <DigitalStudioProvider>
        <ProjectVisualStory interactive title={story.title} steps={story.steps} />
      </DigitalStudioProvider>,
    )

    expect(screen.getByRole('button', { name: /signals/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/defined in the MVP scope/i)).toBeInTheDocument()

    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: /ESP32-C3 node/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(/working device remains a goal/i)).toBeInTheDocument()
  })
})
