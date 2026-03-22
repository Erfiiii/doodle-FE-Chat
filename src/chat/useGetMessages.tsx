import { useEffect } from 'react'
import { getMessages, type ApiError } from 'src/core/client'
import { useMessages } from './MessagesController'

export const useGetMessages = (queryParam?: string) => {
  const { dispatch } = useMessages()
  useEffect(() => {
    const fn = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const messages = await getMessages(queryParam)
        dispatch({ type: 'SET_MESSAGES', payload: { messages } })
      } catch (error) {
        const { status, ...rest } = error as { status: number }
        dispatch({
          type: 'SET_ERROR',
          payload: {
            error: rest as ApiError,
          },
        })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    fn()
  }, [queryParam, dispatch])
}
