import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CssBaseline from '@mui/material/CssBaseline'

import "@fontsource/noto-sans-jp"
import 'styles/globals.scss'

import { auth, useCurrentUser } from 'app/firebase'
import { CustomThemeProvider } from 'theme/CustomThemeProvider'

const pagesNotLogin = ['/', '/signup', '/login']
const pagesLogin: string[] = []

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { user } = useCurrentUser(auth)

  // ログイン状態に応じたリダイレクト処理
  // 一回そのページが表示されるのをなくしたいが、、、
  useEffect(() => {
    if (pagesNotLogin.includes(router.pathname)) {
      if (user) {
        router.replace('/home')
      }
    }
    if (pagesLogin.includes(router.pathname)) {
      if (!user) {
        router.replace('/login')
      }
    }
  }, [user])

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
