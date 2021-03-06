import type { ReactNode, VFC } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  orange,
  lightBlue,
  deepOrange
} from '@mui/material/colors'

import 'theme/moduleAugmentation'

type CustomThemeProps = {
  children: ReactNode
}

// ページのイメージカラー・フォントの設定
// ブレイクポイントの設定
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
    },
    clubMain: {
      main: lightBlue[400],
    },
    clubBase: {
      main: lightBlue[100],
    },
    clubAccent: {
      main: orange[600],
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

// イメージカラーに合わせた文字・背景色の作成
theme = createTheme(theme, {
  palette: {
    background: {
      main: theme.palette.main.main,
      base: theme.palette.base.main,
      accent: theme.palette.accent.main,
      clubMain: theme.palette.clubMain.main,
    },
    text: {
      accent: theme.palette.accent.main
    }
  }
})

// レスポンシブなtypographyの作成
theme = createTheme(theme, {
  typography: {
    h1: {
      [theme.breakpoints.down('tablet')]: {
        fontSize: '3.5rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "4.71rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "5.36rem"
      }
    },
    h2: {
      [theme.breakpoints.down('tablet')]: {
        fontSize: '2.38rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "3.13rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "3.33rem"
      }
    },
    h3: {
      [theme.breakpoints.down('tablet')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "2.57rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "2.78rem"
      }
    },
    h4: {
      [theme.breakpoints.down('tablet')]: {
        fontSize: '1.56rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "1.82rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "2.02rem"
      }
    },
    h5: {
      [theme.breakpoints.down('tablet')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "1.31rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "1.5rem"
      }
    },
    h6: {
      [theme.breakpoints.down('tablet')]: {
        fontSize: '1.13rem',
      },
      [theme.breakpoints.up('tablet')]: {
        fontSize: "1.25rem"
      },
      [theme.breakpoints.up("desktop")]: {
        fontSize: "1.25rem"
      }
    },
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
    },
    text: {
      fontSize: "1rem"
    }
  }
})

export const CustomThemeProvider: VFC<CustomThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
