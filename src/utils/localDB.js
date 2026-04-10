const READ_LIST_KEY = 'readList';
const WISHLIST_KEY = 'wishlist';

const parseLocalStorageList = (key) => {
  try {
    const rawValue = localStorage.getItem(key);
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const getAllReadListFromLocalDB = () => parseLocalStorageList(READ_LIST_KEY);

const saveAllReadListToLocalDB = (books) => {
  localStorage.setItem(READ_LIST_KEY, JSON.stringify(books));
};

const addReadListToLocalDB = (book) => {
  const allAddedReadList = getAllReadListFromLocalDB();
  const isAlreadyAdded = allAddedReadList.find((b) => Number(b.bookId) === Number(book.bookId));

  if (!isAlreadyAdded) {
    allAddedReadList.push(book);
    saveAllReadListToLocalDB(allAddedReadList);
  }
};

const getAllWishlistFromLocalDB = () => parseLocalStorageList(WISHLIST_KEY);

const saveAllWishlistToLocalDB = (books) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(books));
};

export {
  getAllReadListFromLocalDB,
  saveAllReadListToLocalDB,
  addReadListToLocalDB,
  getAllWishlistFromLocalDB,
  saveAllWishlistToLocalDB,
};
