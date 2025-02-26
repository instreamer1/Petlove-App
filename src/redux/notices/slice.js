import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchNoticeById,
  fetchNotices,
  fetchSexOptions,
  fetchSpeciesOptions,
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
      // state.filters = action.payload;
      state.filters = { ...state.filters, ...action.payload };
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
       
        state.notices = action.payload.results;
        state.totalPages = action.payload.totalPages || 1;
        state.page = action.payload.page;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false
        state.error = null
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSexOptions.pending, state => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchSexOptions.fulfilled, (state, action) => {
        state.sexOptions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSexOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSpeciesOptions.pending, state => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchSpeciesOptions.fulfilled, (state, action) => {
        state.speciesOptions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpeciesOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchNoticeById.pending, state => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.currentNotice = action.payload;
        state.loading = false;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setNoticesFilters, setNoticesPage } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
