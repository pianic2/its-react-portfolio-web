import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { githubPagesBasePath, siteOrigin } from '../routes/sitemap'
import { getSeoMetadata } from './seoContract'

export type SeoMetadataOverrides = Partial<Pick<SeoMetadataValue, 'description' | 'title'>> & {
  image?: string
  publishedTime?: string
  type?: 'article' | 'website'
}

type SeoMetadataValue = ReturnType<typeof getSeoMetadata>

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = value
}

export function SeoMetadata({ overrides }: { overrides?: SeoMetadataOverrides }) {
  const { pathname } = useLocation()
  const title = overrides?.title
  const description = overrides?.description
  const image = overrides?.image
  const publishedTime = overrides?.publishedTime
  const type = overrides?.type
  useEffect(() => {
    const metadata = { ...getSeoMetadata(pathname), ...overrides }
    const socialImage =
      image ??
      new URL(`${githubPagesBasePath.replace(/^\//, '')}assets/social-card.png`, siteOrigin)
    const socialImageUrl = typeof socialImage === 'string' ? socialImage : socialImage.href
    document.title = metadata.title
    document.documentElement.lang = metadata.language
    setMeta('name', 'description', metadata.description)
    setMeta('name', 'robots', metadata.indexable ? 'index, follow' : 'noindex, nofollow')
    setMeta('property', 'og:title', metadata.title)
    setMeta('property', 'og:description', metadata.description)
    setMeta('property', 'og:url', metadata.canonical ?? '')
    setMeta('property', 'og:locale', metadata.language === 'it' ? 'it_IT' : 'en_US')
    setMeta('property', 'og:type', type ?? 'website')
    setMeta('property', 'og:image', socialImageUrl)
    setMeta('property', 'og:image:width', image ? '' : '1200')
    setMeta('property', 'og:image:height', image ? '' : '630')
    setMeta('property', 'article:published_time', publishedTime ?? '')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', metadata.title)
    setMeta('name', 'twitter:description', metadata.description)
    setMeta('name', 'twitter:image', socialImageUrl)
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
  }, [description, image, overrides, pathname, publishedTime, title, type])
  return null
}
