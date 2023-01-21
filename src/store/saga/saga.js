import { all, fork } from 'redux-saga/effects';
import customerSaga from './customerSaga';
import vendorSaga from './vendorSaga';
import userSaga from './userSaga';
export default function* saga() {
    yield all([customerSaga(), vendorSaga(), userSaga()]);
}
