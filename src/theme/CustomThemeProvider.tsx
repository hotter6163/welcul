import type { ReactNode, VFC } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { orange } from '@mui/material/colors'

declare module '@mui/material/styles' {
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
}

type CustomThemeProps = {
  children: ReactNode
}

export const CustomThemeProvider: VFC<CustomThemeProps> = ({ children }) => {
  const theme = createTheme({
    palette: {
      main: {
        main: orange[400]
      },
      base: {
        main: orange[100]
      },
      accent: {
        main: orange[800]
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
