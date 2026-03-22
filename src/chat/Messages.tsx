import { type PropsWithChildren } from 'react'
import { Message } from './Message'
import { useMessages } from './MessagesController'
import { Loading } from 'src/shared/loading'
import { ErrorDisplay } from './ErrorDisplay'

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function Messages(props: Props) {
  const { state, dispatch } = useMessages()
  return (
    <div className="flex flex-col gap-4 p-6 md:w-3xl lg:w-5xl mx-auto">
      {state.error && (
        <ErrorDisplay
          // TODO: use error message coming from API
          message="Somethin went wrong, please try again."
          onClose={() => dispatch({ type: 'DISMISS_ERROR' })}
        />
      )}
      {state.isLoading && <Loading />}
      {state.messages.map((item) => (
        <Message key={item._id} value={item} />
      ))}
    </div>
  )
}
