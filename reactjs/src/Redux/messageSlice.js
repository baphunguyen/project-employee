import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    addMessage: (state, action) => action.payload,
  }
})

const {reducer, actions} = messageSlice;
export const {addMessage} = actions;
export default reducer;