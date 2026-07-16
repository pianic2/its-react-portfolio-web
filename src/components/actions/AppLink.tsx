import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import { Box, Button, Link as MuiLink, type ButtonProps, type LinkProps } from '@mui/material'
import { Link, type LinkProps as RouterLinkProps } from 'react-router-dom'
import type { Language } from '../../routes/routeConfig'

export type InternalLinkProps = Omit<LinkProps, 'component' | 'href'> & {
  to: RouterLinkProps['to']
}

export function InternalLink({ to, ...props }: InternalLinkProps) {
  return <MuiLink component={Link} to={to} {...props} />
}

type ExternalLinkProps = Omit<LinkProps, 'href'> & {
  href: string
  language: Language
  newTab?: boolean
}

const newTabCopy: Record<Language, string> = {
  it: 'si apre in una nuova scheda',
  en: 'opens in a new tab',
}

export function ExternalLink({
  children,
  href,
  language,
  newTab = false,
  ...props
}: ExternalLinkProps) {
  return (
    <MuiLink
      href={href}
      rel={newTab ? 'noopener noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
      {...props}
    >
      <Box component="span" sx={{ alignItems: 'baseline', display: 'inline-flex', gap: 1 }}>
        {children}
        <OpenInNewRounded aria-hidden="true" fontSize="inherit" />
        {newTab ? (
          <Box
            component="span"
            sx={{
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              height: 1,
              left: 0,
              margin: -1,
              overflow: 'hidden',
              padding: 0,
              position: 'absolute',
              top: 0,
              whiteSpace: 'nowrap',
              width: 1,
            }}
          >
            ({newTabCopy[language]})
          </Box>
        ) : null}
      </Box>
    </MuiLink>
  )
}

export type ExternalButtonLinkProps = Omit<ButtonProps<'a'>, 'component' | 'href'> & {
  href: string
  language: Language
  newTab?: boolean
}

export function ExternalButtonLink({
  children,
  href,
  language,
  newTab = false,
  ...props
}: ExternalButtonLinkProps) {
  return (
    <Button
      component="a"
      href={href}
      rel={newTab ? 'noopener noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
      {...props}
    >
      {children}
      {newTab ? (
        <Box
          component="span"
          sx={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: 1,
          }}
        >
          ({newTabCopy[language]})
        </Box>
      ) : null}
    </Button>
  )
}

export type ButtonLinkProps = Omit<ButtonProps<typeof Link>, 'component' | 'href'>

export function ButtonLink(props: ButtonLinkProps) {
  return <Button component={Link} {...props} />
}
