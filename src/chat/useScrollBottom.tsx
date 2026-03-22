import { useEffect, useRef } from 'react'
import { useMessages } from './MessagesController'

export const useScrollBottom = () => {
  const { state } = useMessages()
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  const lastMessageIdRef = useRef<string>('')
  useEffect(() => {
    const lastMessageId = state.messages[state.messages.length - 1]?._id

    if (scrollBottomRef.current && lastMessageId !== lastMessageIdRef.current) {
      scrollBottomRef.current.scrollIntoView()
      lastMessageIdRef.current = lastMessageId
    }
  }, [state.messages])

  return scrollBottomRef
}
