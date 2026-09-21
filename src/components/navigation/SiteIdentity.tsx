import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { getRoutePath, type Language } from '../../routes/routeConfig'
import { BrandLogo } from './BrandLogo'

const IdentityLink = styled(Link)(({ theme }) => {
  const { colors, focus, radii } = theme.digitalStudio

  return {
    alignItems: 'center',
    borderRadius: radii.md,
    color: colors.text,
    display: 'inline-flex',
    gap: theme.spacing(3),
    minWidth: 0,
    textDecoration: 'none',
    '&:focus-visible': {
      outline: `${focus.width}px solid ${colors.focusInner}`,
      outlineOffset: focus.offset,
    },
  }
})

const identityLabels: Record<Language, string> = {
  it: 'Niccolò Piazzi — Home',
  en: 'Niccolò Piazzi — Home',
}

type SiteIdentityProps = {
  language: Language
}

export function SiteIdentity({ language }: SiteIdentityProps) {
  return (
    <IdentityLink aria-label={identityLabels[language]} to={getRoutePath('home', language)}>
      <BrandLogo size="regular" />
    </IdentityLink>
  )
}
