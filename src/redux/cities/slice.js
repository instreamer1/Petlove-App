import { createSlice } from '@reduxjs/toolkit';
import { fetchCitiesByKeyword, fetchCitiesWithLocations } from './operations';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    citiesList: [],
    locationsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCitiesByKeyword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.citiesList = action.payload;
      })
      .addCase(fetchCitiesByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCitiesWithLocations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesWithLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locationsList = action.payload;
      })
      .addCase(fetchCitiesWithLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const citiesReducer = citiesSlice.reducer;
