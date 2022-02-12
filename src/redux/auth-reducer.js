import {authApi, profileApi, securityApi} from '../api/api';
import {createSlice, createSelector} from "@reduxjs/toolkit";


const initialState = {
  user: {
    id: null,
    login: null,
    email: null,
    img: null,
  },
  isAuth: false,
  isLoading: true,
  errors: '',
  captchaUrl: '',
};


const authSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setImg: (state, action) => {
      state.user.img = action.payload
    },
    setErrors: (state, action) => {
      state.errros = action.payload
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setCaptchaUrl: (state, action) => {
      state.captchaUrl = action.payload
    },
  }
})

const {setUserData,setImg,setCaptchaUrl,setErrors,setIsAuth,setLoading} = authSlice.actions


export const setSignIn = (loginData) => (dispatch) => {
  dispatch(setLoading(true));
  authApi
    .getSignIn(loginData)
    .then((data) => {
      if (data.resultCode === 10) {
        return securityApi.getCaptcha().then((captcha) => {
          if (!captcha.resultCode) {
            console.log(data.messages);
            dispatch(setCaptchaUrl(captcha.url));
            dispatch(setErrors(data.messages.toString()));
            dispatch(setLoading(false));
          }
        });
      }

      if (data.resultCode === 0) {
        dispatch(getLogin(data.data.userId));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.log(data.messages);
        dispatch(setErrors(data.messages.toString()));
      }
    })
    .catch((err) => {
      dispatch(setLoading(false));
    });
};

export const setLogOut = () => (dispatch) => {
  dispatch(setLoading(true));
  authApi.getLogOut().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setIsAuth(false));
      dispatch(setErrors(''));
      dispatch(setCaptchaUrl(''));
      dispatch(setLoading(false));
    }
  });
};

export let getLogin = (id) => (dispatch) => {
  dispatch(setLoading(true));
  authApi
    .getAuthMe()
    .then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserData(data.data));
        dispatch(setIsAuth(true));
        dispatch(setLoading(false));
      }
    })
    .then(() => profileApi.getProfile(id).then((data) => {
      dispatch(setImg(data.photos.small));
    }))
    .catch((err) => {
      dispatch(setLoading(false));
    });
};

export default authSlice.reducer;
