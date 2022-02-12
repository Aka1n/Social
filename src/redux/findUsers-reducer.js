import { followApi, usersApi } from '../api/api';

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';
const SET_USERS = 'SER_USERS';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
const IS_LOADING = 'IS_LOADING';
const IS_FOLLOW_LOADING = 'IS_FOLLOW_LOADING';

const interfaceState = {
  users: [],
  currentPage: 0,
  pageNumber: 1,
  totalPages: 0,
  isLoading: false,
  userFollowLoading: [],

};

function findUsersReducer(state = interfaceState, action) {
  switch (action.type) {
    case FOLLOW:
      return { ...state, users: state.users.map((u) => ((u.id === action.id) ? { ...u, followed: true } : u)) };
    case UN_FOLLOW:
      return { ...state, users: state.users.map((u) => ((u.id === action.id) ? { ...u, followed: false } : u)) };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.pages };
    case SET_PAGE_NUMBER:
      return { ...state, pageNumber: action.page };
    case IS_LOADING:
      return { ...state, isLoading: action.loading };
    case IS_FOLLOW_LOADING:
      return {
        ...state,
        userFollowLoading: action.loading ? [...state.userFollowLoading, action.id]
          : state.userFollowLoading.filter((userId) => userId !== action.id),
      };
    default:
      return state;
  }
}

export const follow = (userId) => ({ type: FOLLOW, id: userId });
export const unFollow = (userId) => ({ type: UN_FOLLOW, id: userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setTotalPages = (pages) => ({ type: SET_TOTAL_PAGES, pages });
export const setPageNumber = (page) => ({ type: SET_PAGE_NUMBER, page });
export const isLoading = (loading) => ({ type: IS_LOADING, loading });
export const toggleUserFollowLoading = (loading, id) => ({ type: IS_FOLLOW_LOADING, loading, id });

export const getUsers = (users, pageNumber) => (dispatch) => {
  dispatch(isLoading(true));
  if (users === 0) {
    usersApi.getUsers(pageNumber).then((data) => {
      dispatch(setUsers(data.items));
    });
  }
  usersApi.getUsers().then((data) => {
    dispatch(setTotalPages(Math.ceil(data.totalCount / 12)));
  }).then((resolve) => dispatch(isLoading(false)));
};
export const getFollowThunk = (userId) => (dispatch) => {
  dispatch(toggleUserFollowLoading(true, userId));
  followApi.getFollow(userId).then((data) => {
    if (data.resultCode === 0) {
      dispatch(follow(userId));
    }
  }).finally(() => dispatch(toggleUserFollowLoading(false, userId)));
};
export const getUnFollowThunk = (userId) => (dispatch) => {
  dispatch(toggleUserFollowLoading(true, userId));
  followApi.getUnFollow(userId).then((data) => {
    if (data.resultCode === 0) {
      dispatch(unFollow(userId));
    }
  }).finally(() => dispatch(toggleUserFollowLoading(false, userId)));
};
export const setPage = (page) => (dispatch) => {
  dispatch(isLoading(true));
  dispatch(setPageNumber(page));
  usersApi.getUsers(page).then((data) => dispatch(setUsers(data.items)))
    .then((resolve) => dispatch(isLoading(false)));
};
export default findUsersReducer;
