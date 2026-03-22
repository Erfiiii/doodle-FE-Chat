import { type PropsWithChildren } from 'react'
import { useGetMessages } from './useGetMessages'
import { useScrollBottom } from './useScrollBottom'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function MessagesContainer(props: Props) {
  const { children } = props
  useGetMessages()
  const scrollBottomRef = useScrollBottom()
  return (
    <div className="bg-[url(/src/assets/chat-background.png)] bg-cover bg-no-repeat overflow-auto flex-1">
      {children}
      <div ref={scrollBottomRef} />
    </div>
  )
}
