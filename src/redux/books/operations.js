import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// GET @ /books/recommend
export const fetchRecommendedBooks = createAsyncThunk(
  'books/fetchRecommended',
  async (params, thunkAPI) => {
    try {
      // params: { title, author, page, limit }
      const res = await axios.get('/books/recommend', { params });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// GET @ /books/own
export const fetchOwnBooks = createAsyncThunk(
  'books/fetchOwn',
  async (status, thunkAPI) => {
    try {
      // status: "unread" | "in-progress" | "done" (opsiyonel)
      const res = await axios.get('/books/own', {
        params: status ? { status } : {},
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// GET @ /books/{id}
export const fetchBookById = createAsyncThunk(
  'books/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/books/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// POST @ /books/add (Yeni kitap ekle)
export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData, thunkAPI) => {
    try {
      // bookData: { title, author, totalPages }
      const res = await axios.post('/books/add', bookData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// POST @ /books/add/{id} (Önerilen kitaptan kendi kütüphanesine ekle)
export const addBookFromRecommended = createAsyncThunk(
  'books/addFromRecommended',
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(`/books/add/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// DELETE @ /books/remove/{id}
export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/books/remove/${id}`);
      return res.data; // Silinen kitabın ID'sini dönebilir
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// POST @ /books/reading/start
export const startReading = createAsyncThunk(
  'books/startReading',
  async (data, thunkAPI) => {
    try {
      // data: { id, page }
      const res = await axios.post('/books/reading/start', data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// POST @ /books/reading/finish
export const finishReading = createAsyncThunk(
  'books/finishReading',
  async (data, thunkAPI) => {
    try {
      // data: { id, page }
      const res = await axios.post('/books/reading/finish', data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// DELETE @ /books/reading
export const deleteReading = createAsyncThunk(
  'books/deleteReading',
  async (params, thunkAPI) => {
    try {
      // params: { bookId, readingId }
      const res = await axios.delete('/books/reading', { params });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);