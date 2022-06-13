import { useState, useEffect } from 'react'
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
              <div className="self-center w-full text-center">
                <Image
                  src='/images/top_main.png'
                  width={300}
                  height={300}
                  alt="mainの画像"
                />
                <Typography
                  variant="h1"
                  sx={{ color: "text.accent" }}
                >
                  新歓情報
                </Typography>
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
                <div className="text-center my-4">
                  <Button variant="contained" color="accent" size="large" fullWidth>
                    ユーザー登録して使い始める
                  </Button>
                </div>
                <div className="text-center my-4">
                  <Button variant="outlined" color="accent" size="large" className="bg-white" fullWidth>
                    どんなイベントがあるか見る
                  </Button>
                </div>
                <div className="text-center my-4">
                  <Button variant="contained" color="secondary" size="large" fullWidth>
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
