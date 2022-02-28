import { createSlice } from '@reduxjs/toolkit';
import { followApi, usersApi } from '../api/api';

const initialState = {
  users: [],
  currentPage: 0,
  pageNumber: 1,
  totalPages: 0,
  isLoading: false,
  userFollowLoading: [],
  searchUsers: '',
};

const findUsersSlice = createSlice({
  name: 'findUsersSlice',
  initialState,
  reducers: {
    follow: (state, action) => {
      state.users = state.users.map((u) => (u.id === action.payload
        ? { ...u, followed: true } : u));
    },
    unFollow: (state, action) => {
      state.users = state.users.map((u) => (u.id === action.payload
        ? { ...u, followed: false } : u));
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
        : state.userFollowLoading.filter((userId) => userId !== id);
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
  },
});

export const {
  follow,
  unFollow,
  setUsers,
  setTotalPages,
  setPageNumber,
  isLoading,
  isFollowLoading,
  setSearchUsers,
} = findUsersSlice.actions;

export const getUsers = (users, pageNumber, searchUsers) => async (dispatch) => {
  dispatch(isLoading(true));
  const data = await usersApi.getUsers(pageNumber, searchUsers);
  await dispatch(setUsers(data.items));
  await dispatch(setTotalPages(Math.ceil(data.totalCount / 12)));
  await dispatch(isLoading(false));
};
export const getFollowThunk = (userId) => async (dispatch) => {
  try {
    dispatch(isFollowLoading({ loading: true, id: userId }));
    const data = await followApi.getFollow(userId);
    if (data.resultCode === 0) {
      dispatch(follow(userId));
    }
  } finally {
    dispatch(isFollowLoading({ loading: false, id: userId }));
  }
};
export const getUnFollowThunk = (userId) => async (dispatch) => {
  try {
    dispatch(isFollowLoading({ loading: true, id: userId }));
    const data = await followApi.getUnFollow(userId);
    if (data.resultCode === 0) {
      dispatch(unFollow(userId));
    }
  } finally {
    dispatch(isFollowLoading({ loading: false, id: userId }));
  }
};
export const setPage = (page, searchUsers) => async (dispatch) => {
  dispatch(isLoading(true));
  dispatch(setPageNumber(page));
  const data = await usersApi.getUsers(page, searchUsers);
  await dispatch(setUsers(data.items));
  await dispatch(isLoading(false));
};

export default findUsersSlice.reducer;
