import {authApi, profileApi} from "../api/api";

const ADD_POST = 'ADD-POST'
const ADD_NEW_POST_TEXT = 'ADD-NEW-POST-TEXT'
const ADD_LIKE = 'ADD-LIKE'
const REMOVE_LIKE = 'REMOVE_LIKE'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const IS_LOADING = 'IS_LOADING'
const GET_STATUS = 'GET_STATUS'

let interfaceState = {
    posts: [],
    newPostChange : '',
    profile : null,
    isLoading : false,
    status : ''
}

function profileReducer(state = interfaceState, action) {

    let cloneState

    switch (action.type) {
        case ADD_POST : {
            let obj = {}
            cloneState = {
                ...state,
                posts: [...state.posts]
            }
            if (cloneState.posts.length === 0) {
                obj.id = 1
            } else obj.id = cloneState.posts[0].id + 1
            console.log(state)

            if (cloneState.newPostChange.length === 0) {
                return state
            } else obj.text = cloneState.newPostChange

            obj.likes = 0
            obj.liked = false
            cloneState.posts.unshift(obj)
            cloneState.newPostChange = '';

            return cloneState
        }
        case ADD_NEW_POST_TEXT : {
            cloneState = {
                ...state
            }
            cloneState.newPostChange = action.text
            return cloneState
        }
        case ADD_LIKE :
            cloneState = {
                ...state, posts : state.posts.map(p => (!p.liked && p.id === action.id) ? {...p, liked: true, likes : p.likes + 1} : p)
            }
            return cloneState
        case REMOVE_LIKE :
            cloneState = {
                ...state, posts : state.posts.map(p => (p.liked && p.id === action.id) ? {...p, liked: false, likes : p.likes - 1} : p)
            }
            return cloneState
        case SET_USER_PROFILE :
            return {...state, profile : action.profile}
        case IS_LOADING :
            return {...state, isLoading: action.loading}
        case GET_STATUS : {
            return {...state, status: action.status}
        }
        default :
            return state
    }
}

export let addPostActionCreator = () => ({type: ADD_POST})
export let addNewPostText = (text) => ({type: ADD_NEW_POST_TEXT, text: text})
export let addLike = (id) => ({type : ADD_LIKE, id : id})
export let removeLike = (id) => ({type : REMOVE_LIKE, id : id})
export let setUserProfile = (profile) => ({type : SET_USER_PROFILE, profile : profile})
export let isLoading = (loading) => ({type : IS_LOADING, loading})
export let getStatus = (status) => ({type : GET_STATUS, status})
export let myProfile = (match) => {
    return (dispatch) => {
        dispatch(isLoading(true))
                authApi.getAuthMe().then(data => {
                    if (data.resultCode === 0 ) {
                        let userId
                        if  (!match) userId = data.data.id
                        else userId = match.params.userId
                        profileApi.getProfile(userId).then(data => {
                            dispatch(setUserProfile(data))
                            dispatch(isLoading(false))
                        })
                        profileApi.getStatus(userId).then(data => {
                            dispatch(getStatus(data))
                        })
                    }
                })

    }
}
export let setStatus = status => dispatch => {
    return profileApi.setStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(getStatus(status))
        }
    })
}

export default profileReducer;