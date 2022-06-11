import type { NextPage } from 'next'
import { Button, Typography } from '@mui/material'

const Page: NextPage = () => {
  return (
    <main>
      <Typography variant="body1" gutterBottom>body1 variant</Typography>
      <Typography variant="body2" gutterBottom>body2 variant</Typography>
      <Typography variant="button" display="block" gutterBottom>button variant</Typography>
      <Typography variant="caption" display="block" gutterBottom>caption variant</Typography>
      <Typography variant="h1" gutterBottom>h1 variant</Typography>
      <Typography variant="h2" gutterBottom>h2 variant</Typography>
      <Typography variant="h3" gutterBottom>h3 variant</Typography>
      <Typography variant="h4" gutterBottom>h4 variant</Typography>
      <Typography variant="h5" gutterBottom>h5 variant</Typography>
      <Typography variant="h6" gutterBottom>h6 variant</Typography>
      <Typography variant="inherit" gutterBottom>inherit variant</Typography>
      <Typography variant="overline" gutterBottom>overline variant</Typography>
      <Typography variant="subtitle1" gutterBottom>subtitle1 variant</Typography>
      <Typography variant="subtitle2" gutterBottom>subtitle2 variant</Typography>
      <div>
        <Button variant="outlined" size="small">Button</Button>
        <Button variant="outlined" size="medium">Button</Button>
        <Button variant="outlined" size="large">Button</Button>
      </div>
    </main>
  )
}

export default Page
