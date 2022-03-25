import { createSlice } from '@reduxjs/toolkit';
import {dialogApi} from "../api/api";

const initialState = {
  dialogs: [],
  messages: [],
  newMessageText: '',
  isLoading: true,
  userId: '',
};

const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {
    addNewMessageText: (state, action) => {
      state.newMessageText = action.payload;
    },
    getAllDialogs: (state, action) => {
      state.dialogs = action.payload
    },
    isLoading: (state, action) => {
      state.isLoading = state.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addNewMessage: (state, action) => {
      if (state.newMessageText.length === 0) return
      else state.messages = [...state.messages, action.payload]
      state.newMessageText = ''
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  },

});

export const { addNewMessageText, addNewMessage, getAllDialogs, isLoading, setMessages, setUserId } = dialogsSlice.actions;

export const getDialogs = () => async (dispatch) => {
  try {
    dispatch(isLoading(true))
    const data = await dialogApi.getDialogs()
    let mass = []
    let dataFilter = data.filter(el => {
      let boolean = mass.some(num => num === el.id)
      if (!boolean) {
        mass.push(el.id)
        return el
      }
    })

    dispatch(getAllDialogs(dataFilter))
    dispatch(isLoading(false))
  }
  catch (e) {}
}

export const getMessages = (userId) => async (dispatch) => {
  try {
    const data = await dialogApi.getMessages(userId)
    dispatch(setMessages(data.items))
  }
  catch (e) {}
}

export const setMessage = (userId, message) => async (dispatch) => {
  try {
    const data = await dialogApi.setNewMessage(userId, message)
    console.log(data)
    dispatch(addNewMessage(data.data.message))
  }
  catch (e) {}
}

export const addDialog = (userId) => async (dispatch) => {
  try {
    const data = await dialogApi.setDialog(userId)
    console.log(data)
  }
  catch (e) {}
}


export default dialogsSlice.reducer;
