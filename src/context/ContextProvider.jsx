import React, { useState } from 'react';
import { BookContext } from './BookContext';
import { toast } from 'react-toastify';
import { normalizeBookId } from '../utils/bookUtils';

const ContextProvider = ({ children }) => {
    const [storedBooks, setStoredBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

  const showUndoToast = (message, onUndo) => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex items-center gap-3">
          <span className="text-sm">{message}</span>
          <button
            type="button"
            onClick={() => {
              onUndo();
              closeToast?.();
            }}
            className="rounded bg-white/90 px-2 py-1 text-xs font-bold text-gray-900"
          >
            Undo
          </button>
        </div>
      ),
      { autoClose: 4500 }
    );
  };

  const handleMarkAsRead = (currentBook) => {
   const normalizedId = normalizeBookId(currentBook);

   const isbookAlreadyMarked =  storedBooks.find(book => normalizeBookId(book) === normalizedId);

   if(isbookAlreadyMarked) {
    toast.error('You have already marked this book as read.');
    return;
   }
   else {
    const isInWishlist = wishlist.find(book => normalizeBookId(book) === normalizedId);
    if (isInWishlist) {
      setWishlist(wishlist.filter(book => normalizeBookId(book) !== normalizedId));
      toast.info(`${currentBook.bookName} removed from wishlist and moved to read list.`);
    }

    toast.success(`${currentBook.bookName} is added to your read list!`);
    setStoredBooks([...storedBooks, currentBook]);
   }
  }

  const handleWishlist = (currentBook) => {
  const normalizedId = normalizeBookId(currentBook);
   
  const isExistInMarkedAsReadlist = storedBooks.find(book => normalizeBookId(book) === normalizedId);

  if(isExistInMarkedAsReadlist) {
    toast.error('You have already marked this book as read. You cannot add it to your wishlist.');
    return;
   }
   
  const isbookAlreadyInWishlist = wishlist.find(book => normalizeBookId(book) === normalizedId);

   if(isbookAlreadyInWishlist) {
    toast.error('This book is already in your wishlist.');
    return;
   }
   else {
    toast.success(`${currentBook.bookName} is added to your wishlist!`);
    setWishlist([...wishlist, currentBook]);
   }
  }

  const handleRemoveFromRead = (bookId) => {
    const normalizedId = normalizeBookId(bookId);
    const removedBook = storedBooks.find(book => normalizeBookId(book) === normalizedId);

    if (!removedBook) {
      return;
    }

    setStoredBooks(storedBooks.filter(book => normalizeBookId(book) !== normalizedId));
    showUndoToast(`${removedBook.bookName} removed from read list.`, () => {
      setStoredBooks((prev) => [...prev, removedBook]);
    });
  }

  const handleRemoveFromWishlist = (bookId) => {
    const normalizedId = normalizeBookId(bookId);
    const removedBook = wishlist.find(book => normalizeBookId(book) === normalizedId);

    if (!removedBook) {
      return;
    }

    setWishlist(wishlist.filter(book => normalizeBookId(book) !== normalizedId));
    showUndoToast(`${removedBook.bookName} removed from wishlist.`, () => {
      setWishlist((prev) => [...prev, removedBook]);
    });
  }

  const data = {
    storedBooks,
    setStoredBooks,
    handleMarkAsRead,
    wishlist,
    setWishlist,
    handleWishlist,
    handleRemoveFromRead,
    handleRemoveFromWishlist
  }

    return (
        <BookContext.Provider value={data}>
            {children}
        </BookContext.Provider>
    );
};

export default ContextProvider;
