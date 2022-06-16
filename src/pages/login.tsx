import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  useForm,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from 'app/firebase'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

type FormData = {
  email: string
  password: string
}

const Page: NextPage = () => {
  const { control, handleSubmit, setValue } = useForm<FormData>()
  const router = useRouter()
  const [isError, setIsError] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormData> = ({ email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('home')
      })
      .catch(() => {
        setValue('password', '')
        setIsError(true)
      })
  }

  return wrapInLayout('user',
    <Grid container sx={{ height: "80vh"}}>
      <Grid item className="self-center w-screen">
        <Stack spacing={3}>
          <div className="text-center">
            <Typography variant="h2" component="h1">
              ログイン
            </Typography>
          </div>
          {isError && (
            <div>
              <Alert severity="error">
                ログイン情報が間違っています。
              </Alert>
            </div>
          )}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} sx={{ width: "70%", mx: "auto" }}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                      id="email"
                      label="メールアドレス"
                      type="email"
                      variant="standard"
                      autoComplete="email"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                      id="password"
                      label="パスワード"
                      type="password"
                      variant="standard"
                      autoComplete="current-password"
                      {...field}
                    />
                  )}
                />
                <div className="text-center">
                  <Button
                    variant="contained"
                    color="accent"
                    type="submit"
                    sx={{ width: "8rem" }}
                  >
                    ログイン
                  </Button>
                </div>
              </Stack>
            </form>
          </div>
          <div className="text-center">
            <Link href="/signup">
              <a>アカウント登録を行う</a>
            </Link>
          </div>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Page
