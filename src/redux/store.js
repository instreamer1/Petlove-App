import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/slice';
import { newsReducer } from './news/slice';
import { noticesReducer } from './notices/slice';
import { friendsReducer } from './friends/slice';


const store = configureStore({
  reducer: {
    users: usersReducer,
    news: newsReducer,
    notices: noticesReducer,
    friends: friendsReducer,
  },
});

export default store;
