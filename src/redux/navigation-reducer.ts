import {Action, createSlice, ThunkAction} from '@reduxjs/toolkit';
import { setUserProfile } from './profile-reducer';
import { profileApi } from '../api/api';
import {FriendType} from "../types/types";
import {RootState} from "./redux-store";


const initialState = {
  friends: [{ name: 'Andrew' }, { name: 'Sasha' }, { name: 'Sveta' }] as Array<FriendType>,
  isActive: false as boolean,
  isLoading: false as boolean,
};

const navigationSlice = createSlice({
  name: 'navigationSlice',
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { isLoading, setActive } = navigationSlice.actions;

export const myProfile = (userId: number):
    ThunkAction<Promise<void>, RootState, unknown, Action>=> async (dispatch) => {
  try {
    dispatch(isLoading(true));
    const data = await profileApi.getProfile(userId)
    dispatch(setUserProfile(data));
    dispatch(isLoading(false));
  }
  catch (e) {}
};

export default navigationSlice.reducer;
