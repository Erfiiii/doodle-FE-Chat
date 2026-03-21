import { type PropsWithChildren } from 'react'
import { ChatContainer } from './ChatContainer'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Chat(props: Props) {
  return <ChatContainer>Chat</ChatContainer>
}
