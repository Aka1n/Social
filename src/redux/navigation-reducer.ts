import { createSlice } from '@reduxjs/toolkit';
import { setUserProfile } from './profile-reducer';
import { profileApi } from '../api/api';
import {FriendType} from "../types/types";


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

export const myProfile = (userId: number) => async (dispatch: any) => {
  try {
    dispatch(isLoading(true));
    const data = await profileApi.getProfile(userId)
    dispatch(setUserProfile(data));
    dispatch(isLoading(false));
  }
  catch (e) {}
};

export default navigationSlice.reducer;
