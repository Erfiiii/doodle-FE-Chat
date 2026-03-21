import { useEffect, useState } from 'react'

export const useGetUser = () => {
  const [user, setUser] = useState<string | null>(() =>
    sessionStorage.getItem('user'),
  )

  useEffect(() => {
    const handler = () => {
      const user = sessionStorage.getItem('user')
      setUser(user)
    }
    addEventListener('add-new-user', handler)

    return () => removeEventListener('add-new-user', handler)
  }, [])

  return user
}
