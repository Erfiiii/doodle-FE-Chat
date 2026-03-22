import { useEffect, useRef, type PropsWithChildren } from 'react'
import { useMessages } from './MessagesController'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function MessagesContainer(props: Props) {
  const { children } = props
  const { state } = useMessages()
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView()
    }
  }, [state.messages])
  return (
    <div className="bg-[url(/src/assets/chat-background.png)] bg-cover bg-no-repeat overflow-auto flex-1">
      {children}
      <div ref={scrollBottomRef} />
    </div>
  )
}
