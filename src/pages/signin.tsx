import { useState } from 'react'
import type { NextPage } from 'next'
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from 'app/firebase/app'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
  }

  return wrapInLayout('user',
    <Grid container sx={{ height: "80vh"}}>
      <Grid item className="self-center w-screen">
        <div className="form-row">
          <Typography variant="h2" component="h1">
            ログイン
          </Typography>
        </div>
        <form action="#" onSubmit={onSubmit}>
          <div className="form-row">
            <TextField
              id="email-input"
              label="メール"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-row">
            <TextField
              id="password-input"
              label="パスワード"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-row">
            <Button
              variant="contained"
              size="large"
              type="submit"
            >
              ログイン
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  )
}

export default Page
