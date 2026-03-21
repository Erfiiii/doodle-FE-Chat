import type { InputHTMLAttributes, PropsWithChildren } from 'react'

interface OwnProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

type Props = PropsWithChildren<OwnProps>

export function Input(props: Props) {
  const { className, children, ...rest } = props

  return (
    <input
      className={`bg-white flex-1 rounded-md  text-gray-600 outline-0 border-blue-200 border-2 focus:border-blue-800 ${className}`}
      {...rest}
    >
      {children}
    </input>
  )
}
