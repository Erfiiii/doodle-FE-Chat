import { type PropsWithChildren } from 'react'
import { ChatContainer } from './ChatContainer'
import { MessageInput } from './MessageInput'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Chat(props: Props) {
  return (
    <ChatContainer>
      <MessageInput onSendMessage={() => {}} />
    </ChatContainer>
  )
}
