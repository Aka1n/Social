import {authApi, profileApi, securityApi} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_DATA_LOADING = 'SET_USER_DATA_LOADING'
const SET_IMG = 'SET_IMG'
const SET_ERRORS = 'SET_ERRORS'
const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

let interfaceState = {
    id: null,
    login: null,
    email: null,
    img: null,
    isAuth: false,
    isLoading: true,
    errors : '',
    captchaUrl : ''
}

function authReducer(state = interfaceState, action) {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data}
        case SET_USER_DATA_LOADING:
            return {...state, isLoading: action.payload}
        case SET_IMG :
            return {...state, img: action.img}
        case SET_ERRORS :
            return {...state, errors: action.payload}
        case SET_IS_AUTH :
            return {...state, isAuth: action.payload}
        case SET_CAPTCHA_URL :
            return {...state, captchaUrl: action.url}
        default :
            return state
    }
}

export let setUserData = (id, login, email) => ({type: SET_USER_DATA, data: {id, login, email}})

export let setImg = img => ({type: SET_IMG, img: img})

export const setLoading = loading => ({type: SET_USER_DATA_LOADING, payload: loading})

export const setErrors = err => ({type: SET_ERRORS, payload: err})

export const setIsAuth = payload => ({type : SET_IS_AUTH, payload})

export const setCaptchaUrl = url => ({type: SET_CAPTCHA_URL, url})


export const setSignIn = loginData => dispatch => {
    dispatch(setLoading(true))
    authApi.getSignIn(loginData)
        .then( data => {
            if ( data.resultCode === 10) {
                return securityApi.getCaptcha().then( captcha => {
                    if (!captcha.resultCode) {
                        console.log(data.messages)
                        dispatch(setCaptchaUrl(captcha.url))
                        dispatch(setErrors(data.messages.toString()))
                        dispatch(setLoading(false))
                    }
                })
            }

            if (data.resultCode === 0) {
                dispatch(getLogin(data.data.userId))
                dispatch(setLoading(false))
            } else {
                dispatch(setLoading(false))
                console.log(data.messages)
                dispatch(setErrors(data.messages.toString()))
            }
        })
        .catch(err => {
        dispatch(setLoading(false))
    })
}

export const setLogOut = () => dispatch => {
    dispatch(setLoading(true))
    authApi.getLogOut().then(data => {
        if (data.resultCode === 0) {
            dispatch(setIsAuth(false))
            dispatch(setErrors(''))
            dispatch(setCaptchaUrl(''))
            dispatch(setLoading(false))
        }
    })
}

export let getLogin = id => dispatch => {
    dispatch(setLoading(true))
    authApi.getAuthMe().then(data => {
        if (data.resultCode === 0) {
            dispatch(setUserData(data.data.id, data.data.login, data.data.email))
            dispatch(setIsAuth(true))
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
