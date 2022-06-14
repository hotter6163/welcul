import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from 'app/firebase/app'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useAuthState(auth)

  useEffect(() => {
    console.log(user)
  }, [user])

  const onSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  return wrapInLayout('user',
    <Grid container sx={{ height: "80vh"}}>
      <Grid item className="self-center w-screen">
        <div className="form-row">
          <Typography variant="h2" component="h1">
            ユーザー登録
          </Typography>
        </div>
        <form action="#" onSubmit={onSubmit}>
          <div className="form-row">
            <TextField
              id="name-input"
              label="名前"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              登録
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  )
}

export default Page
