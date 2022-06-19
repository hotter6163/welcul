import type { NextPage } from 'next'
import {
  Box,
  Container,
  Grid,
  Typography
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
            <Typography variant="h2" component="h1">
              Welcul for clubs
            </Typography>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Page
