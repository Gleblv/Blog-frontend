import { configureStore } from '@reduxjs/toolkit';

import postsSlice from './slices/postsSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});

export default store;
