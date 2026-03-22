import type { PropsWithChildren } from 'react'
import { DateOutput } from 'src/shared/date'
import { useUserContext } from 'src/core/auth/UserProvider'
import type { Message } from './types'

interface OwnProps {
  value: Message
}

type Props = PropsWithChildren<OwnProps>

export function Message(props: Props) {
  const { value } = props
  const user = useUserContext()
  const isSelf = value.author === user.name
  return (
    <div className={`flex ${isSelf ? 'flex-row-reverse' : ''}`}>
      <div
        className={`${isSelf ? 'bg-amber-100' : 'bg-white'} border-2 border-gray-300 rounded-md p-4 flex flex-col text-left max-w-[60%]`}
      >
        {!isSelf && <span className="text-gray-400">{value.author}</span>}
        <p className="font-semibold text-gray-600">{value.message}</p>
        <DateOutput
          date={new Date(value.createdAt)}
          className={`text-gray-400 ${isSelf ? 'text-right' : ''}`}
        />
      </div>
    </div>
  )
}
