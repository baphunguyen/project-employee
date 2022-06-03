import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import tableReducer from "./tableReducer";

const reducer = combineReducers({
    customization: customizationReducer,
    table: tableReducer
});

export default reducer;
