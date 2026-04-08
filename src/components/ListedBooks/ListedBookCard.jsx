import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { CiLocationOn } from 'react-icons/ci';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { BookContext } from '../../context/BookContext';
import { getSafeTags, normalizeBookId } from '../../utils/bookUtils';

const ListedBookCard = ({ book, listType }) => {
  const { handleRemoveFromRead, handleRemoveFromWishlist } = useContext(BookContext);
  const location = useLocation();

  const bookId = normalizeBookId(book);
  const bookName = book?.bookName || 'Untitled Book';
  const author = book?.author || 'Unknown Author';
  const tags = getSafeTags(book?.tags);
  const yearOfPublishing = book?.yearOfPublishing || 'N/A';
  const publisher = book?.publisher || 'Unknown Publisher';
  const totalPages = book?.totalPages || 'N/A';
  const category = book?.category || 'Uncategorized';
  const rating = Number(book?.rating || 0);
  const image = book?.image;

  const handleDelete = () => {
    const confirmMessage =
      listType === 'read'
        ? `Remove "${bookName}" from your read list?`
        : `Remove "${bookName}" from your wishlist?`;

    const isConfirmed = window.confirm(confirmMessage);
    if (!isConfirmed) {
      return;
    }

    if (listType === 'read') {
      handleRemoveFromRead(bookId);
      return;
    }
    handleRemoveFromWishlist(bookId);
  };

  return (
    <article className="relative rounded-3xl border border-[#f2dccb] bg-white p-5 shadow-[0_12px_28px_rgba(110,66,32,0.08)] md:p-6">
      <button
        onClick={handleDelete}
        aria-label={listType === 'read' ? 'Remove from read list' : 'Remove from wishlist'}
        title={listType === 'read' ? 'Remove from read list' : 'Remove from wishlist'}
        className="btn absolute right-4 top-4 h-9 min-h-9 w-9 rounded-full border-0 bg-red-500 p-0 text-white hover:bg-red-600"
      >
        <MdDeleteOutline className="text-xl" />
      </button>

      <div className="flex flex-col gap-6 md:flex-row">
        <figure className="flex w-full items-center justify-center rounded-2xl bg-[#fff5eb] p-6 md:w-52 md:shrink-0">
          <img src={image} alt={bookName} className="h-44 w-auto object-contain" />
        </figure>

        <div className="flex-1">
          <h3 className="title-font text-3xl font-black text-[#2f2118] md:text-4xl">{bookName}</h3>
          <p className="mt-2 text-xl font-medium text-[#684e3d] md:text-2xl">By : {author}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-lg font-semibold text-[#2f2118]">Tag</span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-orange-100 px-3 py-1 text-base font-semibold text-orange-700"
              >
                #{tag}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 text-lg text-[#725848]">
              <CiLocationOn className="text-2xl" />
              Year of Publishing: {yearOfPublishing}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-lg text-[#725848]">
            <span className="inline-flex items-center gap-2">
              <HiOutlineUsers className="text-2xl" />
              Publisher: {publisher}
            </span>
            <span className="inline-flex items-center gap-2">
              <IoDocumentTextOutline className="text-2xl" />
              Page {totalPages}
            </span>
          </div>

          <div className="mt-5 border-t border-[#f2dccb] pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-100 px-4 py-2 text-base font-medium text-teal-700">
                Category: {category}
              </span>
              <span className="rounded-full bg-orange-100 px-4 py-2 text-base font-medium text-orange-700">
                Rating: {Number(rating).toFixed(1)}
              </span>
              <Link
                to={`/bookDetails/${bookId}`}
                preventScrollReset
                state={{ from: `${location.pathname}${location.search}` }}
                className="btn h-11 min-h-11 rounded-full border-0 bg-orange-500 px-7 text-base text-white hover:bg-orange-600"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ListedBookCard;
