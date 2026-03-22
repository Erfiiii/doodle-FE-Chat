import { getMessages, type ApiError } from 'src/core/client'
import { useMessages } from './MessagesController'
import { useCallback, useMemo } from 'react'

export const useGetNewMessages = () => {
  const { state, dispatch } = useMessages()
  const lastMessageCreatedAt = useMemo(() => {
    return state.messages[state.messages.length - 1]?.createdAt
  }, [state.messages])
  const fetchNewMessages = useCallback(async () => {
    try {
      const messages = await getMessages(`after=${lastMessageCreatedAt}`)
      dispatch({ type: 'ADD_MESSAGES', payload: { messages } })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          error: error as ApiError,
        },
      })
    }
  }, [dispatch, lastMessageCreatedAt])

  return fetchNewMessages
}
