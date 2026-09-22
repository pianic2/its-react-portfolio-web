import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { createPortfolioBackend, type BackendPage } from '../services/backend/adapter'
import { usePortfolioContent } from '../content/context'

function BlogArticle({ article }: { article: BackendPage }) {
  return (
    <article>
      <Typography component="h2" variant="h3">
        {typeof article.title === 'string' ? article.title : 'Blog post'}
      </Typography>
      {typeof article.excerpt === 'string' ? <Typography>{article.excerpt}</Typography> : null}
    </article>
  )
}

export function BlogPage() {
  const { language } = usePortfolioContent()
  const { slug } = useParams()
  const [articles, setArticles] = useState<BackendPage[]>([])
  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_API_URL
    if (!base) return
    const backend = createPortfolioBackend(base)
    void (slug
      ? backend
          .findBySlug('portfolio.BlogPostPage', language, slug)
          .then((article) => setArticles(article ? [article] : []))
      : backend
          .listPages(
            'portfolio.BlogPostPage',
            language,
            'stable_id,excerpt,publication_date,body,featured_image',
          )
          .then(setArticles))
  }, [language, slug])

  return (
    <PageSection aria-labelledby="blog-page-title">
      <PageContainer>
        <Stack spacing={3}>
          <Typography component="h1" id="blog-page-title" variant="h2">
            {slug ? 'Blog' : 'Blog'}
          </Typography>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <BlogArticle key={String(article.stable_id ?? index)} article={article} />
            ))
          ) : (
            <Typography>No articles are available yet.</Typography>
          )}
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
