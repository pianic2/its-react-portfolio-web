import { Box, CardContent, Stack, Typography, Chip } from '@mui/material'
import { ButtonLink } from '../../components/actions/AppLink'
import { ArrowForwardRounded } from '@mui/icons-material'
import { EditorialSectionHeader } from '../../components/layout/EditorialSectionHeader'
import { PageContainer } from '../../components/layout/PageContainer'
import { PageSection } from '../../components/layout/PageSection'
import { StudioCard } from '../../components/surfaces/StudioCard'
import { usePortfolioContent } from '../../content/context'
import { Icon } from '@iconify/react'
import { getRoutePath } from '../../routes/routeConfig'

export function SkillsSection({ variant }: { variant?: 'home' | 'other' }) {
  const { siteContent, language } = usePortfolioContent()
  const copy = siteContent.homePage.skills
  return (
    <PageSection aria-labelledby="home-skills-title" spacing="spacious">
      <PageContainer>
        <Stack spacing={4}>
          <EditorialSectionHeader {...copy} id="home-skills-title" />
          <Box
            data-testid="skill-groups"
            sx={{
              display: 'grid',
              gap: 8,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(6, minmax(0, 1fr))',
              },
            }}
          >
            {copy.groups.map((group, index) => (
              <StudioCard
                key={group.id}
                component="article"
                sx={{
                  backgroundColor: index % 2 === 0 ? 'background.paper' : 'background.default',
                  gridColumn: {
                    xs: 'span 6',
                    sm: 'span 3',
                    lg: index < 3 ? 'span 2' : 'span 3',
                  },
                  p: {
                    xs: 3,
                    md: 6,
                    lg: 8,
                  },
                }}
              >
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                  <Typography component="h3" variant="h5">
                    {group.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 2 }}>
                    {group.description}
                  </Typography>
                  {group.stack &&
                    group.stack.map((item, index) => (
                      <Chip
                        icon={item.icon ? <Icon icon={item.icon} color="text" /> : undefined}
                        label={item.text}
                        size="small"
                        variant="outlined"
                        sx={{ px: 3, py: 4, mr: 2, mt: 2, fontSize: '1.1rem', fontWeight: 700 }}
                      />
                    ))}
                </CardContent>
              </StudioCard>
            ))}

            {variant === 'home' ? (
              <ButtonLink
                endIcon={<ArrowForwardRounded aria-hidden="true" />}
                sx={{ alignSelf: 'flex-start', gridColumn: { xs: 'span 6', md: 'auto' } }}
                to={getRoutePath('projects', language)}
                variant="outlined"
              >
                {copy.labels.skillCtaLabel}
              </ButtonLink>
            ) : null}
          </Box>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
