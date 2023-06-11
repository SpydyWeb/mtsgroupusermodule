import axios from 'axios';
import { CurrentUrl } from './UrlApi';

let Url = `${CurrentUrl}Customer/`;
const token = localStorage.getItem('jwtTokenId');
let config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

export const AddCustomer = async (data) => {
    return await axios.post(`${Url}AddCustomer`, data, config).then((data) => data);
};

export const AddCustomerUser = async (data) => {
    return await axios.post(`${CurrentUrl}User/Adduser`, data, config).then((data) => data);
};
export const DeleteCustomerUser = async (id) => {
    return await axios.post(`${CurrentUrl}User/Deleteuser?id=${id}`, config).then((data) => data);
};

export const CustomerSearch = async (data) => {
    return await axios.post(`${Url}Customersearch`, data, config).then((data) => data);
};

export const UpdateCustomerUser = async (data) => {
    return await axios.put(`${CurrentUrl}User/Updateuser`, data, config).then((data) => data);
};
export const GetCustomerDetaills = async (id) => {
    return await axios.get(`${Url}GetCustomerbyid?id=${id}`, config).then((data) => data);
};
export const GetCustomerProductDetaills = async (id) => {
    return await axios.get(`${Url}GetCustomerProduct?Customerid=${id}`, config).then((data) => data);
};
export const UpdateCustomerProduct = async (data) => {
    return await axios.put(`${Url}UpdateCustomerProduct`, data, config).then((data) => data);
};
export const GetCustomerCommunicationbyid = async (id) => {
    return await axios.get(`${Url}GetCustomerCommunication?Customerid=${id}`, config).then((data) => data);
};
export const GetCustomerAddressbyid = async (id) => {
    return await axios.get(`${Url}GetCustomerAddress?Customerid=${id}`, config).then((data) => data);
};
export const GetCustomerContactbyid = async (id) => {
    return await axios.get(`${Url}GetCustomerContact?Customerid=${id}`, config).then((data) => data);
};
export const GetCustomerIntegrationDetailbyid = async (id) => {
    return await axios.get(`${Url}GetCustomerIntegrationDetail?customerid=${id}`, config).then((data) => data);
};
export const UpdateCustomercommunications = async (data, id) => {
    return await axios.put(`${Url}UpdateCommunication?id=${id}`, data, config).then((data) => data);
};
export const addCustomercommunications = async (data, id) => {
    return await axios.post(`${Url}addCommunication?customerid=${id}`, data, config).then((data) => data);
};
export const UpdateCustomerIntegrationDetail = async (data, id) => {
    return await axios.put(`${Url}UpdateCustomerIntegrationDetail?detailid=${id}`, data, config).then((data) => data);
};
export const Updatecustomer = async (data) => {
    return await axios.put(`${Url}Updatecustomer`, data, config).then((data) => data);
};
export const UpdateCustomerAddress = async (data, id) => {
    return await axios.put(`${Url}UpdateCustomerAddress?addressid=${id}`, data, config).then((data) => data);
};
export const UpdateCustomerContact = async (data, id) => {
    return await axios.put(`${Url}UpdateCustomerContact?Contactid=${id}`, data, config).then((data) => data);
};
export const GetcommunicationLists = async () => {
    return await axios.get(`${Url}GetcommunicationLists`, config).then((data) => data);
};
export const Addcustomerfile = (data) => {
    const formData = new FormData();
    formData.append('Files', data);
    return axios
        .post(`${Url}Addfile`, formData)
        .then((res) => res)
        .catch((err) => console.log('File Upload Error'));
};
export const GetCustomerFileById = async (id) => {
    return await fetch(`${Url}GetCustomerFileById?customerid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data.json());
};
export const Addexistingcustomerfile = async (data, id) => {
    return axios
        .post(`${Url}AddcustomerFile?Customerid=${id}`, data)
        .then((res) => res)
        .catch((err) => console.log('File Upload Error'));
};
export const UpdatecustomerFile = async (data, id) => {
    return axios
        .post(`${Url}UpdatecustomerFile`, data)
        .then((res) => res)
        .catch((err) => console.log('File Upload Error'));
};
export const UploadProductFile = async (data, id) => {
    return await axios
        .post(`${Url}Uploadfiles?Customerid=${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((data) => data);
};
export const DownloadFile = async (path) => {
    return await axios
        .post(`${Url}Downloadfiles?path=${path}`, {
            responseType: 'blob',
            headers: {
                'content-type': 'application/octet-stream'
            }
        })
        .then((response) => response)
        .catch((error) => error);
};

export const DeleteCommuncationbycutomerid = async (id) => {
    return await fetch(`${Url}DeleteCommunication?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((data) => data);
};
export const GetcustomerProductsPriceList = async (customerid, productid, type) => {
    return await axios
        .get(`${Url}CustomerProductsPriceList?customerid=${customerid}&productid=${productid}&type=${type}`, config)
        .then((data) => data);
};

export const AddcustomerProductPrice = async (data, customerid, productid) => {
    return await axios.post(`${Url}AddcustomerProduct?customerid=${customerid}&productid=${productid}`, data, config).then((data) => data);
};

export const AddcustomerNationProduct = async (data, customerid, productid) => {
    return await axios
        .post(`${Url}AddcustomerNationProduct?customerid=${customerid}&productid=${productid}`, data, config)
        .then((data) => data);
};
export const AddcustomerStateProduct = async (data, customerid, productid) => {
    return await axios
        .post(`${Url}AddcustomerStateProduct?customerid=${customerid}&productid=${productid}`, data, config)
        .then((data) => data);
};
export const AddcustomerCountyProduct = async (data, customerid, productid) => {
    return await axios
        .post(`${Url}AddcustomerCountyProduct?customerid=${customerid}&productid=${productid}`, data, config)
        .then((data) => data);
};

export const UpdatecustomerStateProduct = async (data, customerid, productid) => {
    return await axios
        .put(`${Url}UpdatecustomerStateProduct?customerid=${customerid}&productid=${productid}`, data, config)
        .then((data) => data);
};
export const Updatecustomeraccountinfo = async (data, customerid) => {
    return await axios.put(`${Url}updateAccountinfo?id=${customerid}`, data, config).then((data) => data);
};
export const UpdatecustomerCountyProduct = async (data, customerid, productid) => {
    return await axios
        .put(`${Url}UpdatecustomerCountyProduct?customerid=${customerid}&productid=${productid}`, data, config)
        .then((data) => data);
};
