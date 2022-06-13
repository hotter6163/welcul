import type { VFC } from 'react'
import Link from 'next/link'
import {
  AppBar,
  IconButton,
  Toolbar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import { Logo } from './Logo'

export const Header: VFC = () => {
  return (
    <AppBar position="fixed" color="main" className="py-1">
      <Toolbar className="justify-between">
        <Link href="/">
          <a className="no-underline">
            <Logo />
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
