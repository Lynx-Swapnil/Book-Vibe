import React, { useContext } from 'react';
import { BookContext } from '../../context/BookContext';

const Books = () => {
    const { storedBooks } = useContext(BookContext);
    
    return (
        <div>
            <h2>Listed Books</h2>
            <ul>
                {storedBooks.map((book) => (
                    <li key={book.bookId}>
                        <h3>{book.bookName}</h3>
                        <p>By: {book.author}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Books;