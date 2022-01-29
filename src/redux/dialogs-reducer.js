const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'
const NEW_MESSAGE_TEXT = 'NEW-MESSAGE-TEXT'

let interfaceState = {
    dialogs: [
        {id: 1, name: 'Erik'},
        {id: 2, name: 'Art'},
        {id: 3, name: 'Kostiya'},
        {id: 4, name: 'Dim'}
    ],
    messages: [],
    newMessageText: ''
}

function dialogsReducer(state = interfaceState, action) {

    let cloneState

    switch (action.type) {
        case ADD_NEW_MESSAGE : {
            cloneState = {
                ...state,
                messages: [...state.messages],
            }
            let obj = {}

            if (cloneState.messages.length === 0) {
                obj.id = 1
            } else obj.id = cloneState.messages[cloneState.messages.length - 1].id + 1
            if (cloneState.newMessageText.length === 0) {
                return cloneState
            } else obj.message = cloneState.newMessageText
            cloneState.messages.push(obj)
            cloneState.newMessageText = ''

            return cloneState
        }
        case NEW_MESSAGE_TEXT : {
            cloneState = {
                ...state,
                newMessageText : action.text
            }
            return cloneState
        }
        default :
            return state
    }
}

export let addNewMessageText = (text) => ({type: NEW_MESSAGE_TEXT, text: text})
export let addNewMessage = () => ({type: ADD_NEW_MESSAGE})

export default dialogsReducer;