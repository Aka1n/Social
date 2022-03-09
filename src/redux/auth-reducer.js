import { createSlice } from '@reduxjs/toolkit';
import { authApi, profileApi, securityApi } from '../api/api';

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
  name: 'AuthSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setImg: (state, action) => {
      state.user.img = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setCaptchaUrl: (state, action) => {
      state.captchaUrl = action.payload;
    },
  },
});

const {
  setUserData, setImg, setCaptchaUrl, setErrors, setIsAuth, setLoading,
} = authSlice.actions;

export const getLogin = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.getAuthMe();
    if (data.resultCode === 0) {
      dispatch(setUserData(data.data));
      dispatch(setIsAuth(true));
    }
    const profileData = await profileApi.getProfile(id);
    dispatch(setImg(profileData.photos.small));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const setSignIn = (loginData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.getSignIn(loginData);
    if (data.resultCode === 10) {
      const captcha = await securityApi.getCaptcha();
      if (!captcha.resultCode) {
        dispatch(setCaptchaUrl(captcha.url));
        dispatch(setErrors(data.messages.toString()));
        dispatch(setLoading(false));
      }
    }
    if (data.resultCode === 0) {
      await dispatch(getLogin(data.data.userId));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      dispatch(setErrors(data.messages.toString()));
    }
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const setLogOut = () => async (dispatch) => {
  dispatch(setLoading(true));
  const data = await authApi.getLogOut();
  if (data.resultCode === 0) {
    dispatch(setIsAuth(false));
    dispatch(setErrors(''));
    dispatch(setCaptchaUrl(''));
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
