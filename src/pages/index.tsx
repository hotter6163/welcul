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
import { useWindowDimensions } from 'hooks/useWindowDimensions'


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
  // SSGのための初期値としてiPhone SEの値を使用
  const { width, height } = useWindowDimensions({ width: 375, height: 667 })
  const isVertically = width < height ? true : false

  // SSGのせいで横向きの画面のときに画面の標示が気持ち悪いからその対策
  // windowオブジェクトが存在しない場合はmainタグのみ返す
  const [isWindow, setIsWindow] = useState<boolean>(typeof window !== undefined)
  useEffect(() => {
    setIsWindow(typeof window !== undefined)
  }, [])
  if (!isWindow) {
    return (
      <Box component="main"></Box>
    )
  }

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
            <Grid item xs={isVertically ? 12 : 4} className="flex">
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
