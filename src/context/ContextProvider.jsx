import React, { useState } from 'react';
import { BookContext } from './BookContext';
import { toast } from 'react-toastify';

const ContextProvider = ({ children }) => {
    const [storedBooks, setStoredBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);

  const handleMarkAsRead = (currentBook) => {

   const isbookAlreadyMarked =  storedBooks.find(book => book.bookId === Number(currentBook.bookId));

   if(isbookAlreadyMarked) {
    toast.error('You have already marked this book as read.');
    return;
   }
   else {
    toast.success(`${currentBook.bookName} is added to your read list!`);
    setStoredBooks([...storedBooks, currentBook]);
   }
  }

  const handleWishlist = (currentBook) => {
   
  const isExistInMarkedAsReadlist = storedBooks.find(book => book.bookId === Number(currentBook.bookId));

  if(isExistInMarkedAsReadlist) {
    toast.error('You have already marked this book as read. You cannot add it to your wishlist.');
    return;
   }
   
   const isbookAlreadyInWishlist = wishlist.find(book => book.bookId === Number(currentBook.bookId));

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
    setStoredBooks(storedBooks.filter(book => Number(book.bookId) !== Number(bookId)));
    toast.info('Book removed from read list.');
  }

  const handleRemoveFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(book => Number(book.bookId) !== Number(bookId)));
    toast.info('Book removed from wishlist.');
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
