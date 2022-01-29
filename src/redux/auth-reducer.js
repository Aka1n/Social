import {authApi, profileApi} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_IMG = 'SET_IMG'

let interfaceState = {
    id : null,
    login: null,
    email : null,
    img : null,
    isAuth : false
}

function authReducer(state = interfaceState, action) {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data, isAuth : true}
        case SET_IMG :
            return {...state, img: action.img}
        default :
            return state
    }
}

export let setUserData = (id, login, email) => ({type : SET_USER_DATA, data : {id, login, email}})
export let setImg = (img) => ({type : SET_IMG, img : img})
export let getLogin = (id) => {
    return (dispatch) => {
        authApi.getAuthMe().then(data => {
            if (data.resultCode === 0 ) {
                dispatch(setUserData(data.data.id, data.data.login, data.data.email))
            }
        }).then(() => {
            profileApi.getProfile(id).then(data => {
                dispatch(setImg(data.photos.small))
            })
        })
    }
}

export default authReducer