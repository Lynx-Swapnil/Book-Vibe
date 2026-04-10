import React, { useEffect, useState } from 'react';
import { BookContext } from './BookContext';
import { toast } from 'react-toastify';
import {
  findBookById,
  hasBookById,
  normalizeBookId,
  removeBookById,
  restoreBookIfMissing,
} from '../utils/bookUtils';
import {
  getAllReadListFromLocalDB,
  getAllWishlistFromLocalDB,
  saveAllReadListToLocalDB,
  saveAllWishlistToLocalDB,
} from '../utils/localDB';

const ContextProvider = ({ children }) => {
    const [storedBooks, setStoredBooks] = useState(() => getAllReadListFromLocalDB());
    const [wishlist, setWishlist] = useState(() => getAllWishlistFromLocalDB());

  useEffect(() => {
    saveAllReadListToLocalDB(storedBooks);
  }, [storedBooks]);

  useEffect(() => {
    saveAllWishlistToLocalDB(wishlist);
  }, [wishlist]);

  const showUndoToast = (message, onUndo) => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex w-full items-center gap-3">
          <span className="min-w-0 flex-1 text-sm">{message}</span>
          <button
            type="button"
            onClick={() => {
              onUndo();
              closeToast?.();
            }}
            aria-label="Undo last action"
            className="shrink-0 whitespace-nowrap rounded bg-white/90 px-2 py-1 text-xs font-bold text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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

   const isbookAlreadyMarked = hasBookById(storedBooks, normalizedId);

   if(isbookAlreadyMarked) {
    toast.error('You have already marked this book as read.');
    return;
   }
   else {
    const isInWishlist = hasBookById(wishlist, normalizedId);
    if (isInWishlist) {
      setWishlist((prev) => removeBookById(prev, normalizedId).nextBooks);
      toast.info(`${currentBook.bookName} removed from wishlist and moved to read list.`);
    }

    toast.success(`${currentBook.bookName} is added to your read list!`);
    setStoredBooks((prev) => restoreBookIfMissing(prev, currentBook));
   }
  }

  const handleWishlist = (currentBook) => {
  const normalizedId = normalizeBookId(currentBook);
   
  const isExistInMarkedAsReadlist = hasBookById(storedBooks, normalizedId);

  if(isExistInMarkedAsReadlist) {
    toast.error('You have already marked this book as read. You cannot add it to your wishlist.');
    return;
   }
   
  const isbookAlreadyInWishlist = hasBookById(wishlist, normalizedId);

   if(isbookAlreadyInWishlist) {
    toast.error('This book is already in your wishlist.');
    return;
   }
   else {
    toast.success(`${currentBook.bookName} is added to your wishlist!`);
    setWishlist((prev) => [...prev, currentBook]);
   }
  }

  const handleRemoveFromRead = (bookId) => {
    const normalizedId = normalizeBookId(bookId);
    const removedBook = findBookById(storedBooks, normalizedId);

    if (!removedBook) {
      return;
    }

    setStoredBooks((prev) => removeBookById(prev, normalizedId).nextBooks);
    showUndoToast(`${removedBook.bookName} removed from read list.`, () => {
      setStoredBooks((prev) => restoreBookIfMissing(prev, removedBook));
    });
  }

  const handleRemoveFromWishlist = (bookId) => {
    const normalizedId = normalizeBookId(bookId);
    const removedBook = findBookById(wishlist, normalizedId);

    if (!removedBook) {
      return;
    }

    setWishlist((prev) => removeBookById(prev, normalizedId).nextBooks);
    showUndoToast(`${removedBook.bookName} removed from wishlist.`, () => {
      setWishlist((prev) => restoreBookIfMissing(prev, removedBook));
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
