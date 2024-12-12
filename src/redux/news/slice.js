import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './operations';

const initialState = {
  news: [],
  searchQuery: '',
  currentPage: 1,
  page: null,
  totalPages: 0,
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.trim(); // Удаляем лишние пробелы
      state.currentPage = 1; // Сбрасываем на первую страницу
    },
    setPage: (state, action) => {
      if (action.payload > 0 && action.payload <= state.totalPages) {
        state.currentPage = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null; // Очищаем ошибку при новом запросе
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload.results ;
        state.totalPages = action.payload.totalPages || 0;
        state.page = action.payload.page;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Не удалось загрузить новости.';
      });
  },
});

export const { setSearchQuery, setPage } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;



