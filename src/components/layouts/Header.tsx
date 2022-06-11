import type { VFC } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Typography
} from '@mui/material'

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    main: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headerTitle: true;
  }
}

export const Header: VFC = () => {
  return (
    <AppBar position="static" color="main">
      <Link href="/">
        <Typography
          variant="headerTitle"
          component="a"
        >
          新歓情報サイト
        </Typography>
      </Link>
    </AppBar>
  )
}
