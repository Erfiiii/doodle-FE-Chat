import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest'
import { useGetMessages } from './useGetMessages'
import { getMessages } from 'src/core/client'
import { useMessages } from './MessagesController'
import { usePagination } from './PaginationController'

vi.mock('src/core/client', () => ({
  getMessages: vi.fn(),
}))

vi.mock('./MessagesController', () => ({
  useMessages: vi.fn(),
}))

vi.mock('./PaginationController', () => ({
  usePagination: vi.fn(),
}))

describe('useGetMessages', () => {
  const mockMessagesDispatch = vi.fn()
  const mockPaginationDispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    ;(useMessages as Mock).mockReturnValue({
      dispatch: mockMessagesDispatch,
    })

    ;(usePagination as Mock).mockReturnValue({
      state: { limit: 20, before: '123' },
      dispatch: mockPaginationDispatch,
    })
  })

  it('should fetch messages and dispatch ADD_MESSAGES on success', async () => {
    const mockData = [{ id: 1, text: 'Hello' }]
    ;(getMessages as Mock).mockResolvedValue(mockData)

    renderHook(() => useGetMessages())

    expect(mockMessagesDispatch).toHaveBeenCalledWith({
      type: 'SET_LOADING',
      payload: true,
    })

    await waitFor(() => {
      expect(mockMessagesDispatch).toHaveBeenCalledWith({
        type: 'ADD_MESSAGES',
        payload: { messages: mockData },
      })
      expect(mockMessagesDispatch).toHaveBeenCalledWith({
        type: 'SET_LOADING',
        payload: false,
      })
    })
  })

  it('should dispatch SET_HAS_MORE false when no messages are returned', async () => {
    ;(getMessages as Mock).mockResolvedValue([])

    renderHook(() => useGetMessages())

    await waitFor(() => {
      expect(mockPaginationDispatch).toHaveBeenCalledWith({
        type: 'SET_HAS_MORE',
        payload: false,
      })
    })
  })

  it('should handle API errors correctly', async () => {
    const mockError = { status: 500, message: 'Server Error' }
    ;(getMessages as Mock).mockRejectedValue(mockError)

    renderHook(() => useGetMessages())

    await waitFor(() => {
      expect(mockMessagesDispatch).toHaveBeenCalledWith({
        type: 'SET_ERROR',
        payload: { error: { message: 'Server Error' } },
      })
      expect(mockMessagesDispatch).toHaveBeenCalledWith({
        type: 'SET_LOADING',
        payload: false,
      })
    })
  })

  it('should re-run when query params change', async () => {
    ;(getMessages as Mock).mockResolvedValue([])

    const { rerender } = renderHook(() => useGetMessages())

    ;(usePagination as Mock).mockReturnValue({
      state: { limit: 50, before: '456' },
      dispatch: mockPaginationDispatch,
    })

    rerender()

    await waitFor(() => {
      expect(getMessages).toHaveBeenCalledWith('limit=50&before=456')
    })
  })
})
