import {configureStore} from '@reduxjs/toolkit';
import { postsReduser } from './slice/posts';
import { authReducer } from './slice/auth';

const store = configureStore({
    reducer:{
        posts: postsReduser,
        auth: authReducer
    }
});

export default store;