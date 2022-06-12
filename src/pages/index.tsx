import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import * as fs from 'fs'
import * as path from 'path'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material'


import { wrapInLayout } from 'components/layouts/wrapInLayout'
import { useIsVertically } from 'hooks/useIsVertically'

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

type DisplayItem = {
  id: string
  title: string
  text: string
}

const Page: NextPage<{ displayItems: DisplayItem[] }> = ({ displayItems }) => {
  const isVertically = useIsVertically()

  const renderedItems = displayItems.map((item, index) => (
    <Box
      key={item.id}
      component="section"
      sx={{
        bgcolor: `${index % 2 === 0 ? "background.base" : "" }`,
        height: '50vh'
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
        <Container maxWidth="xl">
          <Grid container className="h-screen">
            <Grid item xs={isVertically ? 12 : 8} className="flex">
              <div className="self-center w-full text-center">
                <Typography
                  variant="h1"
                  sx={{ color: "text.accent" }}
                >
                  新歓情報
                </Typography>
              </div>
            </Grid>
            <Grid item xs={isVertically ? 12 : 4} className="flex">
              <div className="self-center w-full">
                <div className="text-center my-4">
                  <Button variant="contained" color="accent" size="large">
                    ユーザー登録して使い始める
                  </Button>
                </div>
                <div className="text-center my-4">
                  <Button variant="outlined" color="accent" size="large" className="bg-white">
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
