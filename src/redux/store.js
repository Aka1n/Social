import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navigationReducer from "./navigation-reducer";

let store = {
    _state : {
        profilePage : {
            posts : [],
            newPostChange : ''
        },
        dialogsPage : {
            dialogs : [
                {id: 1, name: 'Erik'},
                {id: 2, name: 'Art'},
                {id: 3, name: 'Kostiya'},
                {id: 4, name: 'Dim'}
            ],
            messages : [],
            newMessageText : ''
        },
        navigation : {
            friends : [
                {name : 'Andrew'},
                {name : 'Sasha'},
                {name : 'Sveta'}
            ]
        }
    },
    _render(){},

    getState(){
        return this._state
    },
    subscribe(observer) {
        this._render = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.navigation = navigationReducer(this._state.navigation, action)
        this._render()
    }
}

window.store = store

export default store