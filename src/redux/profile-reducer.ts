import {Action, createSlice, ThunkAction} from '@reduxjs/toolkit';
import { authApi, profileApi } from '../api/api';
import {MyErrorsType, PostType, ProfileType} from "../types/types";
import {RootState} from "./redux-store";


const initialState = {
  posts: [] as Array<PostType>,
  newPostChange: '' as string | '',
  profile: {
    photos: {},
    contacts: {},
  } as ProfileType,
  isLoading: false as boolean,
  status: '' as string,
  errors: {
    img: null,
    contacts: null,
  } as MyErrorsType,
};

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    addPost: (state) => {
      const obj = {} as PostType;

      if (state.posts.length === 0) {
        obj.id = 1;
      } else obj.id = state.posts[0].id + 1;

      if (state.newPostChange.length === 0) {
        return;
      }

      obj.text = state.newPostChange;
      obj.likes = 0;
      obj.liked = false;
      state.posts.unshift(obj);
      state.newPostChange = '';
    },
    addNewPostText: (state, action) => {
      state.newPostChange = action.payload;
    },
    addLike: (state, action) => {
      state.posts = state.posts.map((p: PostType) => ((!p.liked && p.id === action.payload)
        ? {
          ...p,
          liked: true,
          likes: p.likes + 1,
        }
        : p));
    },
    removeLike: (state, action) => {
      state.posts = state.posts.map((p: PostType) => ((p.liked && p.id === action.payload)
        ? {
          ...p,
          liked: false,
          likes: p.likes - 1,
        }
        : p));
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  addStatus,
  isLoading,
  setUserProfile,
  removeLike,
  addLike,
  addNewPostText,
  addPost,
} = profileSlice.actions;

export const myProfile = (match: string | undefined):
    ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  try {
    dispatch(isLoading(true));
    const data = await authApi.getAuthMe();
    if (data.resultCode === 0) {
      let userId: number;

      if (!match) userId = data.data.id;
      else userId = +match;

      const userData = await profileApi.getProfile(userId);
      dispatch(setUserProfile(userData));
    }
    dispatch(isLoading(false));
  } catch (e) {}
};

export const setStatus = (status: string):
    ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  try {
    const data = await profileApi.setStatus(status);
    if (data.resultCode === 0) {
      dispatch(addStatus(status));
    }
  } catch (e) {}
};

export const getStatus = (id: number):
    ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  try {
    const data = await profileApi.getStatus(id);
    dispatch(addStatus(data));
  }
  catch (e) {}
};

export default profileSlice.reducer;
