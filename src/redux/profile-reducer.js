import { authApi, profileApi } from '../api/api';

const ADD_POST = 'ADD-POST';
const ADD_NEW_POST_TEXT = 'ADD-NEW-POST-TEXT';
const ADD_LIKE = 'ADD-LIKE';
const REMOVE_LIKE = 'REMOVE_LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const IS_LOADING = 'IS_LOADING';
const GET_STATUS = 'GET_STATUS';

const interfaceState = {
  posts: [],
  newPostChange: '',
  profile: null,
  isLoading: false,
  status: '',
};

function profileReducer(state = interfaceState, action) {
  let cloneState;

  switch (action.type) {
    case ADD_POST: {
      const obj = {};
      cloneState = {
        ...state,
        posts: [...state.posts],
      };
      if (cloneState.posts.length === 0) {
        obj.id = 1;
      } else obj.id = cloneState.posts[0].id + 1;
      console.log(state);

      if (cloneState.newPostChange.length === 0) {
        return state;
      }
      obj.text = cloneState.newPostChange;

      obj.likes = 0;
      obj.liked = false;
      cloneState.posts.unshift(obj);
      cloneState.newPostChange = '';

      return cloneState;
    }
    case ADD_NEW_POST_TEXT: {
      cloneState = {
        ...state,
      };
      cloneState.newPostChange = action.text;
      return cloneState;
    }
    case ADD_LIKE:
      cloneState = {
        ...state,
        posts: state.posts.map((p) => ((!p.liked && p.id === action.id) ? {
          ...p,
          liked: true,
          likes: p.likes + 1,
        } : p)),
      };
      return cloneState;
    case REMOVE_LIKE:
      cloneState = {
        ...state,
        posts: state.posts.map((p) => ((p.liked && p.id === action.id) ? {
          ...p,
          liked: false,
          likes: p.likes - 1,
        } : p)),
      };
      return cloneState;
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case IS_LOADING:
      return { ...state, isLoading: action.loading };
    case GET_STATUS: {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const addNewPostText = (text) => ({ type: ADD_NEW_POST_TEXT, text });
export const addLike = (id) => ({ type: ADD_LIKE, id });
export const removeLike = (id) => ({ type: REMOVE_LIKE, id });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const isLoading = (loading) => ({ type: IS_LOADING, loading });
export const addStatus = (status) => ({ type: GET_STATUS, status });
export const myProfile = (match) => (dispatch) => {
  dispatch(isLoading(true));
  authApi.getAuthMe().then((data) => {
    if (data.resultCode === 0) {
      let userId = '';
      if (!match) userId = data.data.id;
      else userId = match.params.userId;
      profileApi.getProfile(userId).then((data) => {
        dispatch(setUserProfile(data));
        dispatch(isLoading(false));
      });
    }
  });
};

export const setStatus = (status) => (dispatch) => profileApi.setStatus(status).then((data) => {
  if (data.resultCode === 0) {
    dispatch(addStatus(status));
  }
});
export const getStatus = (id) => (dispatch) => profileApi.getStatus(id).then((data) => {
  dispatch(addStatus(data));
});

export default profileReducer;
