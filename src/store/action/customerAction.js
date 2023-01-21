import { constant } from 'store/constant';
export const getCustomerdata = (searchValue) => {
    return { type: constant.GET_CUSTOMER_DATA, value: searchValue };
};
