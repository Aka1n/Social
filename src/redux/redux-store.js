import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navigationReducer from "./navigation-reducer";
import findUsersReducer from "./findUsers-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navigation: navigationReducer,
    findUsersPage : findUsersReducer,
    auth : authReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store



export default store
