import { z } from 'zod'
import {
  BackendNotConfiguredError,
  InvalidBackendResponseError,
  type BackendLanguage,
  type BackendPage,
  type PortfolioBackend,
} from '../../services/backend'

const wagtailImageSchema = z
  .object({
    meta: z
      .object({
        download_url: z.string().min(1),
      })
      .passthrough(),
    title: z.string(),
  })
  .passthrough()

const blogPostResponseSchema = z
  .object({
    id: z.number().int().positive(),
    stable_id: z.string().min(1),
    title: z.string().min(1),
    meta: z
      .object({
        slug: z.string().min(1),
        first_published_at: z.string().nullable().optional(),
        last_published_at: z.string().nullable().optional(),
      })
      .passthrough(),
    excerpt: z.string().nullable().optional(),
    publication_date: z.string().nullable().optional(),
    body: z.string().nullable().optional(),
    featured_image: wagtailImageSchema.nullable().optional(),
  })
  .passthrough()

const blogPostSchema = z.object({
  id: z.number().int().positive(),
  stable_id: z.string().min(1),
  title: z.string().min(1),
  meta: z
    .object({
      slug: z.string().min(1),
      first_published_at: z.string().nullable().optional(),
      last_published_at: z.string().nullable().optional(),
    })
    .passthrough(),
  excerpt: z.string().nullable().optional(),
  publication_date: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  featured_image: z.object({ url: z.string().url(), alt: z.string() }).nullable().optional(),
})

export type BlogPost = z.infer<typeof blogPostSchema>

export function parseBlogPost(
  page: BackendPage,
  resolveAssetUrl: (path: string) => string = (path) => path,
): BlogPost {
  const result = blogPostResponseSchema.safeParse(page)
  if (!result.success) {
    throw new InvalidBackendResponseError(
      'The portfolio backend returned an invalid blog post detail.',
      {
        cause: result.error,
      },
    )
  }

  const image = result.data.featured_image
  const featuredImage =
    image === undefined || image === null
      ? image
      : { url: resolveAssetUrl(image.meta.download_url), alt: image.title }
  const parsedPost = blogPostSchema.safeParse({ ...result.data, featured_image: featuredImage })
  if (!parsedPost.success) {
    throw new InvalidBackendResponseError(
      'The portfolio backend returned an invalid blog post detail.',
      {
        cause: parsedPost.error,
      },
    )
  }
  return parsedPost.data
}

export async function loadBlogPosts(
  backend: PortfolioBackend | null,
  language: BackendLanguage,
): Promise<BlogPost[]> {
  if (!backend) throw new BackendNotConfiguredError()

  const summaries = await backend.listPages('portfolio.BlogPostPage', language)
  return Promise.all(
    summaries.map(async (summary) => {
      const page = await backend.getPage(summary.id)
      const post = parseBlogPost(page, backend.resolveAssetUrl)
      if (post.id !== summary.id || post.meta.slug !== summary.meta.slug) {
        throw new InvalidBackendResponseError(
          'The portfolio backend returned a page detail that does not match its list summary.',
        )
      }
      return post
    }),
  )
}

export async function loadBlogPost(
  backend: PortfolioBackend | null,
  language: BackendLanguage,
  slug: string,
): Promise<BlogPost | null> {
  if (!backend) throw new BackendNotConfiguredError()
  const page = await backend.findBySlug('portfolio.BlogPostPage', language, slug)
  return page ? parseBlogPost(page, backend.resolveAssetUrl) : null
}

export async function loadTranslatedBlogPost(
  backend: PortfolioBackend | null,
  language: BackendLanguage,
  stableId: string,
): Promise<BlogPost | null> {
  if (!backend) throw new BackendNotConfiguredError()
  const page = await backend.findByStableId('portfolio.BlogPostPage', language, stableId)
  return page ? parseBlogPost(page, backend.resolveAssetUrl) : null
}
