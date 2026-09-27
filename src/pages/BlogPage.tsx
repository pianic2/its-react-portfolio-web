import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ButtonLink, InternalLink } from '../components/actions/AppLink'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { EditorialSectionHeader } from '../components/layout/EditorialSectionHeader'
import { StudioCard } from '../components/surfaces/StudioCard'
import { usePortfolioContent } from '../content/context'
import { BackendError, usePortfolioBackend } from '../services/backend'
import { BlogCard } from '../features/blog/BlogCard'
import { loadBlogPost, loadBlogPosts, type BlogPost } from '../features/blog/blogContent'
import { renderRichText } from '../features/blog/richText'
import { getRoutePath } from '../routes/routeConfig'
import { SeoMetadata } from '../seo/SeoMetadata'
import { NotFoundPage } from './NotFoundPage'

export function BlogPage() {
  const { language } = usePortfolioContent()
  const { slug } = useParams()
  const backend = usePortfolioBackend()
  const requestIdentity = `${language}:${slug ?? ''}`
  const [articles, setArticles] = useState<BlogPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<Error | null>(null)
  const [loadedIdentity, setLoadedIdentity] = useState(requestIdentity)
  const [requestAttempt, setRequestAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setArticles([])
    setStatus('loading')
    setError(null)
    setLoadedIdentity(requestIdentity)
    const request = slug
      ? loadBlogPost(backend, language, slug).then((article) => (article ? [article] : []))
      : loadBlogPosts(backend, language)
    void request
      .then((nextArticles) => {
        if (!active) return
        setArticles(nextArticles)
        setStatus('ready')
      })
      .catch((reason: unknown) => {
        if (!active) return
        setError(reason instanceof Error ? reason : new Error('The Blog could not be loaded.'))
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [backend, language, requestAttempt, requestIdentity, slug])

  const detail = Boolean(slug)
  const requestIsCurrent = loadedIdentity === requestIdentity
  const visibleArticles = requestIsCurrent ? articles : []
  const visibleStatus = requestIsCurrent ? status : 'loading'
  const article = visibleArticles[0]
  const seoOverrides = useMemo(() => {
    if (!detail || !article) return undefined
    const image =
      typeof article.featured_image === 'string'
        ? article.featured_image
        : article.featured_image?.url
    const publishedTime = article.meta.first_published_at ?? article.publication_date
    return {
      title: `${article.title} | Blog ITS Prodigi`,
      description: createSeoDescription(article.excerpt ?? article.body ?? article.title),
      type: 'article' as const,
      ...(image ? { image } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    }
  }, [article, detail])
  const labels =
    language === 'it'
      ? {
          loading: 'Caricamento blog',
          notConfigured: 'Il servizio del blog non è configurato.',
          unavailable: 'Il blog non può essere caricato al momento.',
          invalidResponse: 'La risposta del blog non può essere letta.',
          empty: 'Non ci sono ancora articoli disponibili.',
          retry: 'Riprova',
          home: 'Torna al portfolio',
        }
      : {
          loading: 'Loading Blog',
          notConfigured: 'Blog service is not configured.',
          unavailable: 'The Blog could not be loaded.',
          invalidResponse: 'The Blog response could not be read.',
          empty: 'No articles are available yet.',
          retry: 'Try again',
          home: 'Back to the portfolio',
        }
  const errorMessage =
    error instanceof BackendError
      ? error.kind === 'not-configured'
        ? labels.notConfigured
        : error.kind === 'invalid-response'
          ? labels.invalidResponse
          : labels.unavailable
      : labels.unavailable

  if (detail && visibleStatus === 'ready' && visibleArticles.length === 0) {
    return <NotFoundPage language={language} />
  }

  return (
    <PageSection aria-labelledby="blog-page-title" spacing="spacious">
      <PageContainer sx={{ paddingBlock: { xs: 2, sm: 3, md: 5 } }}>
        {seoOverrides ? <SeoMetadata overrides={seoOverrides} /> : null}
        <Stack spacing={{ xs: 6, md: 10 }}>
          {detail ? (
            article ? (
              <DetailHeader article={article} language={language} />
            ) : (
              <Typography component="h1" id="blog-page-title" variant="h1">
                Blog
              </Typography>
            )
          ) : (
            <EditorialSectionHeader
              description={
                language === 'it'
                  ? 'Un laboratorio editoriale su tecnologia, prodotto, metodo e sistemi che diventano più chiari quando vengono messi alla prova.'
                  : 'An editorial lab for technology, product, method and systems that become clearer when put to the test.'
              }
              eyebrow={language === 'it' ? 'BLOG / IDEE IN MOVIMENTO' : 'BLOG / IDEAS IN MOTION'}
              headingLevel="h1"
              id="blog-page-title"
              layout="single"
              subtitle={
                language === 'it'
                  ? 'Pensiero pratico, segnali dal mondo e lavoro in corso.'
                  : 'Practical thinking, signals from the world and work in progress.'
              }
              title={
                language === 'it'
                  ? 'Idee grandi abbastanza da cambiare il modo di lavorare.'
                  : 'Ideas big enough to change how we work.'
              }
              titleMaxWidth="18ch"
            />
          )}
          {visibleStatus === 'loading' ? (
            <CircularProgress aria-label={labels.loading} size={32} />
          ) : null}
          {visibleStatus === 'error' ? (
            <Alert
              action={
                <Button
                  color="inherit"
                  onClick={() => setRequestAttempt((attempt) => attempt + 1)}
                  size="small"
                >
                  {labels.retry}
                </Button>
              }
              severity="error"
            >
              {errorMessage}
            </Alert>
          ) : null}
          {visibleStatus === 'ready' && visibleArticles.length === 0 ? (
            <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Typography component="output">{labels.empty}</Typography>
              <ButtonLink to={getRoutePath('home', language)} variant="outlined">
                {labels.home}
              </ButtonLink>
            </Stack>
          ) : null}
          {detail && article ? <BlogDetail article={article} language={language} /> : null}
          {!detail && visibleArticles.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 4, md: 5 },
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              }}
            >
              {visibleArticles.map((article) => (
                <BlogCard key={article.stable_id} language={language} post={article} />
              ))}
            </Box>
          ) : null}
        </Stack>
      </PageContainer>
    </PageSection>
  )
}

