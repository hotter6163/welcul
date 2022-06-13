import { VFC, useState } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

import { Logo } from './Logo'

export const Header: VFC = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
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
            onClick={() => setShowMenu(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={showMenu}
        onClose={() => setShowMenu(false)}
      >
        <Box sx={{ width: 180, p: "1rem" }}>
          <Box className="text-right w-full" onClick={() => setShowMenu(false)}>
            <IconButton
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box component="nav">
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="ログイン" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
