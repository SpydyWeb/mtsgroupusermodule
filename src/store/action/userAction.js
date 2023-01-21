import { constant } from 'store/constant';

export const getroledata = () => {
    return { type: constant.GET_ROLE_DATA };
};
export const addroledata = (formdata) => {
    return { type: constant.ADD_ROLE_DATA, data: formdata };
};
export const deleteroledata = (id) => {
    return { type: constant.DELETE_ROLE_DATA, data: id };
};
export const getaccessroledata = () => {
    return { type: constant.GET_ACCESS_ROLE_DATA };
};
export const addaccessroledata = (formdata) => {
    return { type: constant.ADD_ACCESS_ROLE_DATA, data: formdata };
};
export const deleteaccessroledata = (id) => {
    return { type: constant.DELETE_ACCESS_ROLE_DATA, data: id };
};
export const getalluserdata = () => {
    return { type: constant.GET_USER_DATA };
};
