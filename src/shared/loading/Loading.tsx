import type { PropsWithChildren } from 'react'
import { LoadingIcon } from 'src/assets'

interface OwnProps {
  className?: string
}

type Props = PropsWithChildren<OwnProps>

export function Loading(props: Props) {
  const { className } = props

  return (
    <div className="flex justify-center items-center">
      <LoadingIcon
        className={`w-12 h-12 animate-spin text-blue-500 ${className}`}
      />
    </div>
  )
}
