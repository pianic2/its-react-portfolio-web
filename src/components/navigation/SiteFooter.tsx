import { Box, Stack, Typography } from '@mui/material'
import { getPageLabel, getSiteContent } from '../../content/loaders'
import { getRoutePath, type Language } from '../../routes/routeConfig'
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
  const content = getSiteContent(language)

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
            gap: { xs: 4, sm: 3 },
            justifyContent: 'space-between',
          }}
        >
          <Typography>
            © {currentYear} {content.identity.name}
          </Typography>
          <InternalLink
            sx={{ alignItems: 'center', display: 'inline-flex', minHeight: 44 }}
            to={getRoutePath('privacy', language)}
          >
            {getPageLabel(language, 'privacy')}
          </InternalLink>
        </Stack>
      </PageContainer>
    </Box>
  )
}
