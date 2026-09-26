import { describe, expect, it } from 'vitest'
import { renderRichText } from './richText'

describe('blog rich text renderer', () => {
  it('renders markdown blocks and inline formatting', () => {
    expect(
      renderRichText('## Heading\n\n**Important** and [a link](https://example.com)'),
    ).toContain('<h2>Heading</h2>')
    expect(
      renderRichText('## Heading\n\n**Important** and [a link](https://example.com)'),
    ).toContain('<strong>Important</strong>')
  })

  it('keeps safe HTML and removes executable content', () => {
    const rendered = renderRichText(
      '<p>Hello</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
    )

    expect(rendered).toContain('<p>Hello</p>')
    expect(rendered).not.toContain('<script>')
    expect(rendered).not.toContain('javascript:')
  })
})
