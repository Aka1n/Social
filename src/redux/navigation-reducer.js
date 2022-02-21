import { createSlice } from '@reduxjs/toolkit';
import { setUserProfile } from './profile-reducer';
import { profileApi } from '../api/api';

const initialState = {
  friends: [{ name: 'Andrew' }, { name: 'Sasha' }, { name: 'Sveta' }],
  isLoading: false,
};

const navigationSlice = createSlice({
  name: 'navigationSlice',
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { isLoading } = navigationSlice.actions;

export const myProfile = (userId) => (dispatch) => {
  dispatch(isLoading(true));
  profileApi.getProfile(userId).then((data) => {
    dispatch(setUserProfile(data));
    dispatch(isLoading(false));
  });
};

export default navigationSlice.reducer;
