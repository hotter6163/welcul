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
    headerLogoText: true;
  }
}

export const Header: VFC = () => {
  return (
    <AppBar position="fixed" color="main" className="px-4 py-2">
      <Link href="/">
        <a>
          <Typography
            variant="headerLogoText"
            component="p"
          >
            新歓情報サイト
          </Typography>
        </a>
      </Link>
    </AppBar>
  )
}
