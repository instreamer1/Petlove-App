import { createSlice } from '@reduxjs/toolkit';
import {
  addPet,
  addToFavorites,
  checkAuth,
  editUser,
  getCurrentUserFullInfo,
  logIn,
  logOut,
  register,
  removeFromFavorites,
  removePet,
} from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
  },
  token: localStorage.getItem('authToken') || null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  favorites: [],
  noticesFavorites: [],
  pets: [],
  noticesViewed: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { name, email, token } = action.payload;
        state.user = { ...state.user, name, email };
        state.token = token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        console.log('LogIn Successful:', action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null, phone: null, avatar: null };
        state.token = null;
        state.favorites = [];
        state.noticesFavorites = [];
        state.pets = [];
        state.noticesViewed = [];
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { name, email, token } = action.payload;
        state.user = { ...state.user, name, email };
        state.token = token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUserFullInfo.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserFullInfo.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          phone: action.payload.phone,
          avatar: action.payload.avatar,
        };
        state.favorites = action.payload.noticesFavorites.map(item => item._id);
        state.noticesFavorites = action.payload.noticesFavorites;
        state.pets = action.payload.pets;
        state.noticesViewed = action.payload.noticesViewed;
        state.isLoading = false;
      })
      .addCase(getCurrentUserFullInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addPet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.pets = action.payload.pets;
        state.isLoading = false;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removePet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.pets = action.payload.pets;
        state.isLoading = false;
      })
      .addCase(removePet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to remove pet';
      })
      .addCase(editUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          avatar: action.payload.avatar,
        };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(addToFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload._id);
        state.favorites = action.payload;

        state.isLoading = false;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.noticesFavorites = state.noticesFavorites.filter(item =>
          action.payload.includes(item._id)
        );
        state.isLoading = false;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
