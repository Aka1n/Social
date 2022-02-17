import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogs: [
    { id: 1, name: "Erik" },
    { id: 2, name: "Art" },
    { id: 3, name: "Kostiya" },
    { id: 4, name: "Dim" },
  ],
  messages: [],
  newMessageText: "",
};

const dialogsSlice = createSlice({
  name: "dialogsSlice",
  initialState,
  reducers: {
    addNewMessage: (state) => {
      const obj = {};

      if (state.messages.length === 0) {
        obj.id = 1;
      } else obj.id = state.messages[state.messages.length - 1].id + 1;

      if (state.newMessageText.length === 0) return;

      obj.message = state.newMessageText;
      state.messages.push(obj);
      state.newMessageText = "";
    },
    addNewMessageText: (state, action) => {
      state.newMessageText = action.payload;
    },
  },
});

export const { addNewMessageText, addNewMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer;
