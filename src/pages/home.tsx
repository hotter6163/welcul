import type { NextPage } from 'next'
import { Button, Typography } from '@mui/material'

import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  return wrapInLayout('user',
    <>
      <Typography variant="h1" gutterBottom>h1 variant</Typography>
      <Typography variant="h2" gutterBottom>h2 variant</Typography>
      <Typography variant="h3" gutterBottom>h3 variant</Typography>
      <Typography variant="h4" gutterBottom>h4 variant</Typography>
      <Typography variant="h5" gutterBottom>h5 variant</Typography>
      <Typography variant="h6" gutterBottom>h6 variant</Typography>
    </>
  )
}

export default Page
