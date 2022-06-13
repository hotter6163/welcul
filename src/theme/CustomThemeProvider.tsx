import type { ReactNode, VFC } from 'react'

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import { orange, lightBlue } from '@mui/material/colors'

import 'theme/moduleAugmentation'

type CustomThemeProps = {
  children: ReactNode
}

let theme = createTheme({
  palette: {
    main: {
      main: orange[400],
      contrastText: '#fff',
    },
    base: {
      main: orange[50]
    },
    accent: {
      main: lightBlue['A700'],
      contrastText: '#fff',
    }
  },
  typography: {
    fontFamily: [
      '"Noto Sans JP"',
    ].join(',')
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 600,
      desktop: 1025,
    },
  }
})

theme = createTheme(theme, {
  palette: {
    background: {
      main: theme.palette.main.main,
      base: theme.palette.base.main,
    },
    text: {
      accent: theme.palette.accent.main
    }
  },
  typography: {
    logoTop: {
      fontWeight: 600,
      fontFamily: 'Libre Baskerville',
      color: theme.palette.accent.main,
      [theme.breakpoints.down('tablet')]: {
        fontSize: '5rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "7rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "8rem"
      }
    },
    logoHeader: {
      fontWeight: 600,
      fontFamily: 'Libre Baskerville',
      color: '#fff',
      fontSize: '1.5rem',
    }
  }
})

theme = responsiveFontSizes(theme)

export const CustomThemeProvider: VFC<CustomThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
