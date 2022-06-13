import type { GetStaticProps, NextPage } from 'next'
import * as fs from 'fs'
import * as path from 'path'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material'
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';

import { wrapInLayout } from 'components/layouts/wrapInLayout'
import { Logo } from 'components/layouts/Logo'

import 'theme/moduleAugmentation'

type DisplayItem = {
  id: string
  title: string
  text: string
}

const Page: NextPage<{ displayItems: DisplayItem[] }> = ({ displayItems }) => {
  const renderedItems = displayItems.map((item, index) => (
    <Box
      key={item.id}
      component="section"
      sx={{
        bgcolor: `${index % 2 === 0 ? "background.base" : "" }`,
        minHeight: '50vh'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3">{item.title}</Typography>
        <Typography variant="subtitle1">{item.text}</Typography>
      </Container>
    </Box>
  ))

  return wrapInLayout('top',
    <Box component="main">
      <Box component="section" sx={{ bgcolor: 'background.main'}}>
        <Container maxWidth="lg">
          <Grid container className="h-screen">
            <Grid item className="flex" sx={{
              flexGrow: 0,
              flexBasis: "100%",
              maxWidth: "100%",
              "@media screen and (min-aspect-ratio: 1/1)": {
                flexGrow: 0,
                flexBasis: "60%",
                maxWidth: "60%",
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
              maxWidth: "100%",
              "@media screen and (min-aspect-ratio: 1/1)": {
                flexGrow: 0,
                flexBasis: "40%",
                maxWidth: "40%",
              }
            }}>
              <div className="self-center w-full">
                <Grid container className="justify-center">
                  <Grid item xs={1}>
                    <ArrowDownwardSharpIcon
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
                    <ArrowDownwardSharpIcon
                      sx={{
                        color: "#fff",
                        fontSize: "2rem"
                      }}
                    />
                  </Grid>
                </Grid>
                <div className="text-center my-4">
                  <Button
                    variant="contained"
                    color="accent"
                    size="large"
                    fullWidth
                  >
                    ユーザー登録して使い始める
                  </Button>
                </div>
                <div className="text-center my-4">
                  <Button
                    variant="outlined"
                    color="accent"
                    size="large"
                    sx={{ bgcolor: "#fff" }}
                    fullWidth
                  >
                    どんなイベントがあるか見る
                  </Button>
                </div>
                <div className="text-center my-4">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                  >
                    ログイン
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {renderedItems}
    </Box>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'json', 'topPageItems.json')
  const jsonText = fs.readFileSync(jsonPath, 'utf-8')
  const displayItems = JSON.parse(jsonText) as DisplayItem[]

  return {
    props: {
      displayItems
    }
  }
}

export default Page
