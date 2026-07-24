import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRecommendedBooks,
  fetchOwnBooks,
  fetchBookById,
  addBook,
  addBookFromRecommended,
  deleteBook,
  startReading,
  finishReading,
  deleteReading,
} from './operations';

const initialState = {
  recommended: [],
  ownBooks: [],
  currentBook: null,
  totalPages: 1,
  page: 1,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearCurrentBook(state) {
      state.currentBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Recommended
      .addCase(fetchRecommendedBooks.pending, handlePending)
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommended = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchRecommendedBooks.rejected, handleRejected)

      // Fetch Own Books
      .addCase(fetchOwnBooks.pending, handlePending)
      .addCase(fetchOwnBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks = action.payload;
      })
      .addCase(fetchOwnBooks.rejected, handleRejected)

      // Fetch Book By ID
      .addCase(fetchBookById.pending, handlePending)
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, handleRejected)

      // Add Book
      .addCase(addBook.pending, handlePending)
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks.push(action.payload);
      })
      .addCase(addBook.rejected, handleRejected)

      // Add Book From Recommended
      .addCase(addBookFromRecommended.pending, handlePending)
      .addCase(addBookFromRecommended.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks.push(action.payload);
      })
      .addCase(addBookFromRecommended.rejected, handleRejected)

      // Delete Book
      .addCase(deleteBook.pending, handlePending)
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownBooks = state.ownBooks.filter(
          (book) => book._id !== action.payload.id
        );
      })
      .addCase(deleteBook.rejected, handleRejected)

      // Reading Operations (Start / Finish / Delete Session)
      .addCase(startReading.fulfilled, (state, action) => {
        state.currentBook = action.payload;
      })
      .addCase(finishReading.fulfilled, (state, action) => {
        state.currentBook = action.payload;
      })
      .addCase(deleteReading.fulfilled, (state, action) => {
        state.currentBook = action.payload;
      });
  },
});

export const { clearCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;