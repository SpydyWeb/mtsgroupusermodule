import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { customerData } from './customerreducer';
import { VendorData } from './vendorreducer';
import { UserRoleData } from './userreducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    customerData,
    VendorData,
    UserRoleData
});

export default reducer;
