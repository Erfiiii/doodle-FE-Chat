import { createContext, useContext, type PropsWithChildren } from 'react'

type UserContextType = {
  name: string
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUserContext() {
  const value = useContext(UserContext)

  if (!value) {
    throw new Error('useUserContext should be used inside <UserProvider/>')
  }

  return value
}

interface OwnProps {
  value: UserContextType
}

type Props = PropsWithChildren<OwnProps>

export function UserProvider(props: Props) {
  const { value, children } = props
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
