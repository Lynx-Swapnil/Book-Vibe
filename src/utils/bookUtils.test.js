import { describe, expect, it } from 'vitest'
import { removeBookById, restoreBookIfMissing } from './bookUtils'

describe('book collection helpers', () => {
  it('removes a book and restores it once without duplicates', () => {
    const books = [
      { bookId: 1, bookName: 'A' },
      { bookId: 2, bookName: 'B' },
    ]

    const { nextBooks, removedBook } = removeBookById(books, 2)
    expect(nextBooks).toEqual([{ bookId: 1, bookName: 'A' }])
    expect(removedBook).toEqual({ bookId: 2, bookName: 'B' })

    const restored = restoreBookIfMissing(nextBooks, removedBook)
    expect(restored).toHaveLength(2)

    const restoredAgain = restoreBookIfMissing(restored, removedBook)
    expect(restoredAgain).toHaveLength(2)
  })

  it('moves a book from wishlist to read list without duplicate inserts', () => {
    const readList = [{ bookId: 1, bookName: 'Read One' }]
    const wishlist = [{ bookId: 2, bookName: 'Wish One' }]

    const { nextBooks: nextWishlist, removedBook } = removeBookById(wishlist, 2)
    expect(nextWishlist).toEqual([])
    expect(removedBook).toEqual({ bookId: 2, bookName: 'Wish One' })

    const nextReadList = restoreBookIfMissing(readList, removedBook)
    expect(nextReadList).toEqual([
      { bookId: 1, bookName: 'Read One' },
      { bookId: 2, bookName: 'Wish One' },
    ])

    const nextReadListAgain = restoreBookIfMissing(nextReadList, removedBook)
    expect(nextReadListAgain).toHaveLength(2)
  })
})
