export const selectRecommendedBooks = (state) => state.books.recommended;
export const selectOwnBooks = (state) => state.books.ownBooks;
export const selectCurrentBook = (state) => state.books.currentBook;
export const selectBooksIsLoading = (state) => state.books.isLoading;
export const selectBooksError = (state) => state.books.error;
export const selectTotalPages = (state) => state.books.totalPages;
export const selectCurrentPage = (state) => state.books.page;