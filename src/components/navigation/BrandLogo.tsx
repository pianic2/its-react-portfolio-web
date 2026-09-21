import { Box } from '@mui/material'

const brandLogoSource = `${import.meta.env.BASE_URL}brand-mark.svg`

type BrandLogoProps = {
  size: 'compact' | 'regular'
}

export function BrandLogo({ size }: BrandLogoProps) {
  return (
    <Box
      alt=""
      aria-hidden="true"
      component="img"
      src={brandLogoSource}
      sx={(theme) => ({
        display: 'block',
        flex: '0 0 auto',
        height:
          size === 'compact' ? theme.spacing(8) : { xs: theme.spacing(8), md: theme.spacing(12) },
        width:
          size === 'compact' ? theme.spacing(8) : { xs: theme.spacing(8), md: theme.spacing(12) },
      })}
    />
  )
}
