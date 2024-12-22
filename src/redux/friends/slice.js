import { createSlice } from '@reduxjs/toolkit';
import { fetchFriends } from './operations';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFriends.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
