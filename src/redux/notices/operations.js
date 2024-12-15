import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const handleAsyncThunkError = async (callback, thunkAPI) => {
  try {
    return await callback();
  } catch (error) {
 
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
};

export const fetchNotices = createAsyncThunk('notices/fetchNotices', async (params, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.get('/notices', { params });
    return data;
  }, thunkAPI);
});

export const fetchCategories = createAsyncThunk('notices/fetchCategories', async (_, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.get('/notices/categories');
    return data;
  }, thunkAPI);
});

export const fetchSexOptions = createAsyncThunk('notices/fetchSexOptions', async (_, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.get('/notices/sex');
    return data;
  }, thunkAPI);
});

export const fetchSpeciesOptions = createAsyncThunk('notices/fetchSpeciesOptions', async (_, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.get('/notices/species');
    return data;
  }, thunkAPI);
});

export const addToFavorites = createAsyncThunk('notices/addToFavorites', async (id, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.post(`/notices/favorites/add/${id}`);
    return data;
  }, thunkAPI);
});

export const removeFromFavorites = createAsyncThunk('notices/removeFromFavorites', async (id, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.delete(`/notices/favorites/remove/${id}`);
    return data;
  }, thunkAPI);
});

export const fetchNoticeById = createAsyncThunk('notices/fetchNoticeById', async (id, thunkAPI) => {
  return handleAsyncThunkError(async () => {
    const { data } = await axios.get(`/notices/${id}`);
    return data;
  }, thunkAPI);
});
