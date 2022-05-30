import {createSlice} from "@reduxjs/toolkit";

const home = createSlice({
  name: 'home',
  initialState: {
    data: [],
    isChange: false,
    isOpen: false,
    isShow: false,
    page: 1,
    dataUpdate: null
  },
  reducers: {
    setData: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    },
    Change: (state, action) => {
      return {
        ...state,
        isChange: action.payload
      }
    },
    Show: (state, action) => {
      return {
        ...state,
        isShow: action.payload
      }
    },
    Open: (state, action) => {
      return {
        ...state,
        isOpen: action.payload
      }
    },
    ChangePage: (state, action) => {
      return {
        ...state,
        page: action.payload
      }
    },
    setDataUpdate: (state, action) => {
      return {
        ...state,
        dataUpdate: action.payload
      }
    }
  }
})

const {reducer, actions} = home;
export const {Change, Show, Open, ChangePage, setData, setDataUpdate} = actions;
export default reducer;