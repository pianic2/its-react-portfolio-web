import AddRounded from '@mui/icons-material/AddRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import DeleteRounded from '@mui/icons-material/DeleteRounded'
import {
  Alert,
  Box,
  Button,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { ButtonLink, ExternalLink, InternalLink } from '../../components/actions/AppLink'
import { StudioIconButton } from '../../components/actions/StudioIconButton'
import { LanguageFlag } from '../../components/navigation/LanguageFlag'
import { MobileNavigationDrawer } from '../../components/navigation/MobileNavigationDrawer'
import { NavigationLink } from '../../components/navigation/NavigationLink'
import { PrimaryNavigation } from '../../components/navigation/PrimaryNavigation'
import { StudioCard } from '../../components/surfaces/StudioCard'
import { ShowcaseSection } from './ShowcaseSection'

export function PrimitiveShowcase() {
  const [navigationOpen, setNavigationOpen] = useState(false)

  return (
    <>
      <ShowcaseSection
        description="Use the real controls: Tab through them, hover, press, enter text and inspect disabled semantics."
        eyebrow="05 · Actions and forms"
        title="Material UI with a Digital Studio voice"
        wide
      >
        <Box
          sx={{
            display: 'grid',
            gap: 7,
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <Stack spacing={6} sx={{ minWidth: 0 }}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 4 }}>
              <Button variant="contained">Primary action</Button>
              <Button color="secondary" variant="contained">
                Secondary action
              </Button>
              <Button variant="outlined">Outlined action</Button>
              <Button variant="text">Text action</Button>
              <Button disabled variant="contained">
                Disabled action
              </Button>
            </Stack>

            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 4 }}>
              <StudioIconButton aria-label="Add example">
                <AddRounded />
              </StudioIconButton>
              <StudioIconButton aria-label="Delete example">
                <DeleteRounded />
              </StudioIconButton>
              <StudioIconButton aria-label="Disabled icon action" disabled>
                <CloseRounded />
              </StudioIconButton>
            </Stack>

            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
              <Chip color="primary" label="React" />
              <Chip color="secondary" label="TypeScript" />
              <Chip color="info" label="Material UI" />
              <Chip color="success" label="Accessible" />
            </Stack>

            <Alert severity="info">
              Colour is paired with copy, borders, icons or structure and is never the only signal.
            </Alert>
          </Stack>

          <Stack spacing={5} sx={{ minWidth: 0 }}>
            <TextField fullWidth helperText="Default helper text" label="Default field" />
            <TextField defaultValue="Persisted value" fullWidth label="Filled field" />
            <TextField
              error
              fullWidth
              helperText="Explain the validation problem"
              label="Error field"
            />
            <TextField disabled fullWidth label="Disabled field" />
          </Stack>
        </Box>
      </ShowcaseSection>

      <ShowcaseSection
        description="Navigation primitives keep links distinct from actions and expose destination or active state structurally."
        eyebrow="06 · Links and navigation"
        title="Semantic destinations and active state"
      >
        <Stack spacing={6}>
          <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
            <InternalLink to="/it/progetti">Internal project link</InternalLink>
            <ExternalLink href="https://example.com" language="en" newTab>
              External reference
            </ExternalLink>
            <ButtonLink to="/en/contact" variant="contained">
              Button link
            </ButtonLink>
          </Stack>

          <Box aria-label="Navigation state examples" component="nav">
            <Stack
              component="ul"
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ gap: 3, listStyle: 'none', m: 0, p: 0 }}
            >
              <Box component="li" sx={{ display: 'block' }}>
                <NavigationLink end to="/__dev/design-system">
                  Current showcase route
                </NavigationLink>
              </Box>
              <Box component="li" sx={{ display: 'block' }}>
                <NavigationLink to="/en">Inactive destination</NavigationLink>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ overflowX: 'auto', pb: 3 }}>
            <PrimaryNavigation language="en" />
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ alignItems: 'flex-start', gap: 4 }}
          >
            <Button onClick={() => setNavigationOpen(true)} variant="outlined">
              Open navigation preview
            </Button>
            <Typography color="text.secondary" variant="body2">
              The preview uses the real temporary Drawer, focus trap, Escape handling and focus
              restoration.
            </Typography>
          </Stack>
        </Stack>
      </ShowcaseSection>

      <ShowcaseSection
        description="Flag graphics are content semantics. Application surfaces continue to use theme tokens."
        eyebrow="07 · Language graphics"
        title="Custom Italian and British flags"
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 4 }}>
          <ButtonLink startIcon={<LanguageFlag language="it" />} to="/it" variant="outlined">
            Italian shell
          </ButtonLink>
          <ButtonLink startIcon={<LanguageFlag language="en" />} to="/en" variant="outlined">
            English shell
          </ButtonLink>
        </Stack>
      </ShowcaseSection>

      <ShowcaseSection
        description="Both variants reserve their offset-shadow footprint and remain non-interactive until they contain an explicit destination or action."
        eyebrow="08 · Surfaces"
        title="Standard and featured cards"
        wide
      >
        <Box
          sx={{
            display: 'grid',
            gap: 6,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <StudioCard component="article">
            <CardContent>
              <Stack spacing={3}>
                <Chip label="Standard" sx={{ alignSelf: 'flex-start' }} />
                <Typography component="h3" variant="h4">
                  Reusable surface
                </Typography>
                <Typography color="text.secondary">
                  Suitable for ordinary evidence, summaries and grouped interface content.
                </Typography>
              </Stack>
            </CardContent>
          </StudioCard>

          <StudioCard component="article" variant="featured">
            <CardContent>
              <Stack spacing={3}>
                <Chip color="warning" label="Featured" sx={{ alignSelf: 'flex-start' }} />
                <Typography component="h3" variant="h4">
                  Stronger visual priority
                </Typography>
                <Typography color="text.secondary">
                  Uses the semantic strong surface and the largest bounded graphic shadow.
                </Typography>
              </Stack>
            </CardContent>
          </StudioCard>
        </Box>
      </ShowcaseSection>

      <MobileNavigationDrawer
        language="en"
        onClose={() => setNavigationOpen(false)}
        open={navigationOpen}
      />
    </>
  )
}
