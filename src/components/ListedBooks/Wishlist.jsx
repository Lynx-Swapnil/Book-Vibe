import React, { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import ListedBookCard from './ListedBookCard';
import { sortBooksByType } from '../../utils/bookUtils';

const Wishlist = ({ sortingType }) => {
    const { wishlist } = useContext(BookContext);

    const sortedWishlist = sortBooksByType(wishlist, sortingType);

    return (
        <div className="mt-6 space-y-5">
            {sortedWishlist.length === 0 && (
                <p className="rounded-2xl border border-dashed border-[#f2dccb] bg-[#fffaf6] p-10 text-center text-lg font-medium text-[#7a5f4d]">
                    No books in wishlist yet.
                </p>
            )}
            {sortedWishlist.map((book) => (
                <ListedBookCard key={book.bookId} book={book} listType="wishlist" />
            ))}
        </div>
    );
};

export default Wishlist;