export const normalizeBookId = (bookOrId) => {
  if (typeof bookOrId === 'object' && bookOrId !== null) {
    return Number(bookOrId.bookId);
  }

  return Number(bookOrId);
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
