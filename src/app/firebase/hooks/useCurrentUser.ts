import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore'
import useSWR from 'swr'

import { auth, db } from '../app'

type CurrentUserType = {
  uid: string
  displayName: string | null
  email: string | null
} | null | undefined

type UserDocumentType = {
  name: string
}

type ReturnValueType = {
  user: CurrentUserType
  loading: boolean
  error: boolean
}

// useContextで毎回auth、dbにアクセスするのをなくした方が良いかも
export const useCurrentUser = (auth: Auth): ReturnValueType => {
  // 以下のエラーが発生するため、useSWRのkeyの書き方が微妙
  // Rendered more hooks than during the previous render.
  const [authUser] = useAuthState(auth)
  let user: CurrentUserType
  const { data } = useSWR(authUser ? authUser.uid : '', async (uid) => {
    return getDoc(doc(db, 'users', uid))
  })

  // authUserが存在しない
  if (!authUser) {
    return {
      user: null,
      loading: false,
      error: false
    }
  }

  // firestoreからデータを取得中の場合
  if (!data) {
    return {
      user: null,
      loading: true,
      error: false
    }
  }

  // firestore内にユーザーデータがない場合
  if (!data.data()) {
    return {
      user: null,
      loading: false,
      error: true
    }
  }

  const userDocument = data.data() as UserDocumentType
  user = {
    uid: authUser.uid,
    displayName: authUser.displayName || userDocument.name,
    email: authUser.email
  }

  return {
    user,
    loading: false,
    error: false
  }
}
