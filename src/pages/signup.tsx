import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import 'theme/moduleAugmentation'
import { auth } from 'app/firebase/app'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

const Page: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onClickRegistration = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/home')
      })
  }

  return wrapInLayout('user',
    <Grid container sx={{ height: "80vh"}}>
      <Grid item className="self-center w-screen">
        <div className="form-row">
          <Typography variant="h2" component="h1">
            ユーザー登録
          </Typography>
        </div>
        <div>
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
              color="accent"
              onClick={onClickRegistration}
              sx={{ width: "8rem" }}
            >
              登録
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Page
