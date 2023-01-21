import { constant } from 'store/constant';
export const getVendordata = (searchValue) => {
    return { type: constant.GET_VENDOR_DATA, value: searchValue };
};
export const getLicencedata = () => {
    return { type: constant.GET_LICENCETYPE_DATA };
};
export const getCommunicationdata = () => {
    return { type: constant.GET_COMMUNICATIONTYPE_DATA };
};
export const addLicencedata = (formdata) => {
    return { type: constant.ADD_LICENCETYPE_DATA, data: formdata };
};
export const addCommunicationdata = (formdata) => {
    return { type: constant.ADD_COMMUNICATIONTYPE_DATA, data: formdata };
};
export const deleteLicencedata = (id) => {
    return { type: constant.DELETE_LICENCETYPE_DATA, data: id };
};
export const deleteCommunicationdata = (id) => {
    return { type: constant.DELETE_COMMUNICATIONTYPE_DATA, data: id };
};
export const deletestatedata = (id) => {
    return { type: constant.DELETE_STATE_DATA, data: id };
};
export const getStatedata = () => {
    return { type: constant.GET_STATE_DATA };
};
export const addStatedata = (formdata) => {
    return { type: constant.ADD_STATE_DATA, data: formdata };
};
export const getProductdata = () => {
    return { type: constant.GET_PRODUCT_DATA };
};
