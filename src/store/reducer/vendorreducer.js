import { constant } from 'store/constant';

export const initialState = {
    stateData: [],
    loader: true,
    vendorData: [],
    licenceTypeData: [],
    communicationTypeData: [],
    ProductData: [],
    ProfileFormData: {
        vendorId: '',
        name: '',
        primery_Address: {
            address: '',
            city: '',
            suite: '',
            state: '',
            pincode: ''
        },
        secondary_Address: {
            address: '',
            city: '',
            suite: '',
            state: '',
            pincode: ''
        },
        primery_Contact: {
            firstName: '',
            middleName: '',
            lastName: '',
            phone: '',
            email: '',
            ext: '',
            cellPhone: ''
        },
        secondary_contact: {
            firstName: '',
            middleName: '',
            lastName: '',
            phone: '',
            email: '',
            ext: '',
            cellPhone: ''
        },
        assignmentNote: ''
    }
};

export const VendorData = (state = initialState, action) => {
    let data = [];
    switch (action.type) {
        case constant.SET_STATE_DATA:
            action.data.map((ele, indx) => {
                return data.push({
                    id: indx + 1,
                    state_id: ele.id,
                    name: ele.name,
                    createdDate: ele.createdDate.substring(0, 10),
                    updateDate: ele.updateDate === null ? 'Not updated' : ele.updateDate.substring(0, 10)
                });
            });
            return { ...state, stateData: data, loader: false };
        case constant.SET_VENDOR_DATA:
            action.data.map((ele) =>
                data.push({
                    id: ele.id,
                    vendorid: ele.vendorid,
                    name: ele.name,
                    email: ele.email,
                    state: ele.address.split(',')[3],
                    contact:
                        ele.contact1.split(',')[4] === ''
                            ? ele.contact1.split(',')[3]
                            : ele.contact1.split(',')[3] + ' ,' + ele.contact1.split(',')[4],
                    licenceType: ele.licence.licenceType,
                    product: ele.product.name,
                    status: ele.status
                })
            );
            return { ...state, vendorData: data, loader: false };
        case constant.SET_LICENCETYPE_DATA:
            action.data.map((ele, indx) => {
                return data.push({
                    id: indx + 1,
                    Licence_id: ele.id,
                    name: ele.name,
                    createdDate: ele.createdDate.substring(0, 10),
                    updateDate: ele.updateDate === null ? 'Not updated' : ele.updateDate.substring(0, 10)
                });
            });
            return { ...state, licenceTypeData: data, loader: false };
        case constant.SET_COMMUNICATIONTYPE_DATA:
            action.data.map((ele, indx) => {
                return data.push({
                    id: indx + 1,
                    com_id: ele.id,
                    name: ele.name,
                    uniquename: ele.uniquename,
                    createdDate: ele.createdDate.substring(0, 10),
                    updateDate: ele.updateDate === null ? 'Not updated' : ele.updateDate.substring(0, 10)
                });
            });
            return { ...state, communicationTypeData: data, loader: false };
        case constant.SET_PRODUCT_DATA:
            return { ...state, ProductData: action.data, loader: false };
        default:
            return state;
    }
};
