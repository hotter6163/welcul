import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'

import "@fontsource/noto-sans-jp"
import 'styles/globals.scss'

import { CustomThemeProvider } from 'theme/CustomThemeProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>新歓情報サイト</title>
      </Head>
      <CustomThemeProvider>
        <Component {...pageProps} />
      </CustomThemeProvider>
    </>
  )
}

export default App
