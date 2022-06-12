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
    headerLogoText: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    headerLogoText?: React.CSSProperties;
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
    headerLogoText: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#fff'
    }
  }
})

theme = createTheme(theme, {
  palette: {
    background: {
      base: theme.palette.base.main
    },
    text: {
      accent: theme.palette.accent.main
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
