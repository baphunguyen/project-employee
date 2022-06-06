import * as actionTypes from './actions';

export const initialState = {
  data: [],
  isChange: false,
  isOpen: false,
  isShow: false,
  page: 1,
  dataUpdate: null,
  isLoading: false,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case actionTypes.SET_CHANGE:
      return {
        ...state,
        isChange: action.isChange,
      };
    case actionTypes.SET_SHOW:
      return {
        ...state,
        isShow: action.isShow,
      };
    case actionTypes.SET_OPEN:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case actionTypes.SET_CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case actionTypes.SET_DATA_UPDATE:
      return {
        ...state,
        dataUpdate: action.dataUpdate,
      }
    default:
      return state;
  }
};

export default tableReducer;
