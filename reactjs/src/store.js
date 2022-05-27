import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "./Redux/messageSlice";
import homeReducer from './Redux/homeSlice'
import forgotPassword from './Redux/forgotPasswordSlice'

const rootReducer = {
  message: messageReducer,
  home: homeReducer,
  forgot: forgotPassword
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;