import { useState, type KeyboardEvent, type PropsWithChildren } from 'react'
import { Textarea } from 'src/shared/ui/textarea'
import { Button } from 'src/shared/ui/button'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function MessageInput(props: Props) {
  const [text, setText] = useState<string>('')
  const sendMessage = () => {
    setText('')
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
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
          onClick={sendMessage}
          disabled={!text}
          className=" w-24 bg-orange-500 text-white"
        >
          Send
        </Button>
      </div>
    </div>
  )
}
