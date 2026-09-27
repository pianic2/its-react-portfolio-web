import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, CardContent, Stack, Typography } from '@mui/material'
import { ButtonLink, InternalLink } from '../../components/actions/AppLink'
import { StudioCard } from '../../components/surfaces/StudioCard'
import { getRoutePath, type Language } from '../../routes/routeConfig'
import type { BlogPost } from './blogContent'

const copy = {
  it: { read: 'Leggi l’articolo', published: 'Pubblicato il' },
  en: { read: 'Read the article', published: 'Published on' },
} as const

export function BlogCard({ language, post }: { language: Language; post: BlogPost }) {
  const titleId = `blog-card-${post.stable_id}`
  const labels = copy[language]
  const detailPath = getRoutePath('blogDetail', language, { slug: post.meta.slug })
  const image =
    typeof post.featured_image === 'string' ? post.featured_image : post.featured_image?.url
  const imageAlt =
    post.featured_image && typeof post.featured_image === 'object'
      ? (post.featured_image.alt ?? '')
      : ''
  const imageWidth =
    post.featured_image && typeof post.featured_image === 'object'
      ? post.featured_image.width
      : undefined
  const imageHeight =
    post.featured_image && typeof post.featured_image === 'object'
      ? post.featured_image.height
      : undefined

  return (
    <StudioCard
      aria-labelledby={titleId}
      component="article"
      sx={{
        blockSize: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: (theme) =>
          `transform ${theme.digitalStudio.motion.duration.fast}ms ${theme.digitalStudio.motion.easing.standard}`,
        '&:focus-within': { outline: 'none' },
        '@media (hover: hover)': { '&:hover': { transform: 'translateY(-4px)' } },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      {image ? (
        <Box
          alt={imageAlt}
          component="img"
          decoding="async"
          height={imageHeight}
          loading="lazy"
          src={image}
          sx={{ aspectRatio: '16 / 7', display: 'block', objectFit: 'cover', width: '100%' }}
          width={imageWidth}
        />
      ) : null}
      <CardContent
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: 2,
          p: { xs: 4, sm: 5 },
          '&:last-child': { pb: { xs: 4, sm: 5 } },
        }}
      >
        <Stack spacing={1.5}>
          <Typography color="secondary.main" variant="overline">
            {labels.published}
          </Typography>
          <Typography component="h2" id={titleId} sx={{ letterSpacing: 0 }} variant="h4">
            <InternalLink
              aria-label={`${post.title} — ${labels.read}`}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              to={detailPath}
            >
              {post.title}
            </InternalLink>
          </Typography>
        </Stack>
        {post.publication_date ? (
          <Typography
            color="text.secondary"
            component="time"
            dateTime={post.publication_date}
            variant="body2"
          >
            {post.publication_date}
          </Typography>
        ) : null}
        {post.excerpt ? <Typography color="text.secondary">{post.excerpt}</Typography> : null}
        <ButtonLink
          endIcon={<ArrowForwardRounded aria-hidden="true" />}
          sx={{
            alignSelf: { xs: 'stretch', sm: 'flex-start' },
            marginBlockStart: 'auto',
            minHeight: 44,
          }}
          to={detailPath}
          variant="outlined"
        >
          {labels.read}
        </ButtonLink>
      </CardContent>
    </StudioCard>
  )
}
