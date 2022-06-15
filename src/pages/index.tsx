import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import * as fs from 'fs'
import * as path from 'path'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { wrapInLayout } from 'components/layouts/wrapInLayout'
import { Logo } from 'components/layouts/Logo'

import 'theme/moduleAugmentation'

type DisplayItem = {
  id: string
  title: string
  text: string
}

type PageProps = {
  displayItems: DisplayItem[]
}

const Page: NextPage<PageProps> = () => {
  return wrapInLayout('top',
    <Box component="main">
      <Box
        component="section"
        sx={{ bgcolor: 'background.main' }}
      >
        <Container sx={{ maxWidth: 1200 }}>
          <Grid container className="h-screen" sx={{ pb: "1.5rem" }}>
            <Grid item className="flex" sx={{
              flexGrow: 0,
              flexBasis: "100%",
              Width: "100%",
              "@media screen and (min-aspect-ratio: 1/1)": {
                flexGrow: 0,
                flexBasis: "60%",
                Width: "60%",
              }
            }}>
              <div className="self-center w-full">
                <Typography
                  variant="h2"
                  component="p"
                  className="text-white text-left"
                  gutterBottom
                >
                  新歓情報サイト
                </Typography>
                <Logo type="top" />
              </div>
            </Grid>
            <Grid item className="flex" sx={{
              flexGrow: 0,
              flexBasis: "100%",
              Width: "100%",
              "@media screen and (min-aspect-ratio: 1/1)": {
                flexGrow: 0,
                flexBasis: "40%",
                Width: "40%",
              }
            }}>
              <div className="self-center w-full">
                <Grid container className="justify-center ">
                  <Grid item xs={1}>
                    <ArrowDownwardIcon
                      sx={{
                        color: "#fff",
                        fontSize: "2rem"
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} className="text-center">
                    <Typography
                      variant="h4"
                      component="p"
                      className="inline text-white"
                    >
                      ご利用はこちらから
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <ArrowDownwardIcon
                      sx={{
                        color: "#fff",
                        fontSize: "2rem"
                      }}
                    />
                  </Grid>
                </Grid>
                <div className="text-center my-4">
                  <Link href="/signup">
                    <Button
                      variant="contained"
                      color="accent"
                      size="large"
                      fullWidth
                    >
                      アカウント登録をして使い始める
                    </Button>
                  </Link>
                </div>
                <div className="text-center my-4">
                  <Link href="/home">
                    <Button
                      variant="outlined"
                      color="accent"
                      size="large"
                      sx={{
                        bgcolor: "#fff",
                        ":hover": {
                          bgcolor: "#fff",
                        }
                      }}
                      fullWidth
                    >
                      どんなイベントがあるか見る
                    </Button>
                  </Link>
                </div>
                <div className="text-center my-4">
                  <Link href="/login">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                    >
                      ログイン
                    </Button>
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const jsonPath = path.join(
    process.cwd(),
    'src',
    'data',
    'json',
    'topPageItems.json'
  )
  const jsonText = fs.readFileSync(jsonPath, 'utf-8')
  const displayItems = JSON.parse(jsonText) as DisplayItem[]

  return {
    props: {
      displayItems
    }
  }
}

export default Page
