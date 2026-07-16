import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { getRoutePath, type Language } from '../../routes/routeConfig'

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
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          alignItems: 'center',
          bgcolor: 'secondary.main',
          border: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
          borderRadius: `${theme.digitalStudio.radii.sm}px`,
          boxShadow: theme.digitalStudio.shadows.small,
          color: 'secondary.contrastText',
          display: 'inline-flex',
          flex: '0 0 auto',
          fontFamily: theme.typography.h4.fontFamily,
          fontWeight: 900,
          height: theme.spacing(12),
          justifyContent: 'center',
          width: theme.spacing(12),
        })}
      >
        NP
      </Box>
      <Typography
        component="span"
        sx={{ fontWeight: 900, lineHeight: 1.1, minWidth: 0 }}
        variant="h6"
      >
        Niccolò Piazzi
      </Typography>
    </IdentityLink>
  )
}
