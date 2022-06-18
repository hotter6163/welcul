import type { NextPage } from 'next'
import {
  Box, Button, Container, Grid
} from '@mui/material'

import 'theme/moduleAugmentation'

const Page: NextPage = () => {
  return (
    <Box component="main">
      <Box
        component="section"
        sx={{
          bgcolor: 'background.clubMain',
        }}
      >
        <Container sx={{ maxWidth: 1200 }}>
          <Grid container className="h-screen" sx={{ pb: "1.5rem" }}>
            
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Page
