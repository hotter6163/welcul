import type { NextPage } from 'next'
import { Button } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true
  }
}

const Page: NextPage = () => {
  return (
    <>
      <h1>Hello World!!</h1>
      <h1>フォントの確認</h1>
      <Button color="accent" variant="contained">
        サンプルボタン
      </Button>
    </>
  )
}

export default Page
