import type { PropsWithChildren, TextareaHTMLAttributes } from 'react'

interface OwnProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

type Props = PropsWithChildren<OwnProps>

export function Textarea(props: Props) {
  const { className, children, ...rest } = props

  return (
    <textarea
      className={`bg-white flex-1 rounded-md  text-gray-600 outline-0 border-blue-200 border-2 focus:border-blue-800 ${className}`}
      {...rest}
    >
      {children}
    </textarea>
  )
}
