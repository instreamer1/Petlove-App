import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(apiUrl);

axios.defaults.baseURL = apiUrl;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    console.log(newUser);
    try {
      const response = await axios.post('/users/signup', newUser);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    console.log(credentials);
    try {
      const response = await axios.post('/users/signin', credentials);
      setAuthHeader(response.data.token);
      
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/signout'); 
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      setAuthHeader(auth.token);
      const response  = await axios.get('users/current');       
            if (response.data.token) {
              setAuthHeader(response.data.token);
            }
    
      return response.data;
    } catch (error) {
      clearAuthHeader();
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (auth.token === null) {
        return false;
      }
    },
  }
);