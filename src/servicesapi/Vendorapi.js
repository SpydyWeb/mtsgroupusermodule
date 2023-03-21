import { CurrentUrl } from './UrlApi';
import axios from 'axios';
let Url = `${CurrentUrl}api/Vendor/`;

// AddLicenceType
export const AddLicenceType = async (userData) => {
    return await fetch(`${Url}AddLicenceType`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

// UpdateLicenceType
export const UpdateLicenceType = async (userData, id) => {
    return await fetch(`${Url}UpdateLicenceType/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//DeleteLicenceType
export const DeleteLicenceType = async (id) => {
    return await fetch(`${Url}DeleteLicenceType/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//GET LicenceTypeList
export const GetLicenceType = async () => {
    return await fetch(`${Url}LicenceTypeList`, {
        method: 'GET',
        header: {
            'content-Type': 'application/json',
            Accept: 'application/json',
            'Acces-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

//AddCommunication product

export const AddCommunicationProduct = async (data) => {
    return await fetch(`${Url}AddCommunicationProductType`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const AddCommunicationById = async (data, id) => {
    return await fetch(`${Url}Addcommunication?vendorid=${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//  GET CommunicationProductType
export const GetCommunicationProductType = async () => {
    return await fetch(`${Url}CommunicationProductType`, {
        method: 'GET',
        header: {
            'content-Type': 'application/json',
            Accept: 'application/json',
            'Acces-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const UpdateCommuncationProductType = async (userData, id) => {
    return await fetch(`${Url}UpdateCommuncationProductType/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//DeleteCommuncationProductType
export const DeleteCommuncationProductType = async (id) => {
    return await fetch(`${Url}DeleteCommuncationProductType/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//Communication

export const AddCommunication = async (data) => {
    return await fetch(`${Url}AddCommunicationType`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

// GETCommunicationTypeList;
export const GetCommunicationTypeList = async () => {
    return await fetch(`${Url}CommunicationTypeList`, {
        method: 'GET',
        header: {
            'content-Type': 'application/json',
            Accept: 'application/json',
            'Acces-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const UpdateCommuncationType = async (userData, id) => {
    return await fetch(`${Url}UpdateCommuncationType/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//DeleteCommuncationProductType
export const DeleteCommuncationType = async (id) => {
    return await fetch(`${Url}DeleteCommuncationType/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const DeleteCommuncationbyVendorid = async (id) => {
    return await fetch(`${Url}DeleteCommunication?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//State

export const AddState = async (data) => {
    return await fetch(`${Url}AddState`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

// GET StateList;
export const GetStateList = async () => {
    return await fetch(`${Url}StateList`, {
        method: 'GET',
        header: {
            'content-Type': 'application/json',
            Accept: 'application/json',
            'Acces-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const UpdateState = async (userData, id) => {
    return await fetch(`${Url}UpdateState/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

//DeleteCommuncationProductType
export const DeleteState = async (id) => {
    return await fetch(`${Url}DeleteState/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

export const GetVendorProduct = async () => {
    return await fetch(`${Url}ProductList`, {
        method: 'GET',
        header: {
            'content-Type': 'application/json',
            Accept: 'application/json',
            'Acces-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const AddVendorProductList = async (data) => {
    return await fetch(`${Url}AddProductList?name=${data.name}&productid=${data.productid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

export const AddVendor = async (data) => {
    return await fetch(`${Url}Addvendor`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const Addvendorfile = (data) => {
    const formData = new FormData();
    formData.append('Files', data);
    return axios
        .post(`${Url}Addfile`, formData)
        .then((res) => res)
        .catch((err) => console.log('File Upload Error'));
};
export const Addexistingvendorfile = async (data, id) => {
    return axios
        .post(`${Url}AddVendorFile?vendorId=${id}`, data)
        .then((res) => res)
        .catch((err) => console.log('File Upload Error'));
    // return await fetch(`${Url}AddVendorFile?vendorId=${id}`, {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //     }
    // }).then((data) => data);
};
export const UpdateVendorFile = async (data, id) => {
    return axios
        .post(`${Url}UpdateVendorFile`, data)
        .then((res) => res)
        .catch((err) => console.log('File Upload Error'));
};
export const GetVendorFileById = async (id) => {
    return await fetch(`${Url}GetVendorFileById?vendorid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const GetFileById = async (id) => {
    return await fetch(`${Url}GetFileById?Fileid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const Checkexistingid = async (id) => {
    return await fetch(`${Url}Checkexistingid?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const GetallVendor = async () => {
    return await fetch(`${Url}GetAllVendors`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};
export const GetallVendorBySearch = async (data) => {
    return await fetch(`${Url}Vendorsearch`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const Getvendorbyid = async (id) => {
    return await fetch(`${Url}Getvendorbyid?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const GetvendorProductbyid = async (id) => {
    return await fetch(`${Url}GetvendorProduct?vendorid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};

export const GetVendorCommunicationbyid = async (id) => {
    return await fetch(`${Url}GetVendorCommunication?vendorid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};
export const GetVendorAddressbyid = async (id) => {
    return await fetch(`${Url}GetVendorAddress?vendorid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};
export const UpdateVendorAddress = async (data, id) => {
    return await fetch(`${Url}UpdateVendorAddresses?vendorid=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const GetVendorContactbyid = async (id) => {
    return await fetch(`${Url}GetVendorContact?vendorid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};
export const GetVendorLicencebyid = async (id) => {
    return await fetch(`${Url}GetVendorLicences?vendorid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};
export const UpdateVendorContact = async (data, id) => {
    const token = localStorage.getItem('jwtTokenId');
    return await fetch(`${Url}UpdateVendorContacts?vendorid=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

export const UpdateVendor = async (data) => {
    const token = localStorage.getItem('jwtTokenId');
    return await fetch(`${Url}UpdateVendor`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const UpdateVendorLicences = async (data, id) => {
    const token = localStorage.getItem('jwtTokenId');
    return await fetch(`${Url}UpdateVendorLicences?vendorid=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

export const UpdateVendorcommunications = async (data, id) => {
    const token = localStorage.getItem('jwtTokenId');
    return await fetch(`${Url}UpdateVendorcommunications?vendorid=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};

export const UpdateVendorproducts = async (data, id) => {
    const token = localStorage.getItem('jwtTokenId');
    return await fetch(`${Url}UpdateVendorproducts?vendorid=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
