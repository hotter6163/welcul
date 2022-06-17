import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore'
import useSWR from 'swr'

import { db } from '../app'

type UserDocumentType = {
  firstName: string
  lastName: string
  nickName: string
  displayNameFormat: 'firstname' | 'lastname' | 'fullname' | 'nickname'
  university: string
  faculty: string
  department: string
}

type CurrentUserType = UserDocumentType & {
  uid: string
  displayName: string
  email: string
} | null | undefined

type ReturnValueType = {
  user: CurrentUserType
  setUser: Dispatch<SetStateAction<CurrentUserType>>
}

// useContextで毎回auth、dbにアクセスするのをなくした方が良いかも
export const useCurrentUser = (auth: Auth): ReturnValueType => {
  // 以下のエラーが発生するため、useSWRのkeyの書き方が微妙
  // Rendered more hooks than during the previous render.
  const [user, setUser] = useState<CurrentUserType>(undefined)
  const [authUser] = useAuthState(auth)
  const { data } = useSWR(authUser ? authUser.uid : '', async (uid) => {
    return getDoc(doc(db, 'users', uid))
  })

  useEffect(() => {
    if (!!authUser && !!data) {
      const userDocument = data.data() as UserDocumentType
      const displayName = (() => {
        switch (userDocument.displayNameFormat) {
          case 'fullname':
            return `${userDocument.lastName} ${userDocument.firstName}`
          case 'lastname':
            return `${userDocument.lastName}`
          case 'firstname':
            return `${userDocument.firstName}`
          case 'nickname':
            return `${userDocument.nickName}`
        }
      })()
      setUser({
        uid: authUser.uid,
        ...userDocument,
        displayName,
        email: authUser.email ? authUser.email : ''
      })
    } else {
      setUser(undefined)
    }
  }, [authUser, data])

  return { user, setUser }
}
