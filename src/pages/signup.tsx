import { useState } from 'react'
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
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
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
  displayNameFormat: 'firstname' | 'lastname' | 'fullname' | 'nickname'
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

// 同じような処理を複数記述しているから、めっちゃ冗長になっている
// リファクタリング等行う必要があると思う
const Page: NextPage = () => {
  const [registering, setRegistering] = useState(false)
  const router = useRouter()
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { displayNameFormat: 'fullname' }
  })
  const watchUniversityId = useWatch({ control, name: 'universityId' })
  const watchFacultyId = useWatch({ control, name: 'facultyId' })
  const watchDisplayNameFotmat = useWatch({ control, name: 'displayNameFormat' })
  const watchFirstName = useWatch({ control, name: 'firstName' })
  const watchLastName = useWatch({ control, name: 'lastName' })
  const watchNickName = useWatch({ control, name: 'nickName' })

  // 大学一覧を取得した後の処理
  const { data: universityData } = useSWR('universities', async (key) => {
    return getDocs(collection(db, key))
  })
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

  // 学部一覧を取得した後の処理
  const { data: facultyData } = useSWR(`/${watchUniversityId}`, async (pass) => {
    const keys = pass.split('/')
    return getDocs(collection(db, 'universities', keys[1], 'faculties'))
  })
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

  // 学科一覧を取得した後の処理
  const { data: departmentData } = useSWR(`/${watchUniversityId}/${watchFacultyId}`, async (pass) => {
    const keys = pass.split('/')
    return getDocs(collection(db, 'universities', keys[1], 'faculties', keys[2], 'departments'))
  })
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
    displayNameFormat,
    universityId,
    facultyId,
    departmentId,
    email,
    password
  }) => {
    setRegistering(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          nickName,
          displayNameFormat,
          university: {
            id: universityId,
            name: universities[universityId].name
          },
          faculty: {
            id: facultyId,
            name:faculties[facultyId].name
          },
          department: {
            id: departmentId,
            name: departments[departmentId].name
          },
        })
          .then(() => {
            router.push('/home')
          })
          .catch(async () => {
            await user.delete()
            setRegistering(false)
          })
      })
      .catch(() => {
        setRegistering(false)
      })
  }

  return wrapInLayout('user',
    <Grid container>
      <Grid item className="self-center w-screen">
        <Stack spacing={3} sx={{ mb: '30vh'}}>
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
                  rules={{
                    required: { value: true, message: '苗字を入力したください' },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      required
                      id="lastName"
                      label="苗字"
                      type="text"
                      variant="standard"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: { value: true, message: '名前を入力したください。' },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      required
                      id="firstName"
                      label="名前"
                      type="text"
                      variant="standard"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="nickName"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: { value: watchDisplayNameFotmat === "nickname", message: "表示名がニックネームの場合、入力が必要です。"},
                    maxLength: { value: 20, message: 'ニックネームは20文字以下です。'},
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      required={watchDisplayNameFotmat === "nickname"}
                      id="nickName"
                      label="ニックネーム"
                      type="text"
                      variant="standard"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="displayNameFormat"
                  control={control}
                  defaultValue="fullname"
                  rules={{
                    required: { value: true, message: '表示名を選択してください。' },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl
                      required
                      error={!!error}
                    >
                      <FormLabel id="display-name-format">表示名</FormLabel>
                      <div className="text-center my-2">
                        {(() => {
                          switch (watchDisplayNameFotmat) {
                            case 'fullname':
                              return (
                                <Typography variant="text" className="font-semibold">
                                  {`${watchLastName ? watchLastName : '(苗字)'} ${watchFirstName ? watchFirstName : '(名前)'}`}
                                </Typography>
                              )
                            case 'firstname':
                              return (
                                <Typography variant="text" className="font-semibold">
                                  {`${watchFirstName ? watchFirstName : '(名前)'}`}
                                </Typography>
                              )
                            case 'lastname':
                              return (
                                <Typography variant="text" className="font-semibold">
                                  {`${watchLastName ? watchLastName : '(苗字)'}`}
                                </Typography>
                              )
                            case 'nickname':
                              return (
                                <Typography variant="text" className="font-semibold">
                                  {`${watchNickName ? watchNickName : '(ニックネーム)'}`}
                                </Typography>
                              )
                          }
                        })()}
                      </div>
                      <RadioGroup
                        id="display-name-format"
                        aria-labelledby="display-name-format"
                        {...field}
                        className="pl-8"
                      >
                        <FormControlLabel value="fullname" control={<Radio size="small" />} label="フルネーム" />
                        <FormControlLabel value="lastname" control={<Radio size="small" />} label="苗字" />
                        <FormControlLabel value="firstname" control={<Radio size="small" />} label="名前" />
                        <FormControlLabel value="nickname" control={<Radio size="small" />} label="ニックネーム" />
                      </RadioGroup>
                      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="universityId"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: { value: true, message: "大学を選択したください。"}
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl
                      required
                      variant="standard"
                      error={!!error}
                    >
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
                      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                {watchUniversityId && (
                  <Controller
                    name="facultyId"
                    control={control}
                    defaultValue={""}
                    rules={{
                      required: { value: true, message: "学部を選択したください。"}
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl
                        required
                        variant="standard"
                        error={!!error}
                      >
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
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                )}
                {watchFacultyId && faculties[watchFacultyId].requireDepartment && (
                  <Controller
                    name="departmentId"
                    control={control}
                    defaultValue={""}
                    rules={{
                      required: { value: faculties[watchFacultyId].requireDepartment, message: "学科を選択したください。"}
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl
                        required={faculties[watchFacultyId].requireDepartment}
                        variant="standard"
                        error={!!error}
                      >
                        <InputLabel id="department">学科</InputLabel>
                        <Select
                          labelId="department"
                          id="department"
                          {...field}
                        >
                          {selectDepartmentItems}
                        </Select>
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                )}
                <Controller
                  name="email"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: { value: true, message: "メールアドレスを選択したください。"}
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      required
                      id="email"
                      label="メールアドレス"
                      type="email"
                      variant="standard"
                      autoComplete="email"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: { value: true, message: "パスワードをを選択したください。"},
                    minLength: { value: 6, message: "パスワードは6文字以上です。"}
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      required
                      id="password"
                      label="パスワード"
                      type="password"
                      variant="standard"
                      autoComplete="current-password"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
                <div className="text-center">
                  <LoadingButton
                    variant="contained"
                    color="accent"
                    type="submit"
                    loading={registering}
                    loadingIndicator="登録中..."
                    sx={{ width: "8rem" }}
                  >
                    登録
                  </LoadingButton>
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

// 大学のアサーション関数
function assertIsUniversity(unknownData: any): asserts unknownData is UniversityType {
  if (unknownData === null) throw new Error(`assertIsUniversity: unknownDataはnullです。`)
  if (typeof unknownData !== 'object') throw new Error(`assertIsUniversity: unknownDataはobjectではありません。`)

  if (typeof unknownData.name !== 'string') throw new Error(`assertIsUniversity: unknownDataのnameの型が正しくありません`)
}

// 学部のアサーション関数
function assertIsFaculty(unknownData: any): asserts unknownData is FacultyType {
  if (unknownData === null) throw new Error(`assertIsFaculty: unknownDataはnullです。`)
  if (typeof unknownData !== 'object') throw new Error(`assertIsFaculty: unknownDataはobjectではありません。`)

  if (typeof unknownData.name !== 'string') throw new Error(`assertIsFaculty: unknownDataのnameの型が正しくありません`)
  if (typeof unknownData.requireDepartment !== 'boolean') throw new Error(`assertIsFaculty: unknownDataのrequireDepartmentの型が正しくありません`)
}

// 学科のアサーション関数
function assertIsDepartment(unknownData: any): asserts unknownData is DepartmentType {
  if (unknownData === null) throw new Error(`assertIsDepartment: unknownDataはnullです。`)
  if (typeof unknownData !== 'object') throw new Error(`assertIsDepartment: unknownDataはobjectではありません。`)

  if (typeof unknownData.name !== 'string') throw new Error(`assertIsDepartment: unknownDataのnameの型が正しくありません`)
}
