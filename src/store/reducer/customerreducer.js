import { constant } from 'store/constant';

export const initialState = {
    customersData: [],
    loader: true
};
export const customerData = (state = initialState, action) => {
    switch (action.type) {
        case constant.SET_CUSTOMER_DATA:
            let data = [];
            action.data.map((ele) =>
                data.push({
                    id: ele.id,
                    vendorid: ele.customerId,
                    name: ele.name,
                    email: ele.email,
                    state: ele.address.split(',')[3],
                    contact:
                        ele.contact1.split(',')[4] === ''
                            ? ele.contact1.split(',')[3]
                            : ele.contact1.split(',')[3] + ' ,' + ele.contact1.split(',')[4],
                    product: ele.product.name
                })
            );
            return { ...state, customersData: data, loader: false };
        default:
            return state;
    }
};
