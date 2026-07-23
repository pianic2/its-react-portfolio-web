import { Box, Chip, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import type { Language } from '../../routes/routeConfig'
import { MethodResourceLinks } from './MethodResourceLinks'
import { MethodPageContainer } from './MethodPageContainer'

type MethodFoundation = {
  eyebrow: string
  title: string
  body: string
  status: string
  closing: string
  resources: Parameters<typeof MethodResourceLinks>[0]['resources']
}

type MethodFoundationsSectionProps = {
  foundation: MethodFoundation
  language: Language
  resourcesTitle: string
}

export function MethodFoundationsSection({
  foundation,
  language,
  resourcesTitle,
}: MethodFoundationsSectionProps) {
  return (
    <PageSection
      aria-labelledby="method-foundations-title"
      data-testid="method-foundations"
      id="method-foundations"
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor: theme.digitalStudio.colors.surfaceStrong,
        backgroundImage: theme.digitalStudio.patterns.halftone,
        backgroundSize: '18px 18px',
      })}
    >
      <MethodPageContainer>
        <Typography variant="overline">{foundation.eyebrow}</Typography>
        <Typography component="h2" id="method-foundations-title" variant="h3">
          {foundation.title}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 8 },
            marginTop: { xs: 2, md: 8 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.5fr) minmax(0, 1fr)' },
          }}
        >
          <Typography sx={{ fontSize: { sm: '1.1rem' } }}>{foundation.body}</Typography>
          <Chip color="warning" label={foundation.status} sx={{ alignSelf: 'flex-start' }} />
          <Typography sx={{ fontWeight: 900 }}>{foundation.closing}</Typography>
          <MethodResourceLinks
            id="method-foundations-resources"
            language={language}
            resources={foundation.resources}
            title={resourcesTitle}
            sx={{ justifySelf: { md: 'flex-end' } }}
          />
        </Box>
      </MethodPageContainer>
    </PageSection>
  )
}
