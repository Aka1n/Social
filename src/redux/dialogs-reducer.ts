import {
  Action,
  createAsyncThunk,
  createSlice, Dispatch, ThunkAction,

} from '@reduxjs/toolkit';
import { dialogApi } from '../api/api';
import {DialogType, MessageType} from "../types/types";
import {RootState} from "./redux-store";

const initialState = {
  dialogs: [] as Array<DialogType> | [],
  messages: [] as Array<MessageType> | [],
  newMessageText: '' as string | '',
  isLoading: true as boolean,
  userId: '' as number | '',
  error: {}
};

const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {
    addNewMessageText: (state, action) => {
      state.newMessageText = action.payload;
    },
    getAllDialogs: (state, action) => {
      state.dialogs = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action) => {
      if (state.newMessageText.length === 0) return;
      state.messages = [...state.messages, action.payload];
      state.newMessageText = '';
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {
  addNewMessageText, addNewMessage, getAllDialogs,
  isLoading, setMessages, setUserId,
} = dialogsSlice.actions;


export const getDialogs = ():
    ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  try {
    dispatch(isLoading(true));
    const data = await dialogApi.getDialogs();
    const mass: any = [];
    const dataFilter = data.filter((el: DialogType) => {
      const boolean = mass.some((num: number) => num === el.id);
      if (!boolean) {
        mass.push(el.id);
        return el;
      }
    });

    dispatch(getAllDialogs(dataFilter));
    dispatch(isLoading(false));
  } catch (e) {}
};

export const getMessages = (userId : number)
    : ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const data = await dialogApi.getMessages(userId);
    dispatch(setMessages(data.items));
    dispatch(isLoading(false));
  } catch (e) {}
};

export const setMessage = (userId: number, message: string)
    : ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  try {
    const data = await dialogApi.setNewMessage(userId, message);
    dispatch(addNewMessage(data.data.message));
  } catch (e) {}
};

export const addDialog = (userId: number)
    : ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
  try {
    const data = await dialogApi.setDialog(userId);
  } catch (e) {}
};

export default dialogsSlice.reducer;
