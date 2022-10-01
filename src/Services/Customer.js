import axios from "axios";
import { CurrentUrl } from "./UrlApi";

let Url = `${CurrentUrl}Customer/`;

let config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    }
  }
  
export const AddCustomer = async (data) => {
     return await axios.post(`${Url}AddCustomer`, data,config).then((data) => data);
  };

  export const AddCustomerUser = async (data) => {
    return await axios.post(`${CurrentUrl}User/Adduser`, data,config).then((data) => data);
 };
 export const DeleteCustomerUser = async (id) => {
    return await axios.post(`${CurrentUrl}User/Deleteuser?id=${id}`, config).then((data) => data);
 };

 export const CustomerSearch = async (data) => {
   return await axios.post(`${Url}Customersearch`, data,config).then((data) => data);
};

 export const UpdateCustomerUser = async (data) => {
    return await axios.put(`${CurrentUrl}User/Updateuser`,data, config).then((data) => data);
 };
 export const GetCustomerDetaills = async (id) => {
   return await axios.get(`${Url}GetCustomerbyid?id=${id}`, config).then((data) => data);
};
export const GetCustomerProductDetaills = async (id) => {
   return await axios.get(`${Url}GetCustomerProduct?Customerid=${id}`, config).then((data) => data);
};
export const UpdateCustomerProduct = async (data) => {
   return await axios.put(`${Url}UpdateCustomerProduct`, data,config).then((data) => data);
};

export const UploadProductFile = async (data,id) => {
   return await axios.post(`${Url}Uploadfiles?Customerid=${id}`, data, {
      headers: {'Content-Type': 'multipart/form-data'}
}).then((data) => data);
};
export const DownloadFile = async (path) => {
  return await axios.post(`${Url}Downloadfiles?path=${path}`,
        {
            responseType: 'blob',
            headers: {
               'content-type': 'application/octet-stream',
            }
        })
        .then((response) => response)
        .catch((error) => error);
   // return axios.post(`${Url}Downloadfiles?path=${path}`, {responseType: "arraybuffer"}).then((data) => data);
};

