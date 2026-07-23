import { Box, Stack, Typography } from '@mui/material'
import { ExternalLink } from '../../components/actions/AppLink'
import type { Language } from '../../routes/routeConfig'

type MethodResource = {
  id: string
  label: string
  url: string
  language?: 'it' | 'en' | undefined
  note?: string | undefined
  sx?: object | undefined
}

type MethodResourceLinksProps = {
  id: string
  language: Language
  resources: MethodResource[]
  title: string
  sx?: object | undefined
}

export function MethodResourceLinks({
  id,
  language,
  resources,
  title,
  sx,
}: MethodResourceLinksProps) {
  return (
    <Box sx={sx}>
      <Typography component="h3" id={`${id}-title`} variant="h6">
        {title}
      </Typography>
      <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, mt: 1.5, p: 0 }}>
        {resources.map((resource) => (
          <Box component="li" key={resource.id}>
            <ExternalLink href={resource.url} language={language} newTab>
              {resource.label}
            </ExternalLink>
            {resource.note || resource.language ? (
              <Typography
                color="text.secondary"
                component="p"
                sx={{ fontSize: '0.9rem', mt: 0.25 }}
              >
                {resource.note}
                {resource.note && resource.language ? ' · ' : null}
                {resource.language ? (resource.language === 'it' ? 'Italiano' : 'English') : null}
              </Typography>
            ) : null}
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
