import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddVendor } from "../../Services/Vendor";
import {
  TextField,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
const Userregister = (props) => {
  const Submit = (e) => {
    if (
      props.Userregister.firstName === "" ||
      props.Userregister.emailId === "" ||
      props.Userregister.lastName === "" ||
      props.Userregister.logId === "" ||
      props.Userregister.password === ""
    )
      toast.error("Please fill all the mandatory fields");
    else {
      AddVendor(props.Vendordata).then((res) => {
        if (res.status === 200) {
          toast.success("Vendor has been create successfully");
          props.setActiveStep(0);
          props.setVendordata({
            id: 0,
            vendorId: "",
            name: "",
            primery_Address: {
              address: "",
              city: "",
              suite: "",
              state: "",
              pincode: "",
            },
            secondary_Address: {
              address: "",
              city: "",
              suite: "",
              state: "",
              pincode: "",
            },
            primery_Contact: {
              firstName: "",
              middleName: "",
              lastName: "",
              phone: "",
              email: "",
              ext: "",
              cellPhone: "",
            },
            secondary_contact: {
              firstName: "",
              middleName: "",
              lastName: "",
              phone: "",
              email: "",
              ext: "",
              cellPhone: "",
            },
            assignmentNote: "",
            new_Assignment: true,
            qcRejection: true,
            dailyReminder: true,
            profileReminder: true,
            licences: [
              {
                firstName: "",
                lastName: "",
                licenceNo: "",
                licenceType: "",
                status: "",
                address: "",
                expiry_Date: "",
                issueDate: "",
                disciplinaryAction: "",
                note: "",
              },
            ],
            communication: [
              {
                type: "",
                detail: "",
                product_id: 0,
              },
            ],
            product: [
              {
                id: "",
                name: "string",
                price: 0,
                productId: 0,
                selected: false,
              },
            ],
            userregistration: {
              firstName: "",
              lastName: "",
              emailId: "",
              logId: "",
              password: "",
              allowTextMsg: true,
            },
          });
        } else {
          res.json().then((val) => toast.error(val));
        }
      });
    }
  };

  return (
    <>
      <div className=" border-2 py-3 mb-3 border-sky-500 p-3 rounded-xl">
        <div className="flex flex-col flex-wrap  border-2 border-slate-300 p-2 mb-1 rounded-xl">
          <div className="flex gap-6 flex-col md:flex-row  py-1 mb-1">
            <div>
              <TextField
                name="firstName"
                label={
                  <>
                    First Name <span className="text-red-600">*</span>
                  </>
                }
                value={props.Userregister.firstName}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  props.setVendordata({
                    ...(props.Vendordata ? props.Vendordata : ""),
                    ["userregistration"]: {
                      ...props.Vendordata.userregistration,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div>
              <TextField
                name="lastName"
                label={
                  <>
                    Last Name <span className="text-red-600">*</span>
                  </>
                }
                value={props.Userregister.lastName}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  props.setVendordata({
                    ...(props.Vendordata ? props.Vendordata : ""),
                    ["userregistration"]: {
                      ...props.Vendordata.userregistration,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div>
              <TextField
                name="emailId"
                label={
                  <>
                    Email id <span className="text-red-600">*</span>
                  </>
                }
                value={props.Userregister.emailId}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  props.setVendordata({
                    ...(props.Vendordata ? props.Vendordata : ""),
                    ["userregistration"]: {
                      ...props.Vendordata.userregistration,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              />
            </div>

            <div>
              <TextField
                name="logId"
                label={
                  <>
                    Log id <span className="text-red-600">*</span>
                  </>
                }
                value={props.Userregister.logId}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  props.setVendordata({
                    ...(props.Vendordata ? props.Vendordata : ""),
                    ["userregistration"]: {
                      ...props.Vendordata.userregistration,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div>
              <TextField
                name="password"
                label={
                  <>
                    Password <span className="text-red-600">*</span>
                  </>
                }
                value={props.Userregister.password}
                variant="outlined"
                size="small"
                type="password"
                onChange={(e) => {
                  props.setVendordata({
                    ...(props.Vendordata ? props.Vendordata : ""),
                    ["userregistration"]: {
                      ...props.Vendordata.userregistration,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="allowTextMsg"
                      checked={props.Userregister.allowTextMsg}
                      onChange={(e) => {
                        props.setVendordata({
                          ...(props.Vendordata ? props.Vendordata : ""),
                          ["userregistration"]: {
                            ...props.Vendordata.userregistration,
                            [e.target.name]: !props.Vendordata.userregistration
                              .allowTextMsg,
                          },
                        });
                      }}
                    />
                  }
                  label="Text Msg. Allow"
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "end",
        }}
      >
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={() => props.setActiveStep((prev) => prev - 1)}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>
        <Button variant="contained" sx={{ m: 1 }} onClick={() => Submit()}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Userregister;