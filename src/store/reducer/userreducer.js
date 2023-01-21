import { constant } from 'store/constant';

export const initialState = {
    RoleData: [],
    loader: true,
    AccessRoleData: [],
    UserData: []
};

export const UserRoleData = (state = initialState, action) => {
    let data = [];
    switch (action.type) {
        case constant.SET_ROLE_DATA:
            action.data.map((ele, indx) => {
                return data.push({
                    id: indx + 1,
                    name: ele.name,
                    description: ele.description
                });
            });
            return { ...state, RoleData: data, loader: false };
        case constant.SET_ACCESS_ROLE_DATA:
            action.data.map((ele, indx) => {
                return data.push({
                    id: indx + 1,
                    subrole: ele.subrole
                });
            });
            return { ...state, AccessRoleData: data, loader: false };
        case constant.SET_USER_DATA:
            action.data.map((ele, indx) => {
                return data.push({
                    id: indx + 1,
                    name: ele.name,
                    username: ele.username,
                    userType: ele.userType,
                    emailId: ele.emailId,
                    outEmail: ele.outEmail,
                    cellPhone: ele.cellPhone,
                    allowTextMsg: ele.allowTextMsg,
                    manager: ele.manager,
                    department: ele.department,
                    workEnd: ele.workEnd,
                    workStart: ele.workStart,
                    roles: ele.roles
                });
            });
            return { ...state, UserData: data, loader: false };
        default:
            return state;
    }
};
