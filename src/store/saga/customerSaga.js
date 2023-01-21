import { takeEvery, put } from 'redux-saga/effects';
import { constant } from 'store/constant';
import { CustomerSearch } from 'servicesapi/Customerapi';

function* getcustomerdata(action) {
    let customer = [];
    yield CustomerSearch(action.value).then((res) => {
        if (res.status === 200) customer = res.data;
    });
    yield put({ type: constant.SET_CUSTOMER_DATA, data: customer });
}
function* customerSaga() {
    yield takeEvery(constant.GET_CUSTOMER_DATA, getcustomerdata);
}

export default customerSaga;
