import { describe, expect, it } from 'vitest'

describe('quality baseline', () => {
  it('runs tests in a browser-like environment', () => {
    const element = document.createElement('main')

    element.setAttribute('aria-label', 'Portfolio')
    document.body.append(element)

    expect(element).toBeInTheDocument()
    expect(element).toHaveAccessibleName('Portfolio')
  })
})
