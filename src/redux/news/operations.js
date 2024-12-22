import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = apiUrl;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ keyword, page, limit }, thunkAPI) => {
    try {
      const response = await axios.get('/news', {
        params: { keyword, page, limit },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
