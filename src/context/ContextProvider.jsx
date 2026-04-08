import React, { useState } from 'react';
import { BookContext } from './BookContext';

const ContextProvider = ({ children }) => {
    const [storedBooks, setStoredBooks] = useState([]);

  const handleMarkAsRead = (currentBook) => {

   const isbookAlreadyMarked =  storedBooks.find(book => book.bookId === Number(currentBook.bookId));

   if(isbookAlreadyMarked) {
    alert('You have already marked this book as read.');
    return;
   }
   else {
    alert(`${currentBook.bookName} is added to your read list!`);
    setStoredBooks([...storedBooks, currentBook]);
   }
  }

  const data = {
    storedBooks,
    setStoredBooks,
    handleMarkAsRead
  }

    return (
        <BookContext.Provider value={data}>
            {children}
        </BookContext.Provider>
    );
};

export default ContextProvider;
