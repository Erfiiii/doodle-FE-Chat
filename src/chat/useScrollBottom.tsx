import { useEffect, useRef } from 'react'
import { useMessages } from './MessagesController'

export const useScrollBottom = () => {
  const { state } = useMessages()
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView()
    }
  }, [state.messages])

  return scrollBottomRef
}
