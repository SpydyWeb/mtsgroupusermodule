// action - customization reducer
import { constant } from 'store/constant';
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
export const setActiveStep = (value) => {
    return { type: constant.SET_Active_Step_DATA, value: value };
};
export const getTabview = () => {
    return { type: constant.GET_TAB_VIEW };
};
// export const SET_TAB_VIEW = constant.SET_TAB_VIEW;
export const setTabview = (value) => {
    return { type: constant.SET_TAB_VIEW, value: value };
};
export const setDialogueview = (value) => {
    return { type: constant.SET_DIALOGUE_VIEW, value: value };
};
