import { type PropsWithChildren } from 'react'
import { RefreshIcon } from 'src/assets'
import { Button } from 'src/shared/ui/button'
import { useGetNewMessages } from './useLoadNewMessages'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function LoadNewMessages(props: Props) {
  const onLoadNewMessages = useGetNewMessages()

  return (
    <div className="h-12 flex justify-center items-center mb-4">
      <Button
        className="bg-emerald-400 flex justify-center text-sm items-center rounded-3xl text-gray-100 gap-1"
        onClick={onLoadNewMessages}
      >
        Get new messages
        <RefreshIcon className=" w-4 h-4" />
      </Button>
    </div>
  )
}
