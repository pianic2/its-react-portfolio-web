import { Box, Typography, type BoxProps } from '@mui/material'

type SupportingPageIndexItem = {
  href: string
  label: string
}

type SupportingPageIndexProps = {
  items: SupportingPageIndexItem[]
  label: string
  sx?: BoxProps['sx']
}

export function SupportingPageIndex({ items, label, sx }: SupportingPageIndexProps) {
  return (
    <Box
      component="nav"
      aria-label={label}
      sx={[
        (theme) => ({
          borderBlock: `2px solid ${theme.digitalStudio.colors.border}`,
          py: 1.5,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box
        sx={{
          alignItems: { xs: 'flex-start', sm: 'center' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: { xs: 1.5, sm: 2.5 },
        }}
      >
        <Typography sx={{ fontWeight: 900 }} variant="overline">
          {label}
        </Typography>
        {items.map((item) => (
          <Typography
            component="a"
            href={item.href}
            key={item.href}
            sx={{
              color: 'inherit',
              display: 'inline-flex',
              minHeight: 44,
              alignItems: 'center',
              fontWeight: 800,
              textDecoration: 'none',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px',
              '&:hover': { textDecoration: 'underline' },
              '&:focus-visible': {
                outline: `3px solid currentColor`,
                outlineOffset: 3,
              },
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
