import { Box, Stack } from '@mui/material'
import {
  getRoutePath,
  mainNavigationPages,
  routeDefinitions,
  type Language,
} from '../../routes/routeConfig'
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
        {mainNavigationPages.map((page) => (
          <Box
            component="li"
            key={page}
            sx={{ minWidth: 0, width: vertical ? '100%' : 'auto' }}
          >
            <NavigationLink
              end={page === 'home'}
              fullWidth={vertical}
              onNavigate={onNavigate}
              to={getRoutePath(page, language)}
            >
              {routeDefinitions[page].labels[language]}
            </NavigationLink>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
