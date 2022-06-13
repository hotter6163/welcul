import type { NextPage } from 'next'
import {
  Box,
  Typography
} from '@mui/material'

import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  return wrapInLayout('user',
    <Box className="text-center">
      <Typography variant="h2" component="h1">
        ログイン
      </Typography>
    </Box>
  )
}

export default Page
