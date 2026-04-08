import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router';

const BookCard = ({ books }) => {
  return (
    <div className="my-12 w-11/12 max-w-6xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-8">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link key={book.bookId} to={`/bookDetails/${book.bookId}`}>
            <div className="rounded-2xl border border-gray-300 bg-white p-4 transition hover:shadow-md">
              <figure className="rounded-2xl bg-[#f0f0f0] p-6 flex items-center justify-center min-h-70">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="h-55 w-auto object-contain"
                />
              </figure>
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-bold leading-tight text-gray-900">
                  {book.bookName}
                </h2>
                <p className="text-lg font-medium text-gray-700">By : {book.author}</p>
                <hr className="border-dashed border-gray-300" />
                <div className="flex items-center justify-between pt-2 text-base">
                  <span className="font-medium text-gray-700">{book.category}</span>
                  <span className="inline-flex items-center gap-2 font-medium text-gray-700">
                    {Number(book.rating).toFixed(2)}
                    <FaRegStar />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
  </div>
  );
};

export default BookCard;