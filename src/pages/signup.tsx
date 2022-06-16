import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import {
  useForm,
  useWatch,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore'

import 'theme/moduleAugmentation'
import { auth, db } from 'app/firebase'
import { wrapInLayout } from 'components/layouts/wrapInLayout'

type FormData = {
  firstName: string
  lastName: string
  nickName: string
  universityId: string
  facultyId: string
  departmentId: string
  email: string
  password: string
}

type UniversityType = {
  name: string
}

type FacultyType = {
  name: string
  requireDepartment: boolean
}

type DepartmentType = {
  name: string
}

// 同じような処理を複数記述しているから、めっちゃ冗長な記述になっている
// リファクタリング等行う必要があると思う
const Page: NextPage = () => {
  const router = useRouter()
  const { control, handleSubmit, setValue } = useForm<FormData>()
  const watchUniversityId = useWatch({ control, name: 'universityId' })
  const watchFacultyId = useWatch({ control, name: 'facultyId' })

  const { data: universityData } = useSWR('universities', async (key) => {
    return getDocs(collection(db, key))
  })
  // ここ以下の処理はuseEffectで行った方が良いかも？
  const universities: { [key: string]: UniversityType } = {}
  const selectUniversityItems: JSX.Element[] = []
  universityData?.docs.forEach((doc) => {
    const data = doc.data()
    assertIsUniversity(data)
    universities[doc.id] = {
      ...data
    }
    selectUniversityItems.push(<MenuItem key={doc.id} value={doc.id}>{data.name}</MenuItem>)
  })

  const { data: facultyData } = useSWR(`/${watchUniversityId}`, async (pass) => {
    const keys = pass.split('/')
    return getDocs(collection(db, 'universities', keys[1], 'faculties'))
  })
  // ここ以下の処理はuseEffectで行った方が良いかも？
  const faculties: { [key: string]: FacultyType } = {}
  const selectFacultyItems: JSX.Element[] = []
  facultyData?.docs.forEach((doc) => {
    const data = doc.data()
    assertIsFaculty(data)
    faculties[doc.id] = {
      ...data
    }
    selectFacultyItems.push(<MenuItem key={doc.id} value={doc.id}>{data.name}</MenuItem>)
  })

  const { data: departmentData,  } = useSWR(`/${watchUniversityId}/${watchFacultyId}`, async (pass) => {
    const keys = pass.split('/')
    return getDocs(collection(db, 'universities', keys[1], 'faculties', keys[2], 'departments'))
  })
  // ここ以下の処理はuseEffectで行った方が良いかも？
  const departments: { [key: string]: DepartmentType } = {}
  const selectDepartmentItems: JSX.Element[] = []
  departmentData?.docs.forEach((doc) => {
    const data = doc.data()
    assertIsDepartment(data)
    departments[doc.id] = {
      ...data
    }
    selectDepartmentItems.push(<MenuItem key={doc.id} value={doc.id}>{data.name}</MenuItem>)
  })

  const onSubmit: SubmitHandler<FormData> = ({
    firstName,
    lastName,
    nickName,
    universityId,
    facultyId,
    departmentId,
    email,
    password
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          nickName,
          university: universities[universityId].name,
          faculty: faculties[facultyId].name,
          department: departments[departmentId].name,
        })
          .then(() => {
            router.push('/home')
          })
          .catch(async () => {
            await user.delete()
          })
      })
  }

  return wrapInLayout('user',
    <Grid container>
      <Grid item className="self-center w-screen">
        <Stack spacing={3}>
          <div className="form-row">
            <Typography variant="h2" component="h1">
              ユーザー登録
            </Typography>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} sx={{ width: "70%", mx: "auto" }}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                      id="lastName"
                      label="苗字"
                      type="text"
                      variant="standard"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                      id="firstName"
                      label="名前"
                      type="text"
                      variant="standard"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="nickName"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                      id="nickName"
                      label="ニックネーム"
                      type="text"
                      variant="standard"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="universityId"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <FormControl variant="standard">
                      <InputLabel id="university">大学</InputLabel>
                      <Select
                        labelId="university"
                        id="university"
                        onBlur={field.onBlur}
                        value={field.value}
                        name={field.name}
                        ref={field.ref}
                        onChange={(e) => {
                          field.onChange(e)
                          setValue('facultyId', '')
                          setValue('departmentId', '')
                        }}
                      >
                        {selectUniversityItems}
                      </Select>
                    </FormControl>
                  )}
                />
                {watchUniversityId && (
                  <Controller
                    name="facultyId"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <FormControl variant="standard">
                        <InputLabel id="faculty">学部</InputLabel>
                        <Select
                          labelId="faculty"
                          id="faculty"
                          onBlur={field.onBlur}
                          value={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(e) => {
                            field.onChange(e)
                            setValue('departmentId', '')
                          }}
                        >
                          {selectFacultyItems}
                        </Select>
                      </FormControl>
                    )}
                  />
                )}
                {watchFacultyId && faculties[watchFacultyId].requireDepartment && (
                  <Controller
                    name="departmentId"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <FormControl variant="standard">
                        <InputLabel id="department">学科</InputLabel>
                        <Select
                          labelId="department"
                          id="department"
                          {...field}
                        >
                          {selectDepartmentItems}
                        </Select>
                      </FormControl>
                    )}
                  />
                )}
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
                    登録
                  </Button>
                </div>
              </Stack>
            </form>
          </div>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Page

// とりあえず放置
function assertIsUniversity(unknownData: any): asserts unknownData is UniversityType {
  if (unknownData === null) throw new Error(`assertIsUniversity: unknownDataはnullです。`)
  if (typeof unknownData !== 'object') throw new Error(`assertIsUniversity: unknownDataはobjectではありません。`)

  if (typeof unknownData.name !== 'string') throw new Error(`assertIsUniversity: unknownDataのnameの型が正しくありません`)
}

// とりあえず放置
function assertIsFaculty(unknownData: any): asserts unknownData is FacultyType {
  if (unknownData === null) throw new Error(`assertIsFaculty: unknownDataはnullです。`)
  if (typeof unknownData !== 'object') throw new Error(`assertIsFaculty: unknownDataはobjectではありません。`)

  if (typeof unknownData.name !== 'string') throw new Error(`assertIsFaculty: unknownDataのnameの型が正しくありません`)
  if (typeof unknownData.requireDepartment !== 'boolean') throw new Error(`assertIsFaculty: unknownDataのrequireDepartmentの型が正しくありません`)
}
// とりあえず放置
function assertIsDepartment(unknownData: any): asserts unknownData is DepartmentType {
  if (unknownData === null) throw new Error(`assertIsDepartment: unknownDataはnullです。`)
  if (typeof unknownData !== 'object') throw new Error(`assertIsDepartment: unknownDataはobjectではありません。`)

  if (typeof unknownData.name !== 'string') throw new Error(`assertIsDepartment: unknownDataのnameの型が正しくありません`)
}
