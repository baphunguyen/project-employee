import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "@redux/messageSlice";
import homeReducer from '@redux/homeSlice'
import forgotPassword from '@redux/forgotPasswordSlice'

const rootReducer = {
  message: messageReducer,
  home: homeReducer,
  forgot: forgotPassword
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;