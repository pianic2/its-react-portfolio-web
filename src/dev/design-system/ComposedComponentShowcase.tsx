import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded'
import CodeRounded from '@mui/icons-material/CodeRounded'
import SendRounded from '@mui/icons-material/SendRounded'
import {
  Box,
  Button,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ButtonLink } from '../../components/actions/AppLink'
import { StudioCard } from '../../components/surfaces/StudioCard'
import { ShowcaseSection } from './ShowcaseSection'

const metricItems = [
  { label: 'Decisions', value: '12' },
  { label: 'Tests', value: '48' },
  { label: 'Coverage', value: '92%' },
] as const

const deliveryChecks = [
  { label: 'Architecture evidence', status: 'Ready' },
  { label: 'Accessibility review', status: 'Review' },
  { label: 'Production release', status: 'Blocked' },
] as const

function ProjectPreviewCard() {
  return (
    <StudioCard component="article" sx={{ height: '100%' }}>
      <CardContent
        sx={(theme) => ({
          p: theme.spacing(6),
          '&:last-child': { pb: theme.spacing(6) },
        })}
      >
        <Stack spacing={5}>
          <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Chip color="success" label="Validated" size="small" />
            <Chip icon={<CodeRounded />} label="React · TypeScript" size="small" variant="outlined" />
          </Stack>

          <Box>
            <Typography component="h3" variant="h4">
              Edge telemetry decision lab
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 3 }}>
              A composed project-card candidate for evidence-rich case studies, technical decisions and
              concise delivery outcomes.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            }}
          >
            {metricItems.map((metric) => (
              <Box key={metric.label} sx={{ minWidth: 0 }}>
                <Typography component="p" variant="h5">
                  {metric.value}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  {metric.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <ButtonLink
            endIcon={<ArrowForwardRounded />}
            sx={{ alignSelf: 'flex-start' }}
            to="/en/projects/edge-telemetry"
            variant="contained"
          >
            Open case study
          </ButtonLink>
        </Stack>
      </CardContent>
    </StudioCard>
  )
}

function DeliveryStatusPanel() {
  return (
    <StudioCard component="article" sx={{ height: '100%' }} variant="featured">
      <CardContent
        sx={(theme) => ({
          p: theme.spacing(6),
          '&:last-child': { pb: theme.spacing(6) },
        })}
      >
        <Stack spacing={5}>
          <Box>
            <Typography color="text.secondary" variant="overline">
              Delivery pulse
            </Typography>
            <Typography component="h3" variant="h4">
              Release readiness
            </Typography>
          </Box>

          <Box>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontWeight: 900 }}>Portfolio foundation</Typography>
              <Typography>76%</Typography>
            </Stack>
            <LinearProgress aria-label="Portfolio foundation progress" value={76} variant="determinate" />
          </Box>

          <Stack divider={<Divider flexItem />} spacing={0}>
            {deliveryChecks.map((check) => (
              <Stack
                direction="row"
                key={check.label}
                sx={{ alignItems: 'center', justifyContent: 'space-between', py: 3 }}
              >
                <Stack direction="row" sx={{ alignItems: 'center', gap: 2, minWidth: 0 }}>
                  <CheckCircleRounded aria-hidden="true" fontSize="small" />
                  <Typography>{check.label}</Typography>
                </Stack>
                <Chip
                  color={
                    check.status === 'Ready'
                      ? 'success'
                      : check.status === 'Review'
                        ? 'warning'
                        : 'error'
                  }
                  label={check.status}
                  size="small"
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </StudioCard>
  )
}

function ContactPanelPreview() {
  return (
    <StudioCard component="article">
      <CardContent
        sx={(theme) => ({
          p: theme.spacing(6),
          '&:last-child': { pb: theme.spacing(6) },
        })}
      >
        <Box
          sx={{
            alignItems: { xs: 'stretch', lg: 'center' },
            display: 'grid',
            gap: 6,
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' },
          }}
        >
          <Box>
            <Typography color="text.secondary" variant="overline">
              Contact candidate
            </Typography>
            <Typography component="h3" variant="h4">
              Start with the problem, not the pitch.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 3 }}>
              This compact panel tests long copy, form alignment and a strong action without becoming a
              final public contact section.
            </Typography>
          </Box>

          <Stack spacing={4}>
            <Box
              sx={{
                display: 'grid',
                gap: 4,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              }}
            >
              <TextField fullWidth label="Name" />
              <TextField fullWidth label="Email" type="email" />
            </Box>
            <TextField fullWidth label="Project context" multiline rows={3} />
            <Button endIcon={<SendRounded />} sx={{ alignSelf: 'flex-start' }} type="button" variant="contained">
              Send preview
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </StudioCard>
  )
}

export function ComposedComponentShowcase() {
  return (
    <ShowcaseSection
      description="Development-only composed examples test how tokens and primitives behave when they carry realistic content. They are candidates for later page work, not production components yet."
      eyebrow="10 · Component laboratory"
      title="Composed components under realistic pressure"
      wide
    >
      <Stack spacing={7}>
        <Box
          sx={{
            display: 'grid',
            gap: 6,
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <ProjectPreviewCard />
          <DeliveryStatusPanel />
        </Box>
        <ContactPanelPreview />
      </Stack>
    </ShowcaseSection>
  )
}
