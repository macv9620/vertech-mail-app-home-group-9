/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext<UserLogged>({
    userLogged: { name: '', email: '' },
    setUserLogged: () => {}
  })

type Props = {
    children: JSX.Element
}

type UserLogged = {
    userLogged: IAuthenticatedUser,
    setUserLogged: React.Dispatch<React.SetStateAction<IAuthenticatedUser>>
}

const ContextAuthProvider = ({ children }: Props) => {
  // contains the user logged info in the current session
  const [userLogged, setUserLogged] = useState<IAuthenticatedUser>({
    name: '',
    email: ''
  })

  const valuesObject: UserLogged = { userLogged, setUserLogged }

  return (
    <AuthContext.Provider value={valuesObject}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}

export { ContextAuthProvider, useAuthContext }
