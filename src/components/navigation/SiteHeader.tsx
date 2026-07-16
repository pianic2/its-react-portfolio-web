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
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar,
      })}
    >
      <PageContainer
        sx={(theme) => ({
          paddingBlockEnd: `${theme.digitalStudio.layout.shadowClearance}px`,
          paddingBlockStart: `max(${theme.digitalStudio.layout.pageGutter.compact}px, env(safe-area-inset-top))`,
          [theme.breakpoints.up('md')]: {
            paddingBlockStart: `max(${theme.digitalStudio.layout.pageGutter.regular}px, env(safe-area-inset-top))`,
          },
        })}
      >
        <Paper
          sx={(theme) => ({
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: theme.digitalStudio.shadows.large,
            display: 'grid',
            gap: 4,
            gridTemplateColumns: { xs: 'minmax(0, 1fr) auto', lg: 'auto 1fr auto' },
            minWidth: 0,
            px: {
              xs: `${theme.digitalStudio.layout.panelInset.compact}px`,
              lg: `${theme.digitalStudio.layout.panelInset.regular}px`,
            },
            py: 3,
          })}
        >
          <Box sx={{ gridColumn: '1', gridRow: '1', minWidth: 0 }}>
            <SiteIdentity language={language} />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              gridColumn: { lg: '1 / -1', xl: '2' },
              gridRow: { lg: '2', xl: '1' },
              justifySelf: { lg: 'stretch', xl: 'center' },
              minWidth: 0,
            }}
          >
            <PrimaryNavigation language={language} />
          </Box>

          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              display: { xs: 'none', lg: 'flex' },
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
              display: { xs: 'inline-flex', lg: 'none' },
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
