import { type PropsWithChildren } from 'react'
import { ChatContainer } from './ChatContainer'
import { MessageInput } from './MessageInput'
import { MessagesContainer } from './MessagesContainer'
import { Messages } from './Messages'
import { MessagesController } from './MessagesController'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Chat(props: Props) {
  return (
    <ChatContainer>
      <MessagesController>
        <MessagesContainer>
          <Messages />
        </MessagesContainer>
        <MessageInput />
      </MessagesController>
    </ChatContainer>
  )
}
