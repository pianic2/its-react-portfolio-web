import { ArrowForwardRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
  ButtonLink,
  ExternalButtonLink,
  ExternalLink,
  InternalLink,
} from '../../components/actions/AppLink'
import type { Language } from '../../routes/routeConfig'

type ResolvedCta = {
  kind: 'internal' | 'external' | 'anchor'
  label: string
  href: string
  analyticsId?: string | undefined
}

type SupportingPageCtaProps = {
  cta: ResolvedCta
  language: Language
  emphasis?: 'primary' | 'secondary' | 'link'
}

export function SupportingPageCta({
  cta,
  language,
  emphasis = 'secondary',
}: SupportingPageCtaProps) {
  if (emphasis === 'link') {
    if (cta.kind === 'internal') {
      return (
        <InternalLink data-analytics-id={cta.analyticsId} to={cta.href}>
          {cta.label}
        </InternalLink>
      )
    }

    return (
      <ExternalLink data-analytics-id={cta.analyticsId} href={cta.href} language={language} newTab>
        {cta.label}
      </ExternalLink>
    )
  }

  const variant = emphasis === 'primary' ? 'contained' : 'outlined'
  const props = {
    'data-analytics-id': cta.analyticsId,
    endIcon: <ArrowForwardRounded aria-hidden="true" />,
    variant,
  } as const

  if (cta.kind === 'internal') {
    return (
      <ButtonLink {...props} to={cta.href}>
        {cta.label}
      </ButtonLink>
    )
  }

  if (cta.kind === 'anchor') {
    return (
      <Button
        component="a"
        data-analytics-id={cta.analyticsId}
        endIcon={<ArrowForwardRounded aria-hidden="true" />}
        href={cta.href}
        variant={variant}
      >
        {cta.label}
      </Button>
    )
  }

  return (
    <ExternalButtonLink {...props} href={cta.href} language={language} newTab>
      {cta.label}
    </ExternalButtonLink>
  )
}
