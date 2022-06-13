import type { NextPage } from 'next'
import {
  Box,
  Typography
} from '@mui/material'

import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  return wrapInLayout('user',
    <Box className="text-center">
      <Typography variant="h1">
        ユーザー登録
      </Typography>
    </Box>
  )
}

export default Page
