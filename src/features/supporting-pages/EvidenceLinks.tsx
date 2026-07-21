import { Box, Stack, Typography } from '@mui/material'
import { ExternalLink } from '../../components/actions/AppLink'
import type { Language } from '../../routes/routeConfig'

type Evidence = {
  evidenceId: string
  label: string
  description: string
  url: string
}

type EvidenceLinksProps = {
  evidence: Array<Evidence | undefined>
  language: Language
  heading: string
  title: string
}

export function EvidenceLinks({ evidence, language, heading, title }: EvidenceLinksProps) {
  const items = evidence.filter((item): item is Evidence => item !== undefined).slice(0, 2)

  return (
    <Box component="section" aria-labelledby={`${heading}-evidence-title`} sx={{ mt: 1 }}>
      <Typography component="h4" id={`${heading}-evidence-title`} variant="h6">
        {title}
      </Typography>
      <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, mt: 1, p: 0 }}>
        {items.map((item) => (
          <Box component="li" key={item.evidenceId}>
            <ExternalLink
              href={item.url}
              language={language}
              newTab
              sx={{ fontSize: '0.95rem', fontWeight: 800 }}
            >
              {item.label}
            </ExternalLink>
            <Typography color="text.secondary" component="p" sx={{ fontSize: '0.9rem', mt: 0.25 }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
