import type { VFC } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

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
    <AppBar position="fixed" color="main" className="py-1">
      <Toolbar className="justify-between">
        <Link href="/">
          <a className="no-underline">
            <Typography
              variant="headerLogoText"
              component="p"
            >
              新歓情報
            </Typography>
          </a>
        </Link>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
