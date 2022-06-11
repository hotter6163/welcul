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
    <AppBar position="fixed" color="main">
      <Typography
        variant="headerTitle"
        component="div"
      >
        <Link href="/">
          <a className="text-white">新歓情報サイト</a>
        </Link>
      </Typography>
    </AppBar>
  )
}
