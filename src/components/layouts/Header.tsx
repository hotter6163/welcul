import type { VFC } from 'react'
import {
  AppBar,
  Typography
} from '@mui/material'

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    main: true
  }
}

export const Header: VFC = () => {
  return (
    <AppBar position="static" color="main">
      <Typography
        variant="h5"
        component="p"
      >
        新歓情報サイト
      </Typography>
    </AppBar>
  )
}
