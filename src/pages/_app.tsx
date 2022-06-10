import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'

import "@fontsource/noto-sans-jp"
import 'styles/globals.scss'

import { CustomThemeProvider } from 'theme/CustomThemeProvider'
import { Header } from 'components/layouts/Header'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>新歓情報サイト</title>
      </Head>
      <div className="display-field">
        <CustomThemeProvider>
          <Header />
          <Component {...pageProps} />
        </CustomThemeProvider>
      </div>
    </>
  )
}

export default App
