import React, { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import ListedBookCard from './ListedBookCard';
import { sortBooksByType } from '../../utils/bookUtils';

const MarkAsReadList = ({ sortingType }) => {
    const { storedBooks } = useContext(BookContext);

    const filterMarkedAsReadBooks = sortBooksByType(storedBooks, sortingType);

    return (
        <div className="mt-6 space-y-5">
            {filterMarkedAsReadBooks.length === 0 && (
                <p className="rounded-2xl border border-dashed border-[#f2dccb] bg-[#fffaf6] p-10 text-center text-lg font-medium text-[#7a5f4d]">
                    No books marked as read yet.
                </p>
            )}
            {filterMarkedAsReadBooks.map((book) => (
                <ListedBookCard key={book.bookId} book={book} listType="read" />
            ))}
        </div>
    );
};

export default MarkAsReadList;