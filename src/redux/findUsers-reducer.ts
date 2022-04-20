import { createSlice } from '@reduxjs/toolkit';
import { followApi, usersApi } from '../api/api';
import {UserType} from "../types/types";


const initialState = {
  users: [] as Array<UserType>,
  currentPage: 0 as number,
  pageNumber: 1 as number,
  totalPages: 0 as number,
  isLoading: false as boolean,
  userFollowLoading: [] as Array<number>,
  searchUsers: '' as string,
};

const findUsersSlice = createSlice({
  name: 'findUsersSlice',
  initialState,
  reducers: {
    followUnFollow: (state, action) => {
      const { userId, follow } = action.payload;
      state.users = state.users.map((u: UserType) => (u.id === userId
        ? { ...u, followed: !follow } : u));
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    isFollowLoading: (state, action) => {
      const { loading, id } = action.payload;
      state.userFollowLoading = loading
        ? [...state.userFollowLoading, id]
        : state.userFollowLoading.filter((userId: number) => userId !== id);
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
  },
});

export const {
  setUsers,
  setTotalPages,
  setPageNumber,
  isLoading,
  isFollowLoading,
  setSearchUsers,
  followUnFollow,
} = findUsersSlice.actions;

export const getUsers = (users: number, pageNumber: number, searchUsers: string) => async (dispatch: any) => {
  dispatch(isLoading(true));
  const data = await usersApi.getUsers(pageNumber, searchUsers);
  await dispatch(setUsers(data.items));
  await dispatch(setTotalPages(Math.ceil(data.totalCount / 12)));
  await dispatch(isLoading(false));
};
export const getFollowThunk = (userId: number, follow: boolean) => async (dispatch: any) => {
  try {
    dispatch(isFollowLoading({ loading: true, id: userId }));
    let data;
    if (!follow) data = await followApi.getFollow(userId);
    else data = await followApi.getUnFollow(userId);
    if (data.resultCode === 0) {
      dispatch(followUnFollow({ userId, follow }));
    }
  } finally {
    dispatch(isFollowLoading({ loading: false, id: userId }));
  }
};

export const setPage = (page: number, searchUsers: string) => async (dispatch: any) => {
  dispatch(isLoading(true));
  dispatch(setPageNumber(page));
  const data = await usersApi.getUsers(page, searchUsers);
  await dispatch(setUsers(data.items));
  await dispatch(isLoading(false));
};

export default findUsersSlice.reducer;
