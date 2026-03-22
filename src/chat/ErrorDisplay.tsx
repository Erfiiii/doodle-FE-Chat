import type { PropsWithChildren } from 'react'
import { Button } from 'src/shared/ui/button'

interface OwnProps {
  message: string
  onClose: () => void
}

type Props = PropsWithChildren<OwnProps>

export function ErrorDisplay(props: Props) {
  const { message, onClose } = props
  return (
    <div className="  bg-amber-700 flex justify-center items-center  p-4 shadow-2xl rounded-2xl">
      <p className="text-white font-semibold">{message}</p>
      <div className="flex-1" />
      <Button onClick={onClose}>X</Button>
    </div>
  )
}
