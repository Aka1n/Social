import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import navigationReducer from './navigation-reducer';
import findUsersReducer from './findUsers-reducer';
import authReducer from './auth-reducer';
import settingsReducer from './settings-reducer';

const store = configureStore({
  reducer: {
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navigation: navigationReducer,
    findUsersPage: findUsersReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
