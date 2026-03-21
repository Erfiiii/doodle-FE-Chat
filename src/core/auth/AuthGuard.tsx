import { type PropsWithChildren } from 'react'
import { UserProvider } from './UserProvider'
import { Login } from 'src/login'
import { useGetUser } from './useGetUser'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function AuthGuard(props: Props) {
  const { children } = props
  const user = useGetUser()

  if (!user) {
    return <Login />
  }

  return <UserProvider value={{ name: user }}>{children}</UserProvider>
}
