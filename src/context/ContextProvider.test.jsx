// @vitest-environment jsdom
import React from 'react'
import { useContext } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, renderHook, waitFor } from '@testing-library/react'
import ContextProvider from './ContextProvider'
import { BookContext } from './BookContext'

vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const wrapper = ({ children }) => <ContextProvider>{children}</ContextProvider>

describe('ContextProvider interactions', () => {
  beforeEach(() => {
    const store = {}

    vi.stubGlobal('localStorage', {
      getItem: (key) => (key in store ? store[key] : null),
      setItem: (key, value) => {
        store[key] = String(value)
      },
      removeItem: (key) => {
        delete store[key]
      },
      clear: () => {
        Object.keys(store).forEach((key) => {
          delete store[key]
        })
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('moves a wishlist book to read list when marked as read', async () => {
    const book = { bookId: 100, bookName: 'Mockingbird' }
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    act(() => {
      result.current.handleWishlist(book)
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(1)
    })

    act(() => {
      result.current.handleMarkAsRead(book)
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(0)
      expect(result.current.storedBooks).toHaveLength(1)
      expect(result.current.storedBooks[0].bookId).toBe(100)
    })
  })

  it('restores wishlist item when undo is clicked in toast action', async () => {
    const book = { bookId: 200, bookName: 'Undo Book' }
    const { toast } = await import('react-toastify')
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    act(() => {
      result.current.handleWishlist(book)
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(1)
    })

    act(() => {
      result.current.handleRemoveFromWishlist(book.bookId)
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(0)
    })

    const toastCall = toast.info.mock.calls.find((call) => typeof call[0] === 'function')
    expect(toastCall).toBeTruthy()

    const closeToast = vi.fn()
    const toastContent = toastCall[0]({ closeToast })
    const { getByRole, unmount } = render(toastContent)

    act(() => {
      fireEvent.click(getByRole('button', { name: 'Undo last action' }))
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(1)
      expect(result.current.wishlist[0].bookId).toBe(200)
    })

    expect(closeToast).toHaveBeenCalledTimes(1)
    unmount()
  })

  it('prevents duplicate additions to wishlist', async () => {
    const book = { bookId: 300, bookName: 'No Duplicates' }
    const { toast } = await import('react-toastify')
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    act(() => {
      result.current.handleWishlist(book)
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(1)
      expect(toast.success).toHaveBeenCalledTimes(1)
    })

    act(() => {
      result.current.handleWishlist(book)
    })

    await waitFor(() => {
      expect(result.current.wishlist).toHaveLength(1)
      expect(toast.error).toHaveBeenCalledWith('This book is already in your wishlist.')
    })
  })
})
