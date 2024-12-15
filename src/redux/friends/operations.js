import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/friends');
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch friends');
    }
  }
);
