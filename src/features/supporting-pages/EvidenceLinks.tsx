import { Box, Stack, Typography } from '@mui/material'
import { ExternalLink } from '../../components/actions/AppLink'
import type { Language } from '../../routes/routeConfig'

type Evidence = {
  evidenceId: string
  label: string
  description: string
  url: string
}

type EvidenceLinksProps = {
  evidence: Array<Evidence | undefined>
  language: Language
  heading: string
  title: string
  variant?: 'default' | 'skills'
}

export function EvidenceLinks({
  evidence,
  language,
  heading,
  title,
  variant = 'default',
}: EvidenceLinksProps) {
  const items = evidence.filter((item): item is Evidence => item !== undefined).slice(0, 2)
  const skillsVariant = variant === 'skills'

  return (
    <Box
      component="section"
      aria-labelledby={`${heading}-evidence-title`}
      sx={(theme) => ({
        ...(skillsVariant
          ? {
              borderBlockStart: `2px solid ${theme.digitalStudio.colors.border}`,
              mt: 2,
              pt: 3,
            }
          : { mt: 1 }),
      })}
    >
      <Typography component="h4" id={`${heading}-evidence-title`} variant="h6">
        {title}
      </Typography>
      <Stack
        component="ul"
        spacing={skillsVariant ? 1.5 : 1}
        sx={{ listStyle: 'none', m: 0, mt: skillsVariant ? 2 : 1, p: 0 }}
      >
        {items.map((item) => (
          <Box component="li" key={item.evidenceId}>
            <ExternalLink
              href={item.url}
              language={language}
              newTab
              sx={(theme) =>
                skillsVariant
                  ? {
                      alignItems: 'center',
                      borderBlockEnd: `2px solid ${theme.palette.warning.main}`,
                      display: 'inline-flex',
                      fontSize: 'clamp(0.95rem, 0.9rem + 0.15vw, 1.05rem)',
                      fontWeight: 900,
                      lineHeight: 1.35,
                      maxWidth: '100%',
                      paddingBlock: 0.75,
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: 'warning.main',
                        color: 'warning.contrastText',
                      },
                      '&:focus-visible': {
                        outline: `3px solid ${theme.digitalStudio.colors.focusOuter}`,
                        outlineOffset: 3,
                      },
                    }
                  : { fontSize: '0.95rem', fontWeight: 800 }
              }
            >
              {item.label}
            </ExternalLink>
            <Typography
              color="text.secondary"
              component="p"
              sx={
                skillsVariant
                  ? { fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.55, mt: 0.75 }
                  : { fontSize: '0.9rem', mt: 0.25 }
              }
            >
              {item.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
