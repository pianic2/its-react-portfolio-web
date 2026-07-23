import { describe, expect, it } from 'vitest'
import { externalLinks } from './externalLinks'

describe('external link registry', () => {
  it('contains unique absolute HTTPS URLs', () => {
    const urls = Object.values(externalLinks)
    expect(new Set(urls).size).toBe(urls.length)
    urls.forEach((url) => expect(new URL(url).protocol).toBe('https:'))
  })
})
