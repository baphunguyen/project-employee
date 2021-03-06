import * as actionTypes from './actions';
import config from '../config/config';

export const initialState = {
    isOpen: 'dashboard', //for active default menu
    locale: config.i18n,
    rtlLayout: config.rtlLayout,
    navType: 'light',
};

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            return {
                ...state,
                isOpen: action.isOpen,
            };
        case actionTypes.THEME_LOCALE:
            return {
                ...state,
                locale: action.locale,
            };
        case actionTypes.THEME_RTL:
            return {
                ...state,
                rtlLayout: action.rtlLayout,
            };
        case actionTypes.NAV_TYPE:
            return {
                ...state,
                navType: action.navType,
            };
        default:
            return state;
    }
};

export default customizationReducer;
