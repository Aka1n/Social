import {authApi, profileApi} from '../api/api';
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    posts: [],
    newPostChange: '',
    profile: null,
    isLoading: false,
    status: '',
};

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        addPost: state => {
            const obj = {}

            if (state.posts.length === 0) {
                obj.id = 1
            } else obj.id = state.posts[0].id + 1;

            if (state.newPostChange.length === 0) {
                return
            }

            obj.text = state.newPostChange;
            obj.likes = 0;
            obj.liked = false;
            state.posts.unshift(obj);
            state.newPostChange = '';

        },
        addNewPostText: (state, action) => {
            state.newPostChange = action.payload
        },
        addLike: (state, action) => {
            state.posts = state.posts.map( p => ((!p.liked && p.id === action.payload) ? {
                ...p,
                liked: true,
                likes: p.likes + 1,
            } : p))
        },
        removeLike: (state, action) => {
            state.posts = state.posts.map( p => ((p.liked && p.id === action.payload) ? {
                ...p,
                liked: false,
                likes: p.likes - 1,
            } : p))
        },
        setUserProfile: (state, action) => {
            state.profile = action.payload
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload
        },
        addStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const {addStatus, isLoading, setUserProfile, removeLike, addLike, addNewPostText, addPost} = profileSlice.actions


export const myProfile = match => dispatch => {
    dispatch(isLoading(true));
    authApi.getAuthMe().then(data => {
        if (data.resultCode === 0) {
            let userId = '';
            if (!match) userId = data.data.id;
            else userId = match.params.userId;
            profileApi.getProfile(userId).then(data => {
                dispatch(setUserProfile(data));
                dispatch(isLoading(false));
            });
        }
    });
};

export const setStatus = status => dispatch => profileApi.setStatus(status).then(data => {
    if (data.resultCode === 0) {
        dispatch(addStatus(status));
    }
});
export const getStatus = id => dispatch => profileApi.getStatus(id).then(data => {
    dispatch(addStatus(data));
});

export default profileSlice.reducer;