function DetailHeader({ article, language }: { article: BlogPost; language: 'it' | 'en' }) {
  return (
    <Stack spacing={3}>
      <ButtonLink
        startIcon={<ArrowBackRounded aria-hidden="true" />}
        sx={{ alignSelf: 'flex-start', minHeight: 44 }}
        to={getRoutePath('blog', language)}
        variant="text"
      >
        {language === 'it' ? 'Torna al blog' : 'Back to the blog'}
      </ButtonLink>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.digitalStudio.colors.surfaceStrong,
          backgroundImage: theme.digitalStudio.patterns.halftone,
          borderBlockEnd: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
          borderInlineStart: `${theme.digitalStudio.borderWidths.hero}px solid ${theme.palette.secondary.main}`,
          color: theme.digitalStudio.colors.text,
          p: { xs: 3, sm: 5, md: 7 },
        })}
      >
        <Typography color="secondary.main" variant="overline">
          {language === 'it' ? 'ARTICOLO / APPROFONDIMENTO' : 'ARTICLE / DEEP DIVE'}
        </Typography>
        <Typography
          component="h1"
          id="blog-page-title"
          sx={{ fontSize: { xs: '2.5rem', sm: '4rem', md: '5.5rem' }, maxWidth: '14ch', mt: 2 }}
          variant="h1"
        >
          {article.title}
        </Typography>
      </Box>
    </Stack>
  )
}

