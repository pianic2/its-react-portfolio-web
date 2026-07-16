import { Box, Stack, Typography } from '@mui/material'
import { getRoutePath, routeDefinitions, type Language } from '../../routes/routeConfig'
import { InternalLink } from '../actions/AppLink'
import { PageContainer } from '../layout/PageContainer'

const footerLabels: Record<Language, string> = {
  it: 'Piè di pagina',
  en: 'Footer',
}

type SiteFooterProps = {
  language: Language
}

export function SiteFooter({ language }: SiteFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      aria-label={footerLabels[language]}
      component="footer"
      sx={(theme) => ({
        borderTop: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
        marginBlockStart: 'auto',
        py: {
          xs: `${theme.digitalStudio.layout.pageGutter.regular}px`,
          md: `${theme.digitalStudio.layout.pageGutter.wide}px`,
        },
      })}
    >
      <PageContainer>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 3,
            justifyContent: 'space-between',
          }}
        >
          <Typography>© {currentYear} Niccolò Piazzi</Typography>
          <InternalLink to={getRoutePath('privacy', language)}>
            {routeDefinitions.privacy.labels[language]}
          </InternalLink>
        </Stack>
      </PageContainer>
    </Box>
  )
}
