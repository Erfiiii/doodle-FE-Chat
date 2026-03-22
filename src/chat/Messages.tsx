import { type PropsWithChildren } from 'react'
import { Message } from './Message'
import { useMessages } from './MessagesController'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Messages(props: Props) {
  const { state } = useMessages()
  return (
    <div className="flex flex-col gap-4 p-6 md:w-3xl lg:w-5xl mx-auto">
      {state.messages.map((item) => (
        <Message key={item._id} value={item} />
      ))}
    </div>
  )
}
