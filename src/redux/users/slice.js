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
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
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
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        // state.noticesFavorites = action.payload.noticesFavorites;
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
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          avatar: action.payload.avatar,
        };
        state.noticesFavorites = action.payload.noticesFavorites;
        state.favorites = action.payload.noticesFavorites.map(item => item._id);
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
        state.isLoading = false;

        // state.pets.push(...action.payload.pets);
        state.pets = action.payload.pets;
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
        state.isLoading = false;
        // state.pets = state.pets.filter(pet => pet._id !== action.meta.arg);
        state.pets = action.payload.pets;
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
      // Add to Favorites
      .addCase(addToFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload._id);

        state.favorites = action.payload;
        console.log(action.payload);
        // state.noticesFavorites.push(action.payload); // Добавление объекта
        state.loading = false;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Favorites
      .addCase(removeFromFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
  
        state.favorites = action.payload;
        console.log(action.payload);
        // state.favorites = state.favorites.filter(
        //   id => id !== action.payload._id
        // );

        state.noticesFavorites = state.noticesFavorites.filter(
          item => action.payload.includes(item._id)
        );
        state.loading = false;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
