import { Box, Stack } from '@mui/material'
import { getNavigation } from '../../content/loaders'
import { mainNavigationPages, type Language } from '../../routes/routeConfig'
import { NavigationLink } from './NavigationLink'

const navigationLabels: Record<Language, string> = {
  it: 'Navigazione principale',
  en: 'Main navigation',
}

type PrimaryNavigationProps = {
  language: Language
  onNavigate?: (() => void) | undefined
  orientation?: 'horizontal' | 'vertical'
}

export function PrimaryNavigation({
  language,
  onNavigate,
  orientation = 'horizontal',
}: PrimaryNavigationProps) {
  const vertical = orientation === 'vertical'
  const navigation = getNavigation(language).filter((item) =>
    mainNavigationPages.includes(item.page),
  )

  return (
    <Box aria-label={navigationLabels[language]} component="nav">
      <Stack
        component="ul"
        direction={vertical ? 'column' : 'row'}
        sx={{
          alignItems: vertical ? 'stretch' : 'center',
          gap: vertical ? 3 : 2,
          listStyle: 'none',
          m: 0,
          p: 0,
        }}
      >
        {navigation.map((item) => (
          <Box
            component="li"
            key={item.page}
            sx={{ minWidth: 0, width: vertical ? '100%' : 'auto' }}
          >
            <NavigationLink
              end={item.page === 'home'}
              fullWidth={vertical}
              onNavigate={onNavigate}
              to={item.href}
            >
              {item.label}
            </NavigationLink>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
