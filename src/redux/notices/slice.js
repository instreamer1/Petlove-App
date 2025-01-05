import { createSlice } from '@reduxjs/toolkit';
import {
  // addToFavorites,
  fetchCategories,
  fetchNoticeById,
  fetchNotices,
  fetchSexOptions,
  fetchSpeciesOptions,
  // removeFromFavorites,
} from './operations';

const initialState = {
  notices: [],
  filters: {
    keyword: '',
    category: '',
    sex: '',
    species: '',
    byDate: true,
    byPrice: null,
    byPopularity: null,
  },
  categories: [],
  sexOptions: [],
  speciesOptions: [],
  currentNotice: null,
  // favorites: [],
  totalPages: 0,
  currentPage: 1,
  page: null,
  loading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    setNoticesFilters(state, action) {
      state.filters = action.payload;
      state.currentPage = 1;
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
        state.totalPages = action.payload.totalPages || 1;
        state.page = action.payload.page;
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
      // .addCase(addToFavorites.pending, state => {
      //   state.loading = true;
      //   state.error = null;
      // })

      // .addCase(addToFavorites.fulfilled, (state, action) => {
      //   state.favorites.push(action.payload);
      //   console.log(action.payload);
      // })
      // .addCase(addToFavorites.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })

      // .addCase(removeFromFavorites.pending, state => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(removeFromFavorites.fulfilled, (state, action) => {
      //   console.log(action.payload);

      //   // state.favorites = state.favorites.filter(
      //   //   fav => fav.id !== action.payload
      //   // );

      //   state.favorites.push(action.payload);
      // })

      // .addCase(removeFromFavorites.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.currentNotice = action.payload;
      });
  },
});

export const { setNoticesFilters, setNoticesPage } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
