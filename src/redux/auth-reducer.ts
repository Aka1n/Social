import {Action, createSlice, Dispatch, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import { authApi, profileApi, securityApi } from '../api/api';
import { setMyProfile } from './settings-reducer';
import {RootState} from "./redux-store";

type initialState = {
  user: {
    id: number,
    login: string | null,
    email: string | null,
    img?: string | null,
  },
  isAuth: boolean,
  isLoading: boolean,
  authErrors: string,
  captchaUrl: string,
}

const initialState: initialState = {
  user: {
    id: 0,
    login: null,
    email: null,
    img: null,
  },
  isAuth: false,
  isLoading: false,
  authErrors: '',
  captchaUrl: '',
};

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{
      id: number | 0,
      login: string | null,
      email: string | null,
      img?: string | null,}>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.user.img = action.payload;
    },
    setErrors: (state, action: PayloadAction<string>) => {
      state.authErrors = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setCaptchaUrl: (state, action: PayloadAction<string>) => {
      state.captchaUrl = action.payload;
    },
  },
});

export const {
  setUserData, setImg, setCaptchaUrl, setErrors, setIsAuth, setLoading,
} = authSlice.actions;

export const getLogin = (id: number):
    ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
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
  captcha: string | null,
}): ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
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

export const setLogOut = ():
    ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  dispatch(setLoading(true));
  const data = await authApi.getLogOut();
  if (data.resultCode === 0) {
    dispatch(setIsAuth(false));
    dispatch(setUserData({
      id: 0,
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
