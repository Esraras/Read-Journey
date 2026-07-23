import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  refreshToken,
} from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user || { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken || null;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      // LOGIN
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user || { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken || null;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = null;
      })

      // REFRESH USER (/users/current)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      // REFRESH TOKEN
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
      });
  },
});

export default authSlice.reducer;