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
          sx: (theme) => ({
            bgcolor: 'background.default',
            borderLeft: `${theme.digitalStudio.borderWidths.hero}px solid ${theme.digitalStudio.colors.border}`,
            boxShadow: theme.digitalStudio.shadows.large,
            maxWidth: '100%',
            overflowX: 'hidden',
            paddingBlockEnd: `max(${theme.digitalStudio.layout.panelInset.compact}px, env(safe-area-inset-bottom))`,
            paddingBlockStart: `max(${theme.digitalStudio.layout.panelInset.compact}px, env(safe-area-inset-top))`,
            paddingInlineEnd: `max(${theme.digitalStudio.layout.panelInset.compact}px, env(safe-area-inset-right))`,
            paddingInlineStart: `${theme.digitalStudio.layout.panelInset.compact}px`,
            width: `min(100vw, ${theme.breakpoints.values.sm}px)`,
          }),
        },
      }}
    >
      <Stack spacing={6} sx={{ minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography component="h2" variant="h4">
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
