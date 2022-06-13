import type { VFC } from 'react'
import { Box, Typography, TypographyVariants } from '@mui/material';

import 'theme/moduleAugmentation'

type PropsType = {
  type?: 'header' | 'top'
}

export const Logo: VFC<PropsType> = ({ type = 'header' }) => {
  let variant: TypographyVariants | "logoTop" | "logoHeader"
  switch (type) {
    case 'top':
      variant = "logoTop"
      break
    default:
      variant = "logoHeader"
  }

  return (
    <Box className="text-center">
      <Typography
        variant={variant}
        component="p"
      >
        WelCul
      </Typography>
    </Box>
  )
}
