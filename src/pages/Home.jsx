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

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? Array(5) : posts.items).map((item, i) =>
            isPostsLoading ? (
              <Post key={i} isLoading={true} />
            ) : (
              <Post
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
                isEditable
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
