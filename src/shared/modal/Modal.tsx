import { useEffect, useRef, type PropsWithChildren } from 'react'

interface OwnProps {
  isOpen: boolean
  onClose: () => void
}

type Props = PropsWithChildren<OwnProps>

export function Modal(props: Props) {
  const { isOpen, onClose, children } = props
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen, dialogRef])
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 m-auto rounded-xl border border-slate-200 bg-white p-0 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm open:flex open:flex-col animate-in fade-in zoom-in duration-200"
    >
      {children}
    </dialog>
  )
}
