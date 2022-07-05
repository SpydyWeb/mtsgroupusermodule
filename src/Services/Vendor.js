import { CurrentUrl } from "./UrlApi";

let Url = `${CurrentUrl}api/Vendor/`;

// AddLicenceType
export const AddLicenceType = async (userData) => {
  return await fetch(`${Url}AddLicenceType`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//  GET LicenceTypeList
export const GetLicenceType = async () => {
  return await fetch(`${Url}LicenceTypeList`, {
    method: "GET",
    header: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

//Communication product

export const AddCommunicationProduct = async (data) => {
  return await fetch(`${Url}AddCommunicationProductType`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//Communication

export const AddCommunication = async (data) => {
  return await fetch(`${Url}AddCommunicationType`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//State

export const AddState = async (data) => {
  return await fetch(`${Url}AddState`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
