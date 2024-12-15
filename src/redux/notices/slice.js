import { createSlice } from '@reduxjs/toolkit';
import {
  addToFavorites,
  fetchCategories,
  fetchNoticeById,
  fetchNotices,
  fetchSexOptions,
  fetchSpeciesOptions,
  removeFromFavorites,
} from './operations';

const initialState = {
  notices: [],
  categories: [],
  sexOptions: [],
  speciesOptions: [],
  locations: [],
  searchQuery: '',
  currentNotice: null,
  favorites: [],
  currentPage: 1,
  page: null,
  totalPages: 0,
  loading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    setNoticesSearchQuery: (state, action) => {
      state.searchQuery = action.payload.trim(); // Удаляем лишние пробелы
      state.currentPage = 1; // Сбрасываем на первую страницу
    },
    setNoticesPage: (state, action) => {
      if (action.payload > 0 && action.payload <= state.totalPages) {
        state.currentPage = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotices.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.notices = action.payload.results;
        state.totalPages = action.payload.totalPages || 0;
        // state.page = action.payload.page;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCategories.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSexOptions.fulfilled, (state, action) => {
        state.sexOptions = action.payload;
      })
      .addCase(fetchSpeciesOptions.fulfilled, (state, action) => {
        state.speciesOptions = action.payload;
      })
      .addCase(addToFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(removeFromFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          fav => fav.id !== action.payload.id
        );
      })

      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.currentNotice = action.payload;
      });
  },
});

export const { setNoticesSearchQuery, setNoticesPage } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
