import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = apiUrl;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  'users/signup',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', newUser);

      setAuthHeader(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'users/signin',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signin', credentials);
      setAuthHeader(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('users/signout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/signout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const checkAuth = createAsyncThunk(
  'users/checkAuth',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('authToken');
    if (!token || token === 'undefined' || token === '') {
      return thunkAPI.rejectWithValue('Token is missing or invalid');
    }
    setAuthHeader(token);

    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem('authToken');
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Authorization failed'
      );
    }
  },

  {
    condition: (_, { getState }) => {
      const { users } = getState();
      if (users.token === null) {
        return false;
      }
    },
  }
);

export const getCurrentUserFullInfo = createAsyncThunk(
  'users/getCurrentUserFullInfo',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/users/current/full');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPet = createAsyncThunk(
  'pets/addPet',
  async (petData, thunkAPI) => {
    try {
      const response = await axios.post('/users/current/pets/add', petData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removePet = createAsyncThunk(
  'pets/removePet',
  async (petId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/users/current/pets/remove/${petId}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: 'Something went wrong!' });
      }
    }
  }
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async (editData, thunkAPI) => {
    try {
      const response = await axios.patch('/users/current/edit', editData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
