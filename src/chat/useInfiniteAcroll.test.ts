import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest'
import { useInfiniteScroll } from './useInfiniteScroll'
import { usePagination } from './PaginationController'
import { useMessages } from './MessagesController'
import type { RefObject } from 'react'

vi.mock('./PaginationController', () => ({
  usePagination: vi.fn(),
}))

vi.mock('./MessagesController', () => ({
  useMessages: vi.fn(),
}))

describe('useInfiniteScroll', () => {
  const mockDispatch = vi.fn()

  const createMockContainer = (scrollTop: number, scrollHeight: number) => {
    const div = document.createElement('div')
    Object.defineProperty(div, 'scrollHeight', {
      value: scrollHeight,
      configurable: true,
    })
    Object.defineProperty(div, 'scrollTop', {
      value: scrollTop,
      writable: true,
    })
    return div
  }

  beforeEach(() => {
    vi.clearAllMocks()

    ;(useMessages as Mock).mockReturnValue({
      state: { messages: [{ createdAt: '2026-01-01T00:00:00Z' }] },
    })
  })

  it('should dispatch UPDATE_CURSOR when scrolling near the top and hasMore is true', () => {
    ;(usePagination as Mock).mockReturnValue({
      state: { hasMore: true },
      dispatch: mockDispatch,
    })

    const { result } = renderHook(() => useInfiniteScroll())

    const mockContainer = createMockContainer(50, 1000)
    ;(result.current.scrollContainerRef as RefObject<HTMLDivElement>).current =
      mockContainer

    act(() => {
      result.current.handleScroll()
    })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_CURSOR',
      payload: { before: '2026-01-01T00:00:00Z' },
    })
  })

  it('should NOT dispatch if hasMore is false', () => {
    ;(usePagination as Mock).mockReturnValue({
      state: { hasMore: false },
      dispatch: mockDispatch,
    })

    const { result } = renderHook(() => useInfiniteScroll())
    const mockContainer = createMockContainer(50, 1000)
    ;(result.current.scrollContainerRef as RefObject<HTMLDivElement>).current =
      mockContainer

    act(() => {
      result.current.handleScroll()
    })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should NOT dispatch if scrollTop is above the threshold (10%)', () => {
    ;(usePagination as Mock).mockReturnValue({
      state: { hasMore: true },
      dispatch: mockDispatch,
    })

    const { result } = renderHook(() => useInfiniteScroll())

    const mockContainer = createMockContainer(150, 1000)
    ;(result.current.scrollContainerRef as RefObject<HTMLDivElement>).current =
      mockContainer

    act(() => {
      result.current.handleScroll()
    })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should handle missing container gracefully', () => {
    ;(usePagination as Mock).mockReturnValue({
      state: { hasMore: true },
      dispatch: mockDispatch,
    })

    const { result } = renderHook(() => useInfiniteScroll())

    act(() => {
      result.current.handleScroll()
    })

    expect(mockDispatch).not.toHaveBeenCalled()
  })
})
