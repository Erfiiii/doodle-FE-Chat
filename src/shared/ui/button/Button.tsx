import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface OwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

type Props = PropsWithChildren<OwnProps>

export function Button(props: Props) {
  const { className, children, ...rest } = props
  return (
    <button
      {...rest}
      className={`rounded-md p-3 font-semibold cursor-pointer disabled:opacity-70 hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  )
}
