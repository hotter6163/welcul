import type { ReactNode, VFC } from 'react'

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import { orange, lightBlue } from '@mui/material/colors'

declare module '@mui/material/styles' {
  // Palette
  interface Palette {
    main: Palette['primary']
    base: Palette['primary']
    accent: Palette['primary']
  }
  interface PaletteOptions {
    main?: PaletteOptions['primary']
    base?: PaletteOptions['primary']
    accent?: PaletteOptions['primary']
  }

  // Typography
  interface TypographyVariants {
    headerTitle: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    headerTitle?: React.CSSProperties;
  }
}

type CustomThemeProps = {
  children: ReactNode
}

let theme = createTheme({
  palette: {
    main: {
      main: orange[500],
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
    headerTitle: {
      fontSize: '2rem',
      fontWeight: 'bolder',
    }
  }
})

theme = createTheme(theme, {
  palette: {
    background: {
      paper: theme.palette.base.main
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
