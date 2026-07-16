import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { routeDefinitions, type Language } from '../routes/routeConfig'

type ProjectDetailPageProps = {
  language: Language
}

export function ProjectDetailPage({ language }: ProjectDetailPageProps) {
  const { slug } = useParams()

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h2">
        {routeDefinitions.projectDetail.labels[language]}
      </Typography>
      <Typography>
        {language === 'it' ? 'Progetto' : 'Project'}: {slug}
      </Typography>
    </Stack>
  )
}
