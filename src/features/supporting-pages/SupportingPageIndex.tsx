import { Box, Typography } from '@mui/material'

type SupportingPageIndexItem = {
  href: string
  label: string
}

type SupportingPageIndexProps = {
  items: SupportingPageIndexItem[]
  label: string
}

export function SupportingPageIndex({ items, label }: SupportingPageIndexProps) {
  return (
    <Box
      component="nav"
      aria-label={label}
      sx={(theme) => ({
        borderBlock: `2px solid ${theme.digitalStudio.colors.border}`,
        py: 1.5,
      })}
    >
      <Box
        sx={{
          alignItems: { xs: 'flex-start', sm: 'center' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 2.5 },
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
              fontWeight: 800,
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px',
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
