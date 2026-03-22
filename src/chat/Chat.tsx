import { type PropsWithChildren } from 'react'
import { ChatContainer } from './ChatContainer'
import { MessageInput } from './MessageInput'
import { MessagesContainer } from './MessagesContainer'
import { Messages } from './Messages'
import { MessagesController } from './MessagesController'
import { PaginationController } from './PaginationController'
import { LoadNewMessages } from './LoadNewMessages'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Chat(props: Props) {
  return (
    <ChatContainer>
      <MessagesController>
        <PaginationController defaultLimit={10}>
          <MessagesContainer>
            <Messages />
            <LoadNewMessages />
          </MessagesContainer>
        </PaginationController>
        <MessageInput />
      </MessagesController>
    </ChatContainer>
  )
}
