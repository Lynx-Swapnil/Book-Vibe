import { useContext } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { BookContext } from '../../context/BookContext';

const BookDetails = () => {

    const { bookId:bookParamsId } = useParams();
    
    const books = useLoaderData();

    const { handleMarkAsRead } = useContext(BookContext);

    const expectedBook = books.find(book => book.bookId === Number(bookParamsId));

    if (!expectedBook) {
      return (
        <div className="w-11/12 max-w-6xl mx-auto my-12">
          <p className="text-xl font-semibold text-gray-700">Book not found.</p>
        </div>
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
    <section className="w-11/12 max-w-6xl mx-auto mt-2 mb-8">
      <div className="grid grid-cols-1 gap-8 rounded-2xl bg-white p-5 lg:grid-cols-2 lg:gap-10 lg:p-6">
        <figure className="flex items-center justify-center rounded-2xl bg-[#f2f2f2] p-8 lg:min-h-140">
          <img
            src={image}
            alt={bookName}
            className="h-90 w-auto object-contain lg:h-115"
          />
        </figure>

        <div className="space-y-5">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">{bookName}</h1>
          <p className="text-2xl font-semibold text-gray-600">By : {author}</p>

          <p className="border-y border-gray-200 py-3 text-xl text-gray-700">{category}</p>

          <div className="space-y-3">
            <p className="text-base leading-relaxed text-gray-600">
              <span className="font-bold text-gray-900">Review : </span>
              {review}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base font-bold text-gray-900">Tag</span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-y border-gray-200 py-4 text-base">
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-gray-500">Number of Pages:</span>
              <span className="font-bold text-gray-800">{totalPages}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-gray-500">Publisher:</span>
              <span className="font-bold text-gray-800">{publisher}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-gray-500">Year of Publishing:</span>
              <span className="font-bold text-gray-800">{yearOfPublishing}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="min-w-37.5 text-gray-500">Rating:</span>
              <span className="font-bold text-gray-800">{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <button onClick={() => handleMarkAsRead(expectedBook)} className="btn h-12 min-h-12 rounded-lg border border-gray-300 bg-white px-8 text-gray-800 hover:bg-gray-100">Mark as Read</button>
            <button className="btn h-12 min-h-12 rounded-lg border-0 bg-cyan-400 px-8 text-white hover:bg-cyan-500">Wishlist</button>
          </div>
        </div>
      </div>
    </section>
    );
};

export default BookDetails;