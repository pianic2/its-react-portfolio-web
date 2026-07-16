import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { PageSection } from '../components/layout/PageSection'
import { routeDefinitions, type Language } from '../routes/routeConfig'

type ProjectDetailPageProps = {
  language: Language
}

export function ProjectDetailPage({ language }: ProjectDetailPageProps) {
  const { slug } = useParams()
  const headingId = 'project-detail-title'

  return (
    <PageSection aria-labelledby={headingId}>
      <PageContainer>
        <Stack spacing={2}>
          <Typography component="h1" id={headingId} variant="h2">
            {routeDefinitions.projectDetail.labels[language]}
          </Typography>
          <Typography>
            {language === 'en' ? 'Project' : 'Progetto'}: {slug}
          </Typography>
        </Stack>
      </PageContainer>
    </PageSection>
  )
}
