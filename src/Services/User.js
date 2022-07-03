import { CurrentUrl } from "./UrlApi";

let Url = `${CurrentUrl}User/`;

export const UserRegistration = async (userData) => {
  return await fetch(`${Url}Registration`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const UserLogin = async (userData) => {
  return await fetch(`${Url}Login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const ChangePassword = async (userData) => {
  return await fetch(`${Url}Changepassword`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const GetAllUSer = async () => {
  return await fetch(`${Url}Allusers`, {
    method: "GET",
    header: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
