import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth } from "firebase/auth";
import useSWR from 'swr'

import { auth, db } from '../app'

type CurrentUserType = {
  displayName: string | null
  email: string | null
} | null | undefined

type ReturnValueType = {
  user: CurrentUserType
}

export const useCurrentUser = (auth: Auth): ReturnValueType => {
  const [authUser] = useAuthState(auth)
  let user: CurrentUserType
  if (authUser) {
    user = {
      displayName: authUser.displayName,
      email: authUser.email
    }
  }

  return {
    user
  }
}
