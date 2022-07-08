import React from "react";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
const VendorProfileForm = (props) => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
  ];
  console.log(props);
  return (
    <div className="mt-5">
      <span className="legend Btn_Gradient">Profile Details</span>
      <div className="flex flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div>
          <TextField
            id="Id"
            label="ID"
            value={
              props.Vendordata && props.Vendordata.vendorId
                ? props.Vendordata.vendorId
                : ""
            }
            name="vendorId"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                [e.target.name]: e.target.value,
              });
            }}
            variant="outlined"
            size="small"
          />
        </div>
        <div>
          <TextField
            id="Name"
            value={
              props.Vendordata && props.Vendordata.name
                ? props.Vendordata.name
                : ""
            }
            name="name"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                [e.target.name]: e.target.value,
              });
            }}
            label="Name"
            variant="outlined"
            size="small"
          />
        </div>
      </div>
      <span className="legend Btn_Gradient">Primary Address</span>
      <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div>
          <Autocomplete
            freeSolo
            style={{ minWidth: "300px" }}
            id="free-solo-2-demo"
            disableClearable
            options={top100Films}
            inputValue={
              props.Vendordata &&
              props.Vendordata.primery_Address &&
              props.Vendordata.primery_Address.address
                ? props.Vendordata.primery_Address.address
                : ""
            }
            onInputChange={(event, newInputValue) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Address"]: {
                  ...props.Vendordata.primery_Address,
                  ["address"]: newInputValue,
                },
              });
            }}
            name="address"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Address"]: {
                  ...props.Vendordata.primery_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Address"
                InputProps={{
                  ...params.InputProps,
                  type: "text",
                }}
                size="small"
              />
            )}
          />
        </div>
        <div>
          <TextField
            id="Suite"
            label="Suite"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Address &&
              props.Vendordata.primery_Address.suite
                ? props.Vendordata.primery_Address.suite
                : ""
            }
            name="suite"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Address"]: {
                  ...props.Vendordata.primery_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="City"
            label="City"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Address &&
              props.Vendordata.primery_Address.city
                ? props.Vendordata.primery_Address.city
                : ""
            }
            name="city"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Address"]: {
                  ...props.Vendordata.primery_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <FormControl className="w-40" size="small">
            <InputLabel>State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={
                props.Vendordata &&
                props.Vendordata.primery_Address &&
                props.Vendordata.primery_Address.state
                  ? props.Vendordata.primery_Address.state
                  : ""
              }
              name="state"
              onChange={(e) => {
                props.setVendordata({
                  ...(props.Vendordata ? props.Vendordata : ""),
                  ["primery_Address"]: {
                    ...props.Vendordata.primery_Address,
                    [e.target.name]: e.target.value,
                  },
                });
              }}
            >
              <MenuItem value={10}>Select..</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            id="Zip"
            label="Zip"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Address &&
              props.Vendordata.primery_Address.pincode
                ? props.Vendordata.primery_Address.pincode
                : ""
            }
            name="pincode"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Address"]: {
                  ...props.Vendordata.primery_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
      <span className="legend bg-slate-400">Billing Address</span>
      <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div>
          <Autocomplete
            freeSolo
            style={{ minWidth: "300px" }}
            id="free-solo-2-demo"
            disableClearable
            options={top100Films}
            inputValue={
              props.Vendordata &&
              props.Vendordata.secondary_Address &&
              props.Vendordata.secondary_Address.address
                ? props.Vendordata.secondary_Address.address
                : ""
            }
            onInputChange={(event, newInputValue) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_Address"]: {
                  ...props.Vendordata.secondary_Address,
                  ["address"]: newInputValue,
                },
              });
            }}
            name="address"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_Address"]: {
                  ...props.Vendordata.secondary_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Address"
                InputProps={{
                  ...params.InputProps,
                  type: "text",
                }}
                size="small"
              />
            )}
          />
        </div>
        <div>
          <TextField
            id="Suite"
            label="Suite"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_Address &&
              props.Vendordata.secondary_Address.suite
                ? props.Vendordata.secondary_Address.suite
                : ""
            }
            name="suite"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_Address"]: {
                  ...props.Vendordata.secondary_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="City"
            label="City"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_Address &&
              props.Vendordata.secondary_Address.city
                ? props.Vendordata.secondary_Address.city
                : ""
            }
            name="city"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_Address"]: {
                  ...props.Vendordata.secondary_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <FormControl className="w-40" size="small">
            <InputLabel>State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={
                props.Vendordata &&
                props.Vendordata.secondary_Address &&
                props.Vendordata.secondary_Address.state
                  ? props.Vendordata.secondary_Address.state
                  : ""
              }
              name="state"
              onChange={(e) => {
                props.setVendordata({
                  ...(props.Vendordata ? props.Vendordata : ""),
                  ["secondary_Address"]: {
                    ...props.Vendordata.secondary_Address,
                    [e.target.name]: e.target.value,
                  },
                });
              }}
            >
              <MenuItem value={10}>Select..</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            id="Zip"
            label="Zip"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_Address &&
              props.Vendordata.secondary_Address.pincode
                ? props.Vendordata.secondary_Address.pincode
                : ""
            }
            name="pincode"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_Address"]: {
                  ...props.Vendordata.secondary_Address,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
      <span className="legend Btn_Gradient">Primary Contact</span>
      <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div>
          <TextField
            id="firstname"
            label="First Name"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.firstName
                ? props.Vendordata.primery_Contact.firstName
                : ""
            }
            name="firstName"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="middleName"
            label="Middle Name"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.middleName
                ? props.Vendordata.primery_Contact.middleName
                : ""
            }
            name="middleName"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.lastName
                ? props.Vendordata.primery_Contact.lastName
                : ""
            }
            name="lastName"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.phone
                ? props.Vendordata.primery_Contact.phone
                : ""
            }
            name="phone"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="ext"
            label="Ext"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.ext
                ? props.Vendordata.primery_Contact.ext
                : ""
            }
            name="ext"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.email
                ? props.Vendordata.primery_Contact.email
                : ""
            }
            name="email"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="cellphone"
            label="Cell Phone"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.primery_Contact &&
              props.Vendordata.primery_Contact.cellPhone
                ? props.Vendordata.primery_Contact.cellPhone
                : ""
            }
            name="cellPhone"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["primery_Contact"]: {
                  ...props.Vendordata.primery_Contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
      <span className="legend bg-slate-400">Additional Contact</span>
      <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div>
          <TextField
            id="firstname"
            label="First Name"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.firstName
                ? props.Vendordata.secondary_contact.firstName
                : ""
            }
            name="firstName"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="middleName"
            label="Middle Name"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.middleName
                ? props.Vendordata.secondary_contact.middleName
                : ""
            }
            name="middleName"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.lastName
                ? props.Vendordata.secondary_contact.lastName
                : ""
            }
            name="lastName"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.phone
                ? props.Vendordata.secondary_contact.phone
                : ""
            }
            name="phone"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="ext"
            label="Ext"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.ext
                ? props.Vendordata.secondary_contact.ext
                : ""
            }
            name="ext"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.email
                ? props.Vendordata.secondary_contact.email
                : ""
            }
            name="email"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="cellphone"
            label="Cell Phone"
            variant="outlined"
            size="small"
            value={
              props.Vendordata &&
              props.Vendordata.secondary_contact &&
              props.Vendordata.secondary_contact.cellPhone
                ? props.Vendordata.secondary_contact.cellPhone
                : ""
            }
            name="cellPhone"
            onChange={(e) => {
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["secondary_contact"]: {
                  ...props.Vendordata.secondary_contact,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="flex gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div className=" w-full">
          <TextField
            id="assignment"
            label="Assignment Note"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            fullWidth
            value={
              props.Vendordata && props.Vendordata.assignmentNote
                ? props.Vendordata.assignmentNote
                : ""
            }
            name="assignmentNote"
            onChange={(e) => {
              console.log(e.target.name);
              props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorProfileForm;
