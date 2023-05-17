import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {}
});

const {actions, reducer} = postsSlice;

export default reducer;
export const {} = actions;