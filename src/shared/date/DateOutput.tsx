import type { PropsWithChildren } from 'react'
import { formatDate } from './format-date'

interface OwnProps {
  date: Date
  className?: string
}

type Props = PropsWithChildren<OwnProps>

export function DateOutput(props: Props) {
  const { className, date } = props
  return <span className={`inline-block ${className}`}>{formatDate(date)}</span>
}
