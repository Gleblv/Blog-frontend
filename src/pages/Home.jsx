import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../axios';

import { fetchPosts, fetchTags } from '../redux/slices/postsSlice';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const [filter, setFilter] = React.useState('default');

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  const selectArray = () => {
    console.log(posts.items.length);

    if (!posts.items.length) {
      return [];
    }

    const items = [...posts.items]

    switch(filter) {
      case 'default':
       return items.reverse();
      case 'popular':
        return items.sort((a, b) => b.viewsCount - a.viewsCount);
    }
  }

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={filter === 'default' ? 0 : 1} aria-label="basic tabs example">
        <Tab onClick={() => setFilter('default')} label="Новые" />
        <Tab onClick={() => setFilter('popular')} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? Array(5) : selectArray()).map((item, i) =>
            isPostsLoading ? (
              <Post key={i} isLoading={true} />
            ) : (
              <Post
                key={item._id}
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl}
                user={{
                  avatarUrl: item.user.avatarUrl,
                  fullName: item.user.fullName,
                }}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={150}
                tags={item.tags}
                isEditable={userData?._id === item.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
