import React from 'react';
import{ useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchTags, fetchPostsPopulate, fetchComments } from '../redux/slice/posts';

export const Populate = () => {
  const isPopulate = window.location.pathname == '/populate';

  const dispatch = useDispatch();
  const { posts, tags, comments} = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLading = posts.status =='loading';
  const isTagsLading = tags.status =='loading';
  
  React.useEffect(() =>{

  dispatch(fetchPostsPopulate());
  dispatch(fetchComments())
  dispatch(fetchTags());
  },[]);
 
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={isPopulate ? 1 : 0} aria-label="basic tabs example">
       <Link style={{textDecoration: "none"}} to='/'><Tab label="Новые" /></Link>
       <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLading ? [...Array(5)]: posts.items).map((obj, index) => isPostsLading ? (
          <Post key={index} isLoading={true} />
          ): (
          <Post
            id={obj._id}
            title={obj.title}
            imageUrl= {obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
            user={obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={obj.comments.length}
            tags={obj.tags}
            
            isEditable = {userData?._id == obj.user._id}
          />)
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLading} />
          <CommentsBlock
            items={
             comments.items
            }
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
