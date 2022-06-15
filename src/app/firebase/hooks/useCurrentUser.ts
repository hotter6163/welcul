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

export const useCurrentUser = (auth: Auth): ReturnValueType => {
  const [authUser, loading] = useAuthState(auth)
  // auth.currentUserが存在しないとき
  if (!authUser) {
    return {
      user: authUser,
      loading,
      error: false
    }
  }

  let user: CurrentUserType
  const { data } = useSWR(authUser.uid, async (uid) => {
    return getDoc(doc(db, 'users', uid))
  })

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
