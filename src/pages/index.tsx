import type { NextPage } from 'next'
import { Typography } from '@mui/material'

const Page: NextPage = () => {
  return (
    <main>
      <Typography variant="body1">body1 variant</Typography>
      <Typography variant="body2">body2 variant</Typography>
      <Typography variant="button" display="block">button variant</Typography>
      <Typography variant="caption" display="block">caption variant</Typography>
      <Typography variant="h1">h1 variant</Typography>
      <Typography variant="h2">h2 variant</Typography>
      <Typography variant="h3">h3 variant</Typography>
      <Typography variant="h4">h4 variant</Typography>
      <Typography variant="h5">h5 variant</Typography>
      <Typography variant="h6">h6 variant</Typography>
      <Typography variant="inherit">inherit variant</Typography>
      <Typography variant="overline">overline variant</Typography>
      <Typography variant="subtitle1">subtitle1 variant</Typography>
      <Typography variant="subtitle2">subtitle2 variant</Typography>
    </main>
  )
}

export default Page
