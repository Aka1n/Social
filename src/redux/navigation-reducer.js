import {setUserProfile} from "./profile-reducer";
import {profileApi} from "../api/api";

const IS_LOADING = 'IS_LOADING'

let interfaceState = {
    friends: [
        {name: 'Andrew'},
        {name: 'Sasha'},
        {name: 'Sveta'}
    ],
    isLoading : false
}

function navigationReducer(state = interfaceState, action) {
    switch (action.type) {
        case IS_LOADING :
            return {...state, isLoading: action.loading}
        default : return state
    }
}

export let isLoading = (loading) => ({type: IS_LOADING, loading})
export let myProfile = (userId) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        profileApi.getProfile(userId).then(data => {
            dispatch(setUserProfile(data))
            dispatch(isLoading(false))
        })
    }
}

export default navigationReducer;