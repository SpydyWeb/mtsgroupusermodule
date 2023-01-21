// project imports
import config from 'config';
// action - state management
import * as actionTypes from '../action/actions';
import { constant } from 'store/constant';
export const initialState = {
    isOpen: [], // for active default menu
    opened: true,
    tabview: 'View',
    dialogueview: '',
    activeStep: 0
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            let id = [];
            id.push(action.id);
            return {
                ...state,
                isOpen: id
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case constant.SET_TAB_VIEW:
            return { ...state, tabview: action.value };
        case constant.SET_DIALOGUE_VIEW:
            return { ...state, dialogueview: action.value };
        case constant.SET_Active_Step_DATA:
            return { ...state, activeStep: action.value };
        default:
            return state;
    }
};

export default customizationReducer;
