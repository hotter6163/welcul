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
      fontSize: '5.5rem',
      fontWeight: 600,
      fontFamily: 'Libre Baskerville',
      color: theme.palette.accent.main
    },
    logoHeader: {
      fontSize: '1.5rem',
      fontWeight: 600,
      fontFamily: 'Libre Baskerville',
      color: '#fff'
    }
  }
})

theme = responsiveFontSizes(theme);

export const CustomThemeProvider: VFC<CustomThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
