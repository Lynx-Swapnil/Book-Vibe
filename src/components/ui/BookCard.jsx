import React, { useContext, useMemo } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import { BookContext } from '../../context/BookContext';
import { getSafeTags, normalizeBookId } from '../../utils/bookUtils';

const BookCard = ({ books }) => {
  const { storedBooks, wishlist } = useContext(BookContext);
  const location = useLocation();

  const readBookIds = useMemo(
    () => new Set(storedBooks.map((book) => normalizeBookId(book))),
    [storedBooks],
  );

  const wishlistBookIds = useMemo(
    () => new Set(wishlist.map((book) => normalizeBookId(book))),
    [wishlist],
  );

  return (
    <div className="my-12 w-11/12 max-w-6xl mx-auto">
      <h2 className="title-font mb-8 text-center text-4xl font-black text-[#2f2118] md:text-5xl">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => {
          const safeBookId = normalizeBookId(book);
          const safeBookName = book?.bookName || 'Untitled Book';
          const safeAuthor = book?.author || 'Unknown Author';
          const safeCategory = book?.category || 'Uncategorized';
          const safeRating = Number(book?.rating || 0).toFixed(2);
          const safeTags = getSafeTags(book?.tags);
          const isRead = readBookIds.has(safeBookId);
          const isWishlisted = wishlistBookIds.has(safeBookId);

          return (
          <Link
            key={safeBookId || safeBookName}
            to={`/bookDetails/${safeBookId}`}
            preventScrollReset
            state={{ from: `${location.pathname}${location.search}` }}
          >
            <div className="relative rounded-3xl border border-[#f2dccb] bg-white p-4 shadow-[0_10px_25px_rgba(110,66,32,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(110,66,32,0.14)]">
              {isRead && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                  Marked as Read
                </span>
              )}
              {!isRead && isWishlisted && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm">
                  Added to Wishlist
                </span>
              )}

              <figure className="flex min-h-70 items-center justify-center rounded-2xl bg-[#fff5eb] p-6">
                <img
                  src={book.image}
                  alt={safeBookName}
                  className="h-55 w-auto object-contain"
                />
              </figure>
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {safeTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="title-font text-2xl font-black leading-tight text-[#2f2118] lg:text-3xl">
                  {safeBookName}
                </h2>
                <p className="text-lg font-medium text-[#674c3b]">By : {safeAuthor}</p>
                <hr className="border-dashed border-[#f2dccb]" />
                <div className="flex items-center justify-between pt-2 text-base">
                  <span className="rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-700">{safeCategory}</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-[#674c3b]">
                    {safeRating}
                    <FaRegStar />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )})}
      </div>
  </div>
  );
};

export default BookCard;