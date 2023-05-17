import { configureStore } from "@reduxjs/toolkit";

import posts from './slices/postsSlice';

const store = configureStore({reducer: {
    posts
}});

export default store;