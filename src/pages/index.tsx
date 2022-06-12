import type { NextPage } from 'next'
import {
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material'

import { wrapInLayout } from 'components/layouts/wrapInLayout'

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

const Page: NextPage = () => {
  return wrapInLayout('top',
    <main>
      <Container maxWidth="xl">
        <Grid container className="h-screen">
          <Grid item xs={12} lg={8}>
            <div className="align-middle inline-block">
              <Typography
                variant="h1"
                sx={{ color: "text.accent" }}
              >
                新歓情報サイト
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div className="text-center">
              <Button variant="contained" color="accent" size="large">
                ユーザー登録して使い始める
              </Button>
            </div>
            <div className="text-center">
              <Button variant="outlined" color="accent" size="large">
                どんなイベントがあるのか見てみる
              </Button>
            </div>
            <div className="text-center">
              <Button variant="contained" color="secondary" size="large">
                ログインする
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default Page
