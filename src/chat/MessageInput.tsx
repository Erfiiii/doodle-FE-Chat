import {
  memo,
  useCallback,
  useState,
  type KeyboardEvent,
  type PropsWithChildren,
} from 'react'
import { Textarea } from 'src/shared/ui/textarea'
import { Button } from 'src/shared/ui/button'
import { sendMessage, type ApiError } from 'src/core/client'
import { useUserContext } from 'src/core/auth/UserProvider'
import { useMessages } from './MessagesController'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export const MessageInput = memo((props: Props) => {
  const [text, setText] = useState<string>('')
  const user = useUserContext()
  const { dispatch } = useMessages()

  const onSendMessage = useCallback(async () => {
    if (!text) return
    try {
      const message = await sendMessage(text, user.name)
      dispatch({ type: 'ADD_MESSAGE', payload: { message } })
      setText('')
    } catch (error) {
      const { status, ...rest } = error as { status: number }
      dispatch({
        type: 'SET_ERROR',
        payload: {
          error: rest as ApiError,
        },
      })
    }
  }, [dispatch, text, user.name])

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      await onSendMessage()
    }
  }
  return (
    <div className="w-full bg-blue-400">
      <div className="p-2 flex items-end gap-2 md:w-3xl lg:w-5xl justify-center mx-auto">
        <Textarea
          value={text}
          autoFocus
          className="p-3 resize-none field-sizing-content max-h-34"
          placeholder="Message"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={onSendMessage}
          disabled={!text}
          className=" w-24 bg-orange-500 text-white"
        >
          Send
        </Button>
      </div>
    </div>
  )
})