function BlogDetail({ article, language }: { article: BlogPost; language: 'it' | 'en' }) {
  const image =
    typeof article.featured_image === 'string'
      ? article.featured_image
      : article.featured_image?.url
  const imageAlt =
    article.featured_image && typeof article.featured_image === 'object'
      ? (article.featured_image.alt ?? '')
      : ''
  const publishedAt = article.meta.first_published_at ?? article.publication_date
  const updatedAt = article.meta.last_published_at
  const readingMinutes = estimateReadingMinutes(article.body ?? article.excerpt ?? '')
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 6, lg: 10 },
        gridTemplateColumns: { lg: 'minmax(0, 1fr) 18rem' },
      }}
    >
      <Stack component="article" spacing={{ xs: 5, md: 7 }} sx={{ minWidth: 0, maxWidth: '76ch' }}>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip
            color="secondary"
            label={language === 'it' ? 'Editoriale' : 'Editorial'}
            size="small"
          />
          <Chip label={`${readingMinutes} min`} size="small" variant="outlined" />
          {publishedAt ? (
            <Typography
              color="text.secondary"
              component="time"
              dateTime={publishedAt}
              sx={{ alignSelf: 'center' }}
            >
              {formatDate(publishedAt, language)}
            </Typography>
          ) : null}
        </Stack>
        {article.excerpt ? (
          <StudioCard
            variant="featured"
            sx={(theme) => ({
              borderInlineStart: `${theme.digitalStudio.borderWidths.hero}px solid ${theme.palette.warning.main}`,
              backgroundImage: theme.digitalStudio.patterns.halftone,
              p: { xs: 3, sm: 5 },
            })}
          >
            <Typography sx={{ fontSize: { sm: '1.35rem' }, fontWeight: 800 }} variant="h5">
              {article.excerpt}
            </Typography>
          </StudioCard>
        ) : null}
        {image ? (
          <Box
            alt={imageAlt}
            component="img"
            decoding="async"
            height={
              article.featured_image && typeof article.featured_image === 'object'
                ? article.featured_image.height
                : undefined
            }
            src={image}
            sx={{ borderRadius: 2, maxWidth: '100%', height: 'auto', width: '100%' }}
            width={
              article.featured_image && typeof article.featured_image === 'object'
                ? article.featured_image.width
                : undefined
            }
          />
        ) : null}
        {article.body ? (
          <Box
            dangerouslySetInnerHTML={{ __html: renderRichText(article.body) }}
            sx={(theme) => ({
              backgroundColor: 'transparent',
              p: { xs: 1, sm: 2, md: 3 },
              fontSize: { sm: '1.15rem' },
              lineHeight: 1.8,
              '& h2, & h3, & h4': { lineHeight: 1.15, mt: 4, mb: 1.5 },
              '& h2': { fontSize: { xs: '1.8rem', sm: '2.2rem' } },
              '& h3': { fontSize: { xs: '1.45rem', sm: '1.75rem' } },
              '& p': { mb: 2.5 },
              '& a': { color: theme.palette.secondary.main, fontWeight: 800 },
              '& blockquote': {
                borderInlineStart: `4px solid ${theme.palette.warning.main}`,
                m: 0,
                my: 3,
                pl: 3,
                fontStyle: 'italic',
              },
              '& ul, & ol': { pl: 3, mb: 2.5 },
              '& li': { mb: 1 },
              '& pre': {
                backgroundColor: theme.digitalStudio.colors.surfaceStrong,
                border: `1px solid ${theme.digitalStudio.colors.border}`,
                borderRadius: `${theme.digitalStudio.radii.md}px`,
                overflowX: 'auto',
                p: 2,
              },
              '& code': {
                backgroundColor: theme.digitalStudio.colors.surfaceStrong,
                borderRadius: `${theme.digitalStudio.radii.xs}px`,
                fontFamily: 'monospace',
                px: 0.5,
              },
              '& pre code': { backgroundColor: 'transparent', p: 0 },
              '& img': {
                borderRadius: `${theme.digitalStudio.radii.md}px`,
                height: 'auto',
                maxWidth: '100%',
              },
              '& hr': {
                border: 0,
                borderTop: `2px solid ${theme.digitalStudio.colors.border}`,
                my: 4,
              },
            })}
          />
        ) : null}
      </Stack>
      <BlogDetailSidebar
        article={article}
        language={language}
        publishedAt={publishedAt}
        updatedAt={updatedAt}
      />
    </Box>
  )
}

function BlogDetailSidebar({
  article,
  language,
  publishedAt,
  updatedAt,
}: {
  article: BlogPost
  language: 'it' | 'en'
  publishedAt: string | null | undefined
  updatedAt: string | null | undefined
}) {
  const it = language === 'it'
  return (
    <Stack
      component="aside"
      spacing={3}
      sx={{ alignSelf: 'start', position: { lg: 'sticky' }, top: { lg: 144 } }}
    >
      <StudioCard variant="featured" sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography component="h2" sx={{ fontWeight: 900 }} variant="h6">
          {it ? 'In questo articolo' : 'Article notes'}
        </Typography>
        <Stack divider={<Divider flexItem />} spacing={2} sx={{ mt: 2 }}>
          {publishedAt ? (
            <Fact
              label={it ? 'Pubblicato' : 'Published'}
              value={formatDate(publishedAt, language)}
            />
          ) : null}
          {updatedAt ? (
            <Fact
              label={it ? 'Ultimo aggiornamento' : 'Last updated'}
              value={formatDate(updatedAt, language)}
            />
          ) : null}
          <Fact
            label={it ? 'Tempo di lettura' : 'Reading time'}
            value={`${estimateReadingMinutes(article.body ?? '')} min`}
          />
        </Stack>
      </StudioCard>
      <StudioCard sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography component="h2" sx={{ fontWeight: 900 }} variant="h6">
          {it ? 'Link utili' : 'Useful links'}
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <InternalLink to={getRoutePath('blog', language)}>
            {it ? 'Tutti gli articoli' : 'All articles'}
          </InternalLink>
          <InternalLink to={getRoutePath('projects', language)}>
            {it ? 'Progetti e casi' : 'Projects and cases'}
          </InternalLink>
          <InternalLink to={getRoutePath('contact', language)}>
            {it ? 'Parliamone' : 'Get in touch'}
          </InternalLink>
        </Stack>
      </StudioCard>
      <ButtonLink
        endIcon={<ArrowForwardRounded aria-hidden="true" />}
        to={getRoutePath('blog', language)}
        variant="outlined"
      >
        {it ? 'Esplora il blog' : 'Explore the blog'}
      </ButtonLink>
    </Stack>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography color="text.secondary" variant="overline">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800 }}>{value}</Typography>
    </Box>
  )
}

function formatDate(value: string, language: 'it' | 'en') {
  return new Intl.DateTimeFormat(language === 'it' ? 'it-IT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function estimateReadingMinutes(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200))
}

function createSeoDescription(text: string) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  return normalized.length > 155 ? `${normalized.slice(0, 152).trimEnd()}…` : normalized
}
