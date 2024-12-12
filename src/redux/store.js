import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/slice';
import { newsReducer } from './news/slice';


const store = configureStore({
  reducer: {
    users: usersReducer,
    news : newsReducer,
  },
});

export default store;
