import { configureStore } from '@reduxjs/toolkit';

import postsSlice from './slices/postsSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    auth: authSlice,
  },
});

export default store;
