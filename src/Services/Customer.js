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
     return axios.post(`${Url}AddCustomer`, data,config).then((data) => data);
  };

  export const AddCustomerUser = async (data) => {
    return axios.post(`${CurrentUrl}User/Adduser`, data,config).then((data) => data);
 };
 export const DeleteCustomerUser = async (id) => {
    return axios.post(`${CurrentUrl}User/Deleteuser?id=${id}`, config).then((data) => data);
 };

 export const CustomerSearch = async (data) => {
   return axios.post(`${Url}Customersearch`, data,config).then((data) => data);
};

 export const UpdateCustomerUser = async (data) => {
    return axios.put(`${CurrentUrl}User/Updateuser`,data, config).then((data) => data);
 };
 export const GetCustomerDetaills = async (id) => {
   return axios.get(`${Url}GetCustomerbyid?id=${id}`, config).then((data) => data);
};
export const GetCustomerProductDetaills = async (id) => {
   return axios.get(`${Url}GetCustomerProduct?Customerid=${id}`, config).then((data) => data);
};
export const UpdateCustomerProduct = async (data) => {
   return axios.put(`${Url}UpdateCustomerProduct`, data,config).then((data) => data);
};

