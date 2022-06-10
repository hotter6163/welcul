import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'

import "@fontsource/noto-sans-jp"
import 'styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>新歓情報サイト</title>
      </Head>
      <div className="display-field">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default App
