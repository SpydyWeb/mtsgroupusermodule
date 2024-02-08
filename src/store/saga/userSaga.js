import { takeEvery, put } from 'redux-saga/effects';
import { constant } from 'store/constant';
import toast from 'react-hot-toast';
import {
    GetRole,
    EditRole,
    CreateRole,
    Deleterole,
    GetsubRole,
    CreateSubRole,
    EditRoleDefination,
    DeleteroleDefunation
} from '../../servicesapi/Userroleapi';
import { GetAllUSer } from 'servicesapi/Userapi';

let data = [];
function* getroledata() {
    let state = [];
    yield GetRole().then((res) => {
        state = res;
    });
    yield put({ type: constant.SET_ROLE_DATA, data: state });
}
function* addroledata(formdata) {
    let res = '';
    if (formdata.data.editid === undefined || formdata.data.editid === '') {
        res = yield CreateRole(formdata.data.formData);
    } else {
        let data = {
            oldrole: formdata.data.editid.name,
            newName: formdata.data.formData.name,
            newDescription: formdata.data.formData.description
        };
        res = yield EditRole(data);
    }
    if (res.status === 200) {
        yield toast.success(
            `Role ${formdata.data.editid === undefined || formdata.data.editid === '' ? 'Created' : 'Updated'} Succsessfully`
        );
        yield put({ type: constant.SET_DIALOGUE_VIEW, value: '' });
        yield getroledata();
    } else {
        yield res.json().then((res) => toast.error(res));
    }
}
function* deleteroledata(formdata) {
    const res = yield Deleterole(formdata.data);
    if (res.status === 200) {
        yield toast.success('Role deleted Succsessfully');
        yield getroledata();
    } else {
        yield res.json().then((res) => toast.error('You can not delete this role because it is mapped with ' + res));
    }
}
function* getaccessroledata() {
    let state = [];
    yield GetsubRole().then((res) => {
        state = res;
    });
    yield put({ type: constant.SET_ACCESS_ROLE_DATA, data: state });
}
function* addaccessroledata(formdata) {
    let res = '';
    if (formdata.data.editid === undefined || formdata.data.editid === '') {
        res = yield CreateSubRole(formdata.data.formData);
    } else {
        let data = {
            oldname: formdata.data.editid.subrole,
            newName: formdata.data.formData.subrole
        };
        res = yield EditRoleDefination(data);
    }
    if (res.status === 200) {
        yield toast.success(
            `Access Control Role ${formdata.data.editid === undefined || formdata.data.editid === '' ? 'Created' : 'Updated'} Succsessfully`
        );
        yield put({ type: constant.SET_DIALOGUE_VIEW, value: '' });
        yield getaccessroledata();
    } else {
        yield res.json().then((res) => toast.error(res));
    }
}
function* deleteaccessroledata(formdata) {
    const res = yield DeleteroleDefunation(formdata.data);
    if (res.status === 200) {
        yield toast.success('Access Control deleted Succsessfully');
        yield getaccessroledata();
    } else {
        yield res.json().then((res) => toast.error(res));
    }
}
function* getuserdata() {
    let state = [];
    yield GetAllUSer().then((res) => {
        state = res;
    });
    yield put({ type: constant.SET_USER_DATA, data: state });
}
function* userSaga() {
    yield takeEvery(constant.GET_ROLE_DATA, getroledata);
    yield takeEvery(constant.ADD_ROLE_DATA, addroledata);
    yield takeEvery(constant.DELETE_ROLE_DATA, deleteroledata);
    yield takeEvery(constant.GET_ACCESS_ROLE_DATA, getaccessroledata);
    yield takeEvery(constant.ADD_ACCESS_ROLE_DATA, addaccessroledata);
    yield takeEvery(constant.DELETE_ACCESS_ROLE_DATA, deleteaccessroledata);
    yield takeEvery(constant.GET_USER_DATA, getuserdata);
}
export default userSaga;
