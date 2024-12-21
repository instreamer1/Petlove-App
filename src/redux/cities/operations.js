import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCitiesByKeyword = createAsyncThunk(
  "cities/fetchCitiesByKeyword",
  async (keyword, { rejectWithValue }) => {
    console.log("keyword",keyword);
    try {
      const response = await axios.get('cities', {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCitiesWithLocations = createAsyncThunk(
  "cities/fetchCitiesWithLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('cities/locations');
      console.log("WithLocations", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
