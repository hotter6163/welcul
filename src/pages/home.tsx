import type { NextPage } from 'next'
import {
  Grid,
  Typography
} from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'

import 'theme/moduleAugmentation'
import { auth, useCurrentUser } from 'app/firebase'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  const { user } = useCurrentUser(auth)

  return wrapInLayout('user',
    <Grid container sx={{ height: "80vh"}}>
      <Grid item className="self-center w-screen text-center">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
        >
          ホーム
        </Typography>
        {user ? (
          <>
            <Typography
              variant="text"
              component="p"
            >
              displayName: {user.displayName ? user.displayName : "名前が登録されていません"}
            </Typography>
            <Typography
              variant="text"
              component="p"
            >
              Email: {user.email ? user.email : "メールが登録されていません"}
            </Typography>
          </>
        ) : (
          <Typography
            variant="text"
            component="p"
          >
            ログインを行ってください
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default Page
