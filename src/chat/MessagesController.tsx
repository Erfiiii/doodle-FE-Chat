import type { ApiError, Message } from 'src/core/client'
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react'

type State = {
  messages: Message[]
  isLoading: boolean
  error: ApiError | undefined
}

type Action =
  | {
      type: 'SET_MESSAGES'
      payload: {
        messages: Message[]
      }
    }
  | {
      type: 'ADD_MESSAGE'
      payload: {
        message: Message
      }
    }
  | {
      type: 'ADD_MESSAGES'
      payload: {
        messages: Message[]
      }
    }
  | {
      type: 'SET_LOADING'
      payload: boolean
    }
  | {
      type: 'SET_ERROR'
      payload: {
        error: ApiError
      }
    }
  | {
      type: 'DISMISS_ERROR'
    }

const initialState: State = {
  messages: [],
  isLoading: false,
  error: undefined,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload.messages }
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload.message] }
    case 'ADD_MESSAGES': {
      const messageMap = new Map(state.messages.map((m) => [m._id, m]))
      action.payload.messages.forEach((m) => messageMap.set(m._id, m))
      return {
        ...state,
        messages: Array.from(messageMap.values()).sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      }
    }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: action.payload ? undefined : state.error,
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload.error, isLoading: false }
    case 'DISMISS_ERROR':
      return { ...state, error: undefined }
    default:
      return state
  }
}

type MessagesContextType = {
  state: State
  dispatch: Dispatch<Action>
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
)

export const useMessages = () => {
  const context = useContext(MessagesContext)

  if (!context) {
    throw new Error('useMessages should be used inside <MessagesController>')
  }

  return context
}

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>

export function MessagesController(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state])
  return (
    <MessagesContext.Provider value={contextValue}>
      {props.children}
    </MessagesContext.Provider>
  )
}
