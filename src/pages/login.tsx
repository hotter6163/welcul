import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useForm,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from 'app/firebase'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

type FormInput = {
  email: string
  password: string
}

const Page: NextPage = () => {
  const { control, handleSubmit } = useForm<FormInput>()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormInput> = ({ email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('home')
      })
  }

  return wrapInLayout('user',
    <Grid container sx={{ height: "80vh"}}>
      <Grid item className="self-center w-screen">
        <div className="form-row">
          <Typography variant="h2" component="h1">
            ログイン
          </Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ width: "60%", mx: "auto" }} >
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
      </Grid>
    </Grid>
  )
}

export default Page
