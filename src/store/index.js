import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer/reducer';
import createSagaMiddleware from '@redux-saga/core';
import saga from './saga/saga';
const sagamiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: reducer,
    middleware: () => [sagamiddleware, ...getDefaultMiddleware()]
});
sagamiddleware.run(saga);

export { store };
