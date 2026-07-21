import { Box, Stack, Typography } from '@mui/material'
import { PageSection } from '../../components/layout/PageSection'
import type { Language } from '../../routes/routeConfig'
import { MethodPageContainer } from './MethodPageContainer'
import { MethodResourceLinks } from './MethodResourceLinks'
import { Icon } from '@iconify/react'

type MethodTool = {
  id: string
  title: string
  question: string
  role: string
  contents: string
  example: string
  link?: object | undefined
}

type MethodToolsSectionProps = {
  eyebrow: string
  title: string
  introduction: string
  closing: string
  tools: MethodTool[]
  language: Language
}

export function MethodToolsSection({
  closing,
  eyebrow,
  introduction,
  language,
  title,
  tools,
}: MethodToolsSectionProps) {
  return (
    <PageSection
      aria-labelledby="method-tools-title"
      data-testid="method-tools"
      id="method-tools"
      spacing="spacious"
      sx={(theme) => ({
        backgroundColor: theme.digitalStudio.colors.surface,
        color: theme.palette.getContrastText(theme.digitalStudio.colors.surface),
        backgroundImage: theme.digitalStudio.patterns.diagonal,
      })}
    >
      <MethodPageContainer>
        <Stack spacing={8}>
          <Box>
            <Stack spacing={2}>
              <Typography variant="overline">{eyebrow}</Typography>
              <Typography component="h2" id="method-tools-title" variant="h2">
                {title}
              </Typography>
              <Typography sx={{ fontSize: { sm: '1.1rem' } }}>{introduction}</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 4, md: 8 },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {tools.map((tool, index) => (
              <Box
                component="article"
                data-testid={`method-tool-${tool.id}`}
                key={tool.id}
                sx={(theme) => ({
                  flex: 1,
                  p: { xs: 6, md: 8 },
                  backgroundColor:
                    index === 0
                      ? theme.palette.warning.main
                      : index === 1
                        ? theme.palette.success.main
                        : theme.digitalStudio.colors.surfaceStrong,
                  color:
                    index === 0
                      ? theme.palette.getContrastText(theme.palette.warning.main)
                      : index === 1
                        ? theme.palette.getContrastText(theme.palette.success.main)
                        : theme.palette.getContrastText(theme.digitalStudio.colors.surfaceStrong),
                  border: `${theme.digitalStudio.borderWidths.bold}px solid ${theme.digitalStudio.colors.border}`,
                  borderRadius: `${theme.digitalStudio.radii.lg}px`,
                  boxShadow: theme.digitalStudio.shadows.medium,
                })}
              >
                <Stack spacing={1}>
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{
                      borderBottom: '5px solid',
                      pb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Icon icon={`devicon:${tool.title.toLocaleLowerCase()}`} />
                    {tool.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontWeight: 800, pt: 4 }}>
                    {tool.question}
                  </Typography>
                  <Typography sx={{ fontWeight: 900 }}>{tool.role}</Typography>
                  <Typography>{tool.contents}</Typography>
                  <Typography variant="body2">{tool.example}</Typography>
                  {tool.link && (
                    <MethodResourceLinks
                      id={`method-tool-${tool.id}-resources`}
                      language={language}
                      resources={
                        [tool.link] as Parameters<typeof MethodResourceLinks>[0]['resources']
                      }
                      title="Resources"
                    />
                  )}
                </Stack>
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontWeight: 900, maxWidth: '68ch' }}>{closing}</Typography>
        </Stack>
      </MethodPageContainer>
    </PageSection>
  )
}
