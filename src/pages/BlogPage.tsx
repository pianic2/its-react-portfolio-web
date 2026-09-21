import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { usePortfolioContent } from '../content/context'
import { usePortfolioBackend } from '../services/backend'
import { BlogCard } from '../features/blog/BlogCard'
import { loadBlogPost, loadBlogPosts, type BlogPost } from '../features/blog/blogContent'
import { NotFoundPage } from './NotFoundPage'

export function BlogPage() {
  const { language } = usePortfolioContent()
  const { slug } = useParams()
  const backend = usePortfolioBackend()
  const [articles, setArticles] = useState<BlogPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  useEffect(() => {
    let active = true
    setStatus('loading')
    const request = slug
      ? loadBlogPost(backend, language, slug).then((article) => (article ? [article] : []))
      : loadBlogPosts(backend, language)
    void request
      .then((nextArticles) => {
        if (!active) return
        setArticles(nextArticles)
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [backend, language, slug])

  const detail = Boolean(slug)
  if (detail && status === 'ready' && articles.length === 0) {
    return <NotFoundPage language={language} />
  }
  const heading = detail ? (articles[0]?.title ?? 'Blog') : 'Blog'

  return (
    <PageSection aria-labelledby="blog-page-title">
      <PageContainer>
        <Stack spacing={3}>
          <Typography component="h1" id="blog-page-title" variant="h1">
            {heading}
          </Typography>
          {status === 'loading' ? <CircularProgress aria-label="Loading Blog" size={32} /> : null}
          {status === 'error' ? (
            <Alert severity="error">The Blog could not be loaded.</Alert>
          ) : null}
          {status === 'ready' && articles.length === 0 ? (
            <Typography component="output">No articles are available yet.</Typography>
          ) : null}
          {detail && articles[0] ? <BlogDetail article={articles[0]} /> : null}
          {!detail && articles.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              }}
            >
              {articles.map((article) => (
                <BlogCard key={article.stable_id} language={language} post={article} />
              ))}
            </Box>
          ) : null}
        </Stack>
      </PageContainer>
    </PageSection>
  )
}

function BlogDetail({ article }: { article: BlogPost }) {
  const image =
    typeof article.featured_image === 'string'
      ? article.featured_image
      : article.featured_image?.url
  const imageAlt =
    typeof article.featured_image === 'object' ? (article.featured_image.alt ?? '') : ''
  return (
    <Stack component="article" spacing={3} sx={{ maxWidth: '72ch' }}>
      {article.publication_date ? (
        <Typography color="text.secondary" component="time" dateTime={article.publication_date}>
          {article.publication_date}
        </Typography>
      ) : null}
      {article.excerpt ? <Typography variant="h5">{article.excerpt}</Typography> : null}
      {image ? (
        <Box
          alt={imageAlt}
          component="img"
          src={image}
          sx={{ borderRadius: 2, maxWidth: '100%', height: 'auto' }}
        />
      ) : null}
      {article.body ? (
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{article.body}</Typography>
      ) : null}
    </Stack>
  )
}
