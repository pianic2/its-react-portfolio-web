import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { resolveLocalizedRoute } from '../../routes/routeConfig'
import { usePortfolioBackend } from '../../services/backend'
import { usePortfolioContent } from '../../content/context'
import { BlogCard } from './BlogCard'
import { loadBlogPosts, type BlogPost } from './blogContent'

const copy = {
  it: {
    eyebrow: 'DAL BLOG',
    title: 'Idee, appunti e lavoro in corso.',
    loading: 'Caricamento articoli…',
    empty: 'Non ci sono ancora articoli pubblicati.',
    error: 'Il Blog non è disponibile al momento.',
  },
  en: {
    eyebrow: 'FROM THE BLOG',
    title: 'Ideas, notes and work in progress.',
    loading: 'Loading articles…',
    empty: 'No articles are published yet.',
    error: 'The Blog is not available right now.',
  },
} as const

export function BlogEngagementSection() {
  const { language } = usePortfolioContent()
  const backend = usePortfolioBackend()
  const route = resolveLocalizedRoute(useLocation().pathname)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!backend) {
      setPosts([])
      setStatus('ready')
      return
    }
    let active = true
    setStatus('loading')
    void loadBlogPosts(backend, language)
      .then((nextPosts) => {
        if (!active) return
        setPosts(nextPosts.slice(0, 3))
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [backend, language])

  if (!route || route.page === 'blog' || route.page === 'blogDetail') return null
  if (!backend) return null
  const labels = copy[language]

  return (
    <PageSection aria-labelledby="blog-engagement-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography color="secondary.main" variant="overline">
              {labels.eyebrow}
            </Typography>
            <Typography component="h2" id="blog-engagement-title" variant="h3">
              {labels.title}
            </Typography>
          </Stack>
          {status === 'loading' ? <CircularProgress aria-label={labels.loading} size={28} /> : null}
          {status === 'error' ? <Alert severity="error">{labels.error}</Alert> : null}
          {status === 'ready' && posts.length === 0 ? (
            <Typography>{labels.empty}</Typography>
          ) : null}
          {posts.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
              }}
            >
              {posts.map((post) => (
                <BlogCard key={post.stable_id} language={language} post={post} />
              ))}
            </Box>
          ) : null}
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
