export const normalizeBookId = (bookOrId) => {
  if (typeof bookOrId === 'object' && bookOrId !== null) {
    return Number(bookOrId.bookId);
  }

  return Number(bookOrId);
};

export const hasBookById = (books, bookOrId) => {
  const normalizedId = normalizeBookId(bookOrId);
  return books.some((book) => normalizeBookId(book) === normalizedId);
};

export const findBookById = (books, bookOrId) => {
  const normalizedId = normalizeBookId(bookOrId);
  return books.find((book) => normalizeBookId(book) === normalizedId);
};

export const removeBookById = (books, bookOrId) => {
  const normalizedId = normalizeBookId(bookOrId);
  const removedBook = findBookById(books, normalizedId);

  if (!removedBook) {
    return {
      nextBooks: books,
      removedBook: null,
    };
  }

  return {
    nextBooks: books.filter((book) => normalizeBookId(book) !== normalizedId),
    removedBook,
  };
};

export const restoreBookIfMissing = (books, book) => {
  if (!book || hasBookById(books, book)) {
    return books;
  }

  return [...books, book];
};

export const sortBooksByType = (books, sortingType) => {
  const sortedBooks = [...books];

  if (sortingType === 'rating') {
    return sortedBooks.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  }

  if (sortingType === 'pages') {
    return sortedBooks.sort((a, b) => Number(b.totalPages || 0) - Number(a.totalPages || 0));
  }

  if (sortingType === 'year') {
    return sortedBooks.sort((a, b) => Number(b.yearOfPublishing || 0) - Number(a.yearOfPublishing || 0));
  }

  return sortedBooks;
};

export const getSafeTags = (tags) => {
  return Array.isArray(tags) ? tags : [];
};
