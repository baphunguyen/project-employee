import {createSlice} from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
  name: 'forgotpassword',
  initialState: {
    message: '',
    success: false
  },
  reducers: {
    addMessage: (state, action) => {
      return {
        ...state,
        message: action.payload
      }
    },
    isSuccess: (state, action) => {
      return {
        ...state,
        success: action.payload
      }
    }
  }
})

const {reducer, actions} = forgotPasswordSlice;
export const {addMessage, isSuccess} = actions;
export default reducer;