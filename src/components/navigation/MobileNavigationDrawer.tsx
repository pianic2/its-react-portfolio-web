import CloseRounded from '@mui/icons-material/CloseRounded'
import { Divider, Drawer, Stack, Typography } from '@mui/material'
import type { Language } from '../../routes/routeConfig'
import { StudioIconButton } from '../actions/StudioIconButton'
import { LanguageSwitch } from './LanguageSwitch'
import { PrimaryNavigation } from './PrimaryNavigation'
import { ThemeToggle } from './ThemeToggle'

const copy: Record<Language, { close: string; title: string }> = {
  it: { close: 'Chiudi navigazione', title: 'Navigazione' },
  en: { close: 'Close navigation', title: 'Navigation' },
}

type MobileNavigationDrawerProps = {
  language: Language
  onClose: () => void
  open: boolean
}

export function MobileNavigationDrawer({
  language,
  onClose,
  open,
}: MobileNavigationDrawerProps) {
  const labels = copy[language]

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: (theme) => {
            const { pageGutter, panelInset, shadowClearance } = theme.digitalStudio.layout
            const compactViewportReservation = pageGutter.compact * 2 + shadowClearance
            const maximumWidth = theme.breakpoints.values.sm - pageGutter.compact * 2

            return {
              bgcolor: 'background.paper',
              border: `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.border}`,
              borderRadius: `${theme.digitalStudio.radii.lg}px`,
              bottom: `max(${pageGutter.compact + shadowClearance}px, calc(env(safe-area-inset-bottom) + ${shadowClearance}px))`,
              boxShadow: theme.digitalStudio.shadows.large,
              height: 'auto',
              maxWidth: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              padding: `${panelInset.compact}px`,
              right: `max(${pageGutter.compact + shadowClearance}px, calc(env(safe-area-inset-right) + ${shadowClearance}px))`,
              top: `max(${pageGutter.compact}px, env(safe-area-inset-top))`,
              width: `min(calc(100vw - ${compactViewportReservation}px), ${maximumWidth}px)`,
            }
          },
        },
      }}
    >
      <Stack spacing={5} sx={{ minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component="h2" variant="h5">
            {labels.title}
          </Typography>
          <StudioIconButton aria-label={labels.close} onClick={onClose}>
            <CloseRounded />
          </StudioIconButton>
        </Stack>

        <PrimaryNavigation language={language} onNavigate={onClose} orientation="vertical" />
        <Divider />
        <Stack spacing={4}>
          <LanguageSwitch presentation="full" />
          <ThemeToggle language={language} presentation="full" />
        </Stack>
      </Stack>
    </Drawer>
  )
}
