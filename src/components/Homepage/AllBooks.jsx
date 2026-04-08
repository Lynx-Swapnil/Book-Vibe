import React, { use, useMemo, useState } from 'react';
import BookCard from '../ui/BookCard';

const booksPromise = fetch('/booksData.json').then(res => res.json());

const AllBooks = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const books = use(booksPromise);

    const categories = useMemo(() => {
        const categorySet = new Set(
            books
                .map((book) => book?.category)
                .filter(Boolean)
        );

        return ['all', ...categorySet];
    }, [books]);

    const filteredBooks = useMemo(() => {
        const normalizedSearch = searchText.trim().toLowerCase();

        return books.filter((book) => {
            const safeBookName = (book?.bookName || '').toLowerCase();
            const safeAuthor = (book?.author || '').toLowerCase();

            const matchesSearch =
                normalizedSearch.length === 0 ||
                safeBookName.includes(normalizedSearch) ||
                safeAuthor.includes(normalizedSearch);

            const matchesCategory = selectedCategory === 'all' || book?.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [books, searchText, selectedCategory]);

    return (
            <section className="w-11/12 max-w-6xl mx-auto">
                <div className="my-8 rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                            placeholder="Search by title or author"
                            className="input input-bordered w-full"
                        />

                        <select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            className="select select-bordered w-full"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => {
                                setSearchText('');
                                setSelectedCategory('all');
                            }}
                            className="btn border-0 bg-gray-800 text-white hover:bg-black"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                <BookCard books={filteredBooks} />
            </section>
    );
};

export default AllBooks;