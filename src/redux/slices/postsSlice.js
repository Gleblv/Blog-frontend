import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');

  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');

  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.posts.status = 'loading';
      })
      .addCase(fetchTags.pending, (state, action) => {
        state.tags.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = [...state.posts.items, ...action.payload];
        state.posts.status = 'success';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = [...state.tags.items, ...action.payload];
        state.tags.status = 'success';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts.items = [];
        state.posts.status = 'error';

        console.log('posts fetch err');
        console.log(action.error);
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.tags.items = [];
        state.tags.status = 'error';

        console.log('tags fetch err');
        console.log(action.error);
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
