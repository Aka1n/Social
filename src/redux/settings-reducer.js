import {createSlice} from "@reduxjs/toolkit";
import {profileApi} from "../api/api";


const initialState = {
    profile: {
        photos : {},
        contacts: {}
    },
    myErrors: {
        img: null,
        contacts: null
    },
    isLoading: false,
}

const settingsSlice = createSlice(
    {
        name : 'settingsPage',
        initialState,
        reducers: {
            setMyProfile: (state, action) => {
                state.profile = action.payload;
            },
            addMyInfo: (state, action) => {
                state.profile = {...state.profile, ...action.payload}
            },
            addMyPhoto: (state, action) => {
                state.profile.photos = action.payload
            },
            addMyImgErrors: (state, action) => {
                state.myErrors.img = action.payload
            },
            addMyInfoErrors: (state, action) => {
                state.myErrors.contacts = action.payload
            },
            setLoading: (state, action) => {
                state.isLoading = action.payload
            }
        }
    }
)

export const {setMyProfile, addMyInfo, addMyImgErrors, addMyInfoErrors, addMyPhoto, setLoading} = settingsSlice.actions


export const getMyProfile = (id) => async (dispatch) => {
    try {
        const data = await profileApi.getProfile(id);
        dispatch(setMyProfile(data))
    }
    catch (e) {}
}

export const setMyPhoto = (photo) => async (dispatch) => {
    try {
        const data = await profileApi.setPhoto(photo);
        if (data.resultCode === 0) {
            dispatch(addMyPhoto(data.data.photos));
        }
        if (data.resultCode === 1) {
            dispatch(addMyImgErrors(data.messages.toString()))
        }
    }
    catch (e) {}
};

export const setMyInfo = (info, id) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const data = await profileApi.setInfo(info)
        if (data.resultCode === 0) {
            dispatch(addMyInfo(data))
            await dispatch(getMyProfile(id))
            dispatch(setLoading(false))
        }
        if (data.resultCode === 1) {
            dispatch(addMyInfoErrors(data.messages))
            dispatch(setLoading(false))
        }
    } catch (e) {}
}

export default settingsSlice.reducer
