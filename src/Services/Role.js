import { CurrentUrl } from "./UrlApi";

let Url = `${CurrentUrl}Role/`;

export const CreateRole = async (data) => {
  return await fetch(`${Url}Createrole`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const GetRole = async () => {
  return await fetch(`${Url}Getallroles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const GetsubRole = async () => {
  return await fetch(`${Url}Getsubroles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const CreateSubRole = async (data) => {
  return await fetch(`${Url}Createsubrole`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const CreateMapping = async (data) => {
  return await fetch(`${Url}Createmapping`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const GetMappingsubRole = async () => {
  return await fetch(`${Url}GetMappedsubroles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const Deletemapping = async (data) => {
  return await fetch(`${Url}Deletemapping`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
// EDIT ROLE MASTER
export const EditRole = async (data) => {
  return await fetch(`${Url}Updaterole`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

// DELETE ROLE
export const Deleterole = async (data) => {
  console.log(JSON.stringify(data));
  return await fetch(`${Url}Deleterole`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((data) => data)
    .catch((err) => err);
};

// EDIT ROLE MASTER Defunation
export const EditRoleDefination = async (data) => {
  return await fetch(`${Url}Editsubrole`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

// DELETE ROLE Defunation
export const DeleteroleDefunation = async (data) => {
  console.log(JSON.stringify(data));
  return await fetch(`${Url}Deletesubrole`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((data) => data)
    .catch((err) => err);
};

export const AssignRole = async (data) => {
  return await fetch(`${Url}AssignRole`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
