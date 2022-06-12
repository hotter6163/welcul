import type { NextPage } from 'next'
import {
  Box,
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
          <Grid item xs={12} className="flex">
            <div className="self-center">
              <Typography
                variant="h1"
                sx={{ color: "text.accent" }}
              >
                新歓情報サイト
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} className="flex">
            <div className="self-center w-full">
              <div className="text-center my-4">
                <Button variant="contained" color="accent" size="large">
                  ユーザー登録して使い始める
                </Button>
              </div>
              <div className="text-center my-4">
                <Button variant="outlined" color="accent" size="large">
                  どんなイベントがあるか見る
                </Button>
              </div>
              <div className="text-center my-4">
                <Button variant="contained" color="secondary" size="large">
                  ログイン
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default Page
