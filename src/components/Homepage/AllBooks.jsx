import React, { use } from 'react';
import BookCard from '../ui/BookCard';

const booksPromise = fetch('/booksData.json').then(res => res.json());

const AllBooks = () => {

const books = use(booksPromise);

console.log(books);

    return (
        <BookCard books={books} />
    );
};

export default AllBooks;