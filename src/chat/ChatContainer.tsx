import type { PropsWithChildren } from 'react'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function ChatContainer(props: Props) {
  return (
    <div className="h-full w-full">
      {/* Sidebar here */}
      <div className="flex flex-col h-full">{props.children}</div>
    </div>
  )
}
