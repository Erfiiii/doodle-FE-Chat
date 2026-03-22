import { useCallback, useRef } from 'react'
import { usePagination } from './PaginationController'
import { useMessages } from './MessagesController'

export function useInfiniteScroll() {
  const { state: paginationState, dispatch } = usePagination()
  const { state } = useMessages()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container || !paginationState.hasMore) return

    const thresholdPixels = container.scrollHeight * 0.2
    if (container.scrollTop < thresholdPixels) {
      dispatch({
        type: 'UPDATE_CURSOR',
        payload: {
          before: state.messages[0].createdAt,
        },
      })
    }
  }, [dispatch, paginationState.hasMore, state.messages])

  return { scrollContainerRef, handleScroll }
}
