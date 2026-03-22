import { type PropsWithChildren } from 'react'
import { useGetMessages } from './useGetMessages'
import { useScrollBottom } from './useScrollBottom'
import { useInfiniteScroll } from './useInfiniteScroll'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function MessagesContainer(props: Props) {
  const { children } = props
  const { scrollContainerRef, handleScroll } = useInfiniteScroll()
  const scrollBottomRef = useScrollBottom()
  useGetMessages()
  return (
    <div
      className="bg-[url(/src/assets/chat-background.png)] bg-cover bg-no-repeat overflow-auto flex-1"
      ref={scrollContainerRef}
      onScroll={handleScroll}
    >
      {children}
      <div ref={scrollBottomRef} />
    </div>
  )
}
