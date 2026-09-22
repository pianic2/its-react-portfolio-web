import { z } from 'zod'
import type { BackendPage, BackendLanguage, PortfolioBackend } from '../../services/backend'

export const blogPostSchema = z.object({
  stable_id: z.string().min(1),
  title: z.string().min(1),
  meta: z.object({ slug: z.string().min(1) }),
  excerpt: z.string().optional(),
  publication_date: z.string().optional(),
  body: z.string().optional(),
  featured_image: z
    .union([z.string().url(), z.object({ url: z.string().url(), alt: z.string().optional() })])
    .optional(),
})

export type BlogPost = z.infer<typeof blogPostSchema>

export const blogPostFields = 'stable_id,title,meta,excerpt,publication_date,body,featured_image'

export function parseBlogPost(page: BackendPage): BlogPost | null {
  const result = blogPostSchema.safeParse(page)
  return result.success ? result.data : null
}

export async function loadBlogPosts(
  backend: PortfolioBackend | null,
  language: BackendLanguage,
): Promise<BlogPost[]> {
  if (!backend) return []
  const pages = await backend.listPages('portfolio.BlogPostPage', language, blogPostFields)
  return pages.flatMap((page) => {
    const post = parseBlogPost(page)
    return post ? [post] : []
  })
}

export async function loadBlogPost(
  backend: PortfolioBackend | null,
  language: BackendLanguage,
  slug: string,
): Promise<BlogPost | null> {
  if (!backend) return null
  const page = await backend.findBySlug('portfolio.BlogPostPage', language, slug, blogPostFields)
  return page ? parseBlogPost(page) : null
}

export async function loadTranslatedBlogPost(
  backend: PortfolioBackend | null,
  language: BackendLanguage,
  stableId: string,
): Promise<BlogPost | null> {
  if (!backend) return null
  const page = await backend.findByStableId(
    'portfolio.BlogPostPage',
    language,
    stableId,
    blogPostFields,
  )
  return page ? parseBlogPost(page) : null
}
