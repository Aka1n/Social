import {authApi, profileApi} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_DATA_LOADING = 'SET_USER_DATA_LOADING'
const SET_IMG = 'SET_IMG'

let interfaceState = {
    id : null,
    login: null,
    email : null,
    img : null,
    isAuth : false,
    isLoading: true
}

function authReducer(state = interfaceState, action) {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data, isAuth : true}
        case SET_USER_DATA_LOADING:
            return {...state, isLoading: action.payload}
        case SET_IMG :
            return {...state, img: action.img}
        default :
            return state
    }
}

export let setUserData = (id, login, email) => ({type : SET_USER_DATA, data : {id, login, email}})

export let setImg = img => ({type : SET_IMG, img : img})

export const setLoading = loading => ({type: SET_USER_DATA_LOADING, payload: loading})

export let getLogin = id => dispatch => {
        dispatch(setLoading(true))
        authApi.getAuthMe().then(data => {
            if (data.resultCode === 0 ) {
                dispatch(setUserData(data.data.id, data.data.login, data.data.email))
                dispatch(setLoading(false))
            }
        }).then(() => {
            return profileApi.getProfile(id).then(data => {
                dispatch(setImg(data.photos.small))
            })
        }).catch(err => {
            dispatch(setLoading(false))
        })
    }

export default authReducer
