const allowedTags = new Set([
  'A',
  'BLOCKQUOTE',
  'BR',
  'CODE',
  'DEL',
  'EM',
  'H2',
  'H3',
  'H4',
  'HR',
  'IMG',
  'LI',
  'OL',
  'P',
  'PRE',
  'STRONG',
  'UL',
])

const allowedAttributes = new Set(['alt', 'href', 'rel', 'src', 'target', 'title'])

export function renderRichText(source: string) {
  const html = looksLikeHtml(source) ? source : markdownToHtml(source)
  return sanitizeHtml(html)
}

function looksLikeHtml(source: string) {
  return /<\/?[a-z][^>]*>/i.test(source)
}

function markdownToHtml(source: string) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')
  const blocks: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? ''
    if (!line) {
      index += 1
      continue
    }
    if (line.startsWith('```')) {
      const code: string[] = []
      index += 1
      while (index < lines.length && !(lines[index] ?? '').trim().startsWith('```')) {
        code.push(lines[index] ?? '')
        index += 1
      }
      index += 1
      blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`)
      continue
    }
    const heading = /^(#{2,4})\s+(.+)$/.exec(line)
    if (heading) {
      const level = heading[1] ?? '2'
      blocks.push(`<h${level.length}>${inlineMarkdown(heading[2] ?? '')}</h${level.length}>`)
      index += 1
      continue
    }
    if (/^[-*+]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line)
      const items: string[] = []
      while (index < lines.length) {
        const item = lines[index]?.trim() ?? ''
        const match = ordered ? /^\d+\.\s+(.+)$/.exec(item) : /^[-*+]\s+(.+)$/.exec(item)
        if (!match) break
        items.push(`<li>${inlineMarkdown(match[1] ?? '')}</li>`)
        index += 1
      }
      blocks.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`)
      continue
    }
    if (line.startsWith('>')) {
      const quote: string[] = []
      while (index < lines.length && (lines[index]?.trim() ?? '').startsWith('>')) {
        quote.push((lines[index]?.trim() ?? '').replace(/^>\s?/, ''))
        index += 1
      }
      blocks.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`)
      continue
    }
    const paragraph: string[] = [line]
    index += 1
    while (
      index < lines.length &&
      (lines[index] ?? '').trim() &&
      !isBlockStart(lines[index] ?? '')
    ) {
      paragraph.push((lines[index] ?? '').trim())
      index += 1
    }
    blocks.push(`<p>${inlineMarkdown(paragraph.join('\n'))}</p>`)
  }
  return blocks.join('')
}

function isBlockStart(line: string) {
  return /^(#{2,4})\s+|^```|^[-*+]\s+|^\d+\.\s+|^>/.test(line.trim())
}

function inlineMarkdown(source: string) {
  const placeholders: string[] = []
  const marker = '__BLOG_TOKEN_'
  const placeholder = (value: string) => {
    placeholders.push(value)
    return `${marker}${placeholders.length - 1}__`
  }
  let result = escapeHtml(source).replace(/`([^`]+)`/g, (_, code: string) =>
    placeholder(`<code>${code}</code>`),
  )
  result = result.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, alt, src, title) =>
    placeholder(`<img alt="${alt}" src="${src}"${title ? ` title="${title}"` : ''}>`),
  )
  result = result.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, label, href) =>
    placeholder(`<a href="${href}">${label}</a>`),
  )
  result = result
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
  return result.replace(
    /__BLOG_TOKEN_(\d+)__/g,
    (_, index: string) => placeholders[Number(index)] ?? '',
  )
}

function escapeHtml(source: string) {
  return source.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character] ?? character
  })
}

function sanitizeHtml(source: string) {
  const document = new DOMParser().parseFromString(source, 'text/html')
  document.body.querySelectorAll('*').forEach((element) => {
    if (!allowedTags.has(element.tagName)) {
      element.remove()
      return
    }
    Array.from(element.attributes).forEach((attribute) => {
      if (!allowedAttributes.has(attribute.name)) element.removeAttribute(attribute.name)
    })
    if (element instanceof HTMLAnchorElement) {
      if (!isSafeUrl(element.href, ['http:', 'https:', 'mailto:', '']))
        element.removeAttribute('href')
      if (element.target === '_blank') element.rel = 'noopener noreferrer'
    }
    if (element instanceof HTMLImageElement && !isSafeUrl(element.src, ['http:', 'https:'])) {
      element.remove()
    }
  })
  return document.body.innerHTML
}

function isSafeUrl(value: string, protocols: string[]) {
  try {
    const url = new URL(value, window.location.origin)
    return protocols.includes(url.protocol) && !url.username && !url.password
  } catch {
    return false
  }
}
