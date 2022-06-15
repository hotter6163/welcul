import { VFC, useState } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Box,
  Divider,
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
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth'

import { Logo } from './Logo'
import { auth, useCurrentUser } from 'app/firebase'

export const Header: VFC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useCurrentUser(auth)

  return (
    <>
      <AppBar position="fixed" color="main" className="py-1">
        <Toolbar className="justify-between">
          <Link href="/home">
            <a className="no-underline ml-3" >
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
        <Box sx={{ width: 230, p: "1rem" }}>
          <Box className="text-right w-full" onClick={() => setShowMenu(false)}>
            <IconButton
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box component="nav">
            <List>
              <Link href="/home">
                <ListItem disablePadding button>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="イベントを探す" />
                </ListItem>
              </Link>
            </List>
          </Box>
          <Divider />
          <Box component="nav">
            <List>
              {user ? (
                <ListItem disablePadding button onClick={() => auth.signOut()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="ログアウト" />
                </ListItem>
              ) : (
                <Link href="/login">
                  <ListItem disablePadding button>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="ログイン" />
                  </ListItem>
                </Link>
              )}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
