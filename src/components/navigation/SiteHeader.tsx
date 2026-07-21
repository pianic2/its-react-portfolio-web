import MenuRounded from '@mui/icons-material/MenuRounded'
import { Box, Paper, Stack } from '@mui/material'
import { useState } from 'react'
import type { Language } from '../../routes/routeConfig'
import { StudioIconButton } from '../actions/StudioIconButton'
import { PageContainer } from '../layout/PageContainer'
import { LanguageSwitch } from './LanguageSwitch'
import { MobileNavigationDrawer } from './MobileNavigationDrawer'
import { PrimaryNavigation } from './PrimaryNavigation'
import { SiteIdentity } from './SiteIdentity'
import { ThemeToggle } from './ThemeToggle'

const menuLabels: Record<Language, string> = {
  it: 'Apri navigazione',
  en: 'Open navigation',
}

type SiteHeaderProps = {
  language: Language
}

export function SiteHeader({ language }: SiteHeaderProps) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

  return (
    <Box
      component="header"
      sx={(theme) => ({
        backgroundColor: theme.digitalStudio.colors.canvas,
        isolation: 'isolate',
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar,
      })}
    >
      <PageContainer
        sx={(theme) => ({
          paddingBlockEnd: `${theme.digitalStudio.layout.shadowClearance / 2}px`,
          paddingBlockStart: `max(${theme.digitalStudio.layout.pageGutter.compact / 2}px, env(safe-area-inset-top))`,
          [theme.breakpoints.up('md')]: {
            paddingBlockStart: `max(${theme.digitalStudio.layout.pageGutter.regular}px, env(safe-area-inset-top))`,
            paddingBlockEnd: `${theme.digitalStudio.layout.shadowClearance}px`,
          },
        })}
      >
        <Paper
          sx={(theme) => {
            const { colors, layout, radii, shadows, patterns } = theme.digitalStudio

            return {
              alignItems: 'center',
              bgcolor: colors.surface,
              color: theme.palette.getContrastText(colors.surface),
              backgroundImage: patterns.diagonal,
              borderRadius: `${radii.lg}px`,
              boxShadow: { xs: shadows.small, md: shadows.medium },
              minWidth: 0,
              overflow: 'hidden',
              pb: { xs: 1.25, md: 4 },
              position: 'relative',
              pt: { xs: 1.25, md: 4 },
              px: {
                xs: `${layout.panelInset.compact}px`,
                lg: `${layout.panelInset.regular}px`,
              },
              display: 'grid',
            }
          }}
        >
          <Box sx={{ gridColumn: '1', gridRow: '1', minWidth: 0 }}>
            <SiteIdentity language={language} />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', xl: 'block' },
              gridColumn: { xl: '2' },
              gridRow: { xl: '1' },
              justifySelf: { xl: 'center' },
              minWidth: 0,
            }}
          >
            <PrimaryNavigation language={language} />
          </Box>

          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              display: { xs: 'none', xl: 'flex' },
              gap: 2,
              gridColumn: '3',
              gridRow: '1',
              justifySelf: 'end',
            }}
          >
            <LanguageSwitch />
            <ThemeToggle language={language} />
          </Stack>

          <StudioIconButton
            aria-label={menuLabels[language]}
            onClick={() => setMobileNavigationOpen(true)}
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: { xs: 'inline-flex', xl: 'none' },
              gridColumn: '2',
              gridRow: '1',
              justifySelf: 'end',
            }}
          >
            <MenuRounded />
          </StudioIconButton>
        </Paper>
      </PageContainer>

      <MobileNavigationDrawer
        language={language}
        onClose={() => setMobileNavigationOpen(false)}
        open={mobileNavigationOpen}
      />
    </Box>
  )
}
