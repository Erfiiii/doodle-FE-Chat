import { useEffect } from 'react'
import { getMessages, type ApiError } from 'src/core/client'
import { useMessages } from './MessagesController'
import { usePagination } from './PaginationController'

export const useGetMessages = () => {
  const { dispatch } = useMessages()
  const { state: paginationState, dispatch: paginationDispatch } =
    usePagination()
  const queryParam = `limit=${paginationState.limit}&before=${paginationState.before}`
  useEffect(() => {
    const fn = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const messages = await getMessages(queryParam)
        if (messages.length === 0) {
          paginationDispatch({ type: 'SET_HAS_MORE', payload: false })
          return
        }
        dispatch({ type: 'ADD_MESSAGES', payload: { messages } })
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
  }, [queryParam, dispatch, paginationDispatch])
}
