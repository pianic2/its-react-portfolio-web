import { Stack, Typography } from '@mui/material'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import type { Language } from '../../routes/routeConfig'
import { SupportingPageCta } from './SupportingPageCtas'

type ResolvedCta = {
  kind: 'internal' | 'external' | 'anchor'
  label: string
  href: string
  analyticsId?: string | undefined
}

type PopArtConversionSectionProps = {
  description: string
  id: string
  language: Language
  primaryCta: ResolvedCta
  secondaryCta: ResolvedCta
  title: string
  microcopy?: string
  containerMaxWidth?: number
}

export function PopArtConversionSection({
  description,
  id,
  language,
  primaryCta,
  secondaryCta,
  title,
  microcopy,
  containerMaxWidth,
}: PopArtConversionSectionProps) {
  return (
    <PageSection
      aria-labelledby={id}
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor: theme.palette.warning.main,
        backgroundImage: theme.digitalStudio.patterns.conversionHalftone,
        backgroundSize: '18px 18px',
        color: theme.palette.warning.contrastText,
      })}
    >
      <PageContainer sx={containerMaxWidth ? { maxInlineSize: containerMaxWidth } : undefined}>
        <Stack spacing={3} sx={{ maxWidth: '60rem' }}>
          <Typography component="h2" id={id} variant="h2">
            {title}
          </Typography>
          <Typography sx={{ fontSize: { sm: '1.1rem' }, maxWidth: '62ch' }}>
            {description}
          </Typography>
          {microcopy ? <Typography sx={{ fontWeight: 900 }}>{microcopy}</Typography> : null}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <SupportingPageCta cta={primaryCta} language={language} emphasis="primary" />
            <SupportingPageCta cta={secondaryCta} language={language} />
          </Stack>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
