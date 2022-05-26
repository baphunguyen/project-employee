import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "./Redux/messageSlice";
import homeReducer from './Redux/homeSlice'

const rootReducer = {
  message: messageReducer,
  home: homeReducer
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;