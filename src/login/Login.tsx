import { useState, type ChangeEvent, type PropsWithChildren } from 'react'
import { Modal } from 'src/shared/modal'
import { Input } from 'src/shared/ui/input'
import { Button } from 'src/shared/ui/button'
import { addUser } from 'src/core/auth'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Login(props: Props) {
  const [value, setValue] = useState<string>('')
  const [isOpen, setOpen] = useState<boolean>(true)
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSend = () => {
    addUser(value)
    setValue('')
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-4 p-4 w-96">
        <h3>Login</h3>
        <p className="text-gray-600">Before start please insert your name:</p>
        <Input
          placeholder="Username"
          className="min-h-12 p-2"
          onChange={onChangeName}
        />
        <Button disabled={!value} onClick={onSend} className="bg-green-300">
          Submit
        </Button>
      </div>
    </Modal>
  )
}
