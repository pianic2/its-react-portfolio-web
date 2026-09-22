import { Box, Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { getRoutePath, type Language } from '../../routes/routeConfig'
import type { BlogPost } from './blogContent'

export function BlogCard({ language, post }: { language: Language; post: BlogPost }) {
  const titleId = `blog-card-${post.stable_id}`
  return (
    <Card component="article" sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
        <Typography component="h2" id={titleId} variant="h4">
          <Box
            component={Link}
            to={getRoutePath('blogDetail', language, { slug: post.meta?.slug })}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {post.title}
          </Box>
        </Typography>
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
      </CardContent>
    </Card>
  )
}
