import {createSlice, Dispatch} from '@reduxjs/toolkit';
import { authApi, profileApi, securityApi } from '../api/api';
import { setMyProfile } from './settings-reducer';

const initialState = {
  user: {
    id: 0 as number,
    login: null as string | null,
    email: null as string | null,
    img: null as string | null,
  },
  isAuth: false as boolean | true,
  isLoading: false as boolean,
  authErrors: '' as string,
  captchaUrl: '' as string,
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
      state.authErrors = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setCaptchaUrl: (state, action) => {
      state.captchaUrl = action.payload;
    },
  },
});

export const {
  setUserData, setImg, setCaptchaUrl, setErrors, setIsAuth, setLoading,
} = authSlice.actions;

export const getLogin = (id: number) => async (dispatch: Dispatch<any>) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.getAuthMe();
    if (data.resultCode === 0) {
      dispatch(setUserData(data.data));
      dispatch(setIsAuth(true));
    }
    const profileData = await profileApi.getProfile(id);
    dispatch(setImg(profileData.photos.small));
    dispatch(setMyProfile(profileData));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const setSignIn = (loginData: {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
}) => async (dispatch: Dispatch<any>) => {
  dispatch(setLoading(true));
  try {
    const data = await authApi.getSignIn(loginData);
    if (data.resultCode === 10) {
      const captcha = await securityApi.getCaptcha();
      if (captcha) {
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

export const setLogOut = () => async (dispatch: Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await authApi.getLogOut();
  if (data.resultCode === 0) {
    dispatch(setIsAuth(false));
    dispatch(setUserData({
      id: null,
      login: null,
      email: null,
      img: null,
    }));
    dispatch(setErrors(''));
    dispatch(setCaptchaUrl(''));
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
