import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeoMetadata } from './seoContract'

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = value
}

export function SeoMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const metadata = getSeoMetadata(pathname)
    document.title = metadata.title
    document.documentElement.lang = metadata.language
    setMeta('name', 'description', metadata.description)
    setMeta('name', 'robots', metadata.indexable ? 'index, follow' : 'noindex, nofollow')
    setMeta('property', 'og:title', metadata.title)
    setMeta('property', 'og:description', metadata.description)
    setMeta('property', 'og:url', metadata.canonical ?? '')
    setMeta('property', 'og:locale', metadata.language === 'it' ? 'it_IT' : 'en_US')
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', metadata.title)
    setMeta('name', 'twitter:description', metadata.description)
    document.head
      .querySelectorAll('link[data-seo-alternate], link[data-seo-canonical]')
      .forEach((element) => element.remove())
    if (metadata.canonical) {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = metadata.canonical
      link.dataset.seoCanonical = 'true'
      document.head.append(link)
    }
    Object.entries(metadata.alternates).forEach(([language, href]) => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = language
      link.href = href
      link.dataset.seoAlternate = 'true'
      document.head.append(link)
    })
  }, [pathname])
  return null
}
