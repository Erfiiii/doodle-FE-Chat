import { memo, type PropsWithChildren } from 'react'
import { DateOutput } from 'src/shared/date'
import type { Message as Messagetype } from 'src/core/client'

interface OwnProps {
  value: Messagetype
  isUserMessage: boolean
}

type Props = PropsWithChildren<OwnProps>

export const Message = memo((props: Props) => {
  const { value, isUserMessage } = props
  return (
    <div className={`flex ${isUserMessage ? 'flex-row-reverse' : ''}`}>
      <div
        className={`${isUserMessage ? 'bg-amber-100' : 'bg-white'} border-2 border-gray-300 rounded-md p-4 flex flex-col text-left max-w-[60%]`}
      >
        {!isUserMessage && (
          <span className="text-gray-400">{value.author}</span>
        )}
        <p className="font-semibold text-gray-600">{value.message}</p>
        <DateOutput
          date={new Date(value.createdAt)}
          className={`text-gray-400 ${isUserMessage ? 'text-right' : ''}`}
        />
      </div>
    </div>
  )
})
