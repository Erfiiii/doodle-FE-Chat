import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react'

type PaginationsState = {
  limit: number
  before?: string
  after?: string
  hasMore: boolean
}

type Action =
  | {
      type: 'UPDATE_CURSOR'
      payload: {
        before?: string
        after?: string
      }
    }
  | {
      type: 'SET_HAS_MORE'
      payload: boolean
    }

const reducer = (state: PaginationsState, action: Action): PaginationsState => {
  switch (action.type) {
    case 'UPDATE_CURSOR':
      return { ...state, ...action.payload }
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload }
    default:
      return state
  }
}

type PaginationContextType = {
  state: PaginationsState
  dispatch: Dispatch<Action>
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined,
)

export const usePagination = () => {
  const context = useContext(PaginationContext)

  if (!context) {
    throw new Error(
      'usePagination must be used inside <PaginationController><PaginationController/>',
    )
  }

  return context
}

interface OwnProps {
  defaultLimit: number
}

type Props = PropsWithChildren<OwnProps>

export const PaginationController = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    limit: props.defaultLimit,
    before: new Date().toISOString(),
    hasMore: true,
  })
  const contextValue = useMemo(() => ({ state, dispatch }), [state])
  return (
    <PaginationContext.Provider value={contextValue}>
      {props.children}
    </PaginationContext.Provider>
  )
}
