import { useContext } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router';
import { BookContext } from '../../context/BookContext';
import { IoClose } from 'react-icons/io5';

const BookDetails = () => {

    const { bookId:bookParamsId } = useParams();
    
    const books = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const { handleMarkAsRead, handleWishlist, storedBooks, wishlist } = useContext(BookContext);

    const expectedBook = books.find(book => book.bookId === Number(bookParamsId));

    const isInReadList = storedBooks.some(book => book.bookId === Number(bookParamsId));
    const isInWishlist = wishlist.some(book => book.bookId === Number(bookParamsId));

    const isMarkAsReadDisabled = isInReadList;
    const isWishlistDisabled = isInWishlist || isInReadList;

    const handleClose = () => {
      const fallbackPath = '/';
      if (location.state?.from) {
        navigate(-1);
        return;
      }
      navigate(fallbackPath);
    };

    if (!expectedBook) {
      return (
        <section className="fixed inset-0 z-60 flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 text-center shadow-2xl">
            <p className="text-xl font-semibold text-gray-700">Book not found.</p>
            <button onClick={handleClose} className="btn mt-6 rounded-full border-0 bg-orange-500 px-6 text-white hover:bg-orange-600">Close</button>
          </div>
        </section>
      );
    }
    
const {
  bookName,
  author,
  category,
  review,
  image,
  totalPages,
  rating,
  tags,
  publisher,
  yearOfPublishing
} = expectedBook;

    return (
    <section className="fixed inset-0 z-60 overflow-y-auto bg-black/55 p-2 md:p-3">
      <div className="mx-auto mt-1 w-full max-w-4xl rounded-3xl border border-[#f2dccb] bg-white p-3 shadow-2xl lg:mt-4 lg:p-3.5">
        <div className="mb-1.5 flex justify-end">
          <button
            onClick={handleClose}
            aria-label="Close details"
            className="btn h-9 min-h-9 w-9 rounded-full border-0 bg-gray-100 p-0 text-gray-600 hover:bg-gray-200"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        <figure className="flex items-center justify-center p-1 lg:min-h-72">
          <img
            src={image}
            alt={bookName}
            className="h-auto w-full max-w-52 object-contain sm:max-w-56"
          />
        </figure>

        <div className="space-y-2.5">
          <h1 className="title-font text-2xl font-black leading-tight text-[#2f2118] lg:text-3xl">{bookName}</h1>
          <p className="text-base font-semibold text-[#6a4e3d]">By : {author}</p>

          <p className="inline-block rounded-full bg-orange-50 px-3 py-1.5 text-base font-semibold text-orange-700">{category}</p>

          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-[#5f4737]">
              <span className="font-bold text-[#2f2118]">Review : </span>
              {review}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-[#2f2118]">Tag</span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1 border-y border-[#f2dccb] py-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-[#8a6b58]">Number of Pages:</span>
              <span className="font-bold text-[#2f2118]">{totalPages}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-[#8a6b58]">Publisher:</span>
              <span className="font-bold text-[#2f2118]">{publisher}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-[#8a6b58]">Year of Publishing:</span>
              <span className="font-bold text-[#2f2118]">{yearOfPublishing}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-[#8a6b58]">Rating:</span>
              <span className="font-bold text-[#2f2118]">{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => handleMarkAsRead(expectedBook)}
              disabled={isMarkAsReadDisabled}
              className="btn h-9 min-h-9 rounded-full border border-orange-200 bg-white px-5 text-sm text-orange-700 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isInReadList ? 'Marked as Read' : 'Mark as Read'}
            </button>
            <button
              onClick={() => handleWishlist(expectedBook)}
              disabled={isWishlistDisabled}
              className="btn h-9 min-h-9 rounded-full border-0 bg-teal-600 px-5 text-sm text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isInWishlist ? 'Added to Wishlist' : isInReadList ? 'Already in Read List' : 'Wishlist'}
            </button>
          </div>

          {isInReadList && (
            <p className="text-sm font-medium text-green-600">
              This book is already in your read list.
            </p>
          )}

          {!isInReadList && isInWishlist && (
            <p className="text-sm font-medium text-cyan-600">
              This book is already in your wishlist.
            </p>
          )}
        </div>
      </div>
      </div>
    </section>
    );
};

export default BookDetails;