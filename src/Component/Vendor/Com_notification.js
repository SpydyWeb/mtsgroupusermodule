import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import Android12Switch from "./Android12Switch";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AddVendor } from "../../Services/Vendor";
import toast from "react-hot-toast";
const Com_notification = (props) => {
  const handleRemoveClick = (index) => {
    const list = [...props.communication];
    list.splice(index, 1);
    props.setVendordata({ ...props.Vendordata, ["communication"]: list });
  };

  const handleSubmit = () => {
    let status = false;

    props.communication.map((ele, i) => {
      if (
        (ele.type === "" || ele.detail === "") &&
        (ele.productId !== 0 || i === 0)
      ) {
        status = true;
      }
    });

    if (status) toast.error("Please fill all the mandatory fields");
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
          });
        } else {
          res.json().then((val) => toast.error(val));
        }
      });
    }
  };

  const handleAddClick = () => {
    let status = false;

    props.communication.map((ele, i) => {
      if (
        (ele.type === "" || ele.detail === "") &&
        (ele.productId !== 0 || i === 0)
      ) {
        status = true;
      }
    });

    if (status) toast.error("Please fill all the mandatory fields");
    else
      props.setVendordata({
        ...props.Vendordata,
        ["communication"]: [
          ...props.Vendordata.communication,
          {
            type: "",
            detail: "",
            product_id: 0,
          },
        ],
      });
  };
  const handlechangeCommunication = (e, i) => {
    const { name, value } = e.target;
    const data = [...props.communication];

    data[i][name] = value;
    props.setVendordata({ ...props.Vendordata, ["communication"]: data });
    // setInputList(data);
  };
  return (
    <>
      <div className="py-3 mb-3 ">
        <span className="legend Btn_Gradient">Communication</span>
        <div className="  border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
          {props.communication.map((x, i) => {
            return (
              <>
                <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-1 rounded-xl ">
                  <div>{i === 0 ? "Default" : "Additional"}</div>
                  <div>
                    <FormControl className="w-40" size="small">
                      <InputLabel>
                        Type <span className="text-red-600">*</span>
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        name="type"
                        value={x.type}
                        onChange={(e) => handlechangeCommunication(e, i)}
                      >
                        {props.communicationType.map((ele) => {
                          return (
                            <MenuItem value={ele.name}>{ele.name}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      label={
                        <>
                          Detail <span className="text-red-600">*</span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      name="detail"
                      value={x.detail}
                      onChange={(e) => handlechangeCommunication(e, i)}
                    />
                  </div>
                  {i !== 0 ? (
                    <div>
                      <FormControl className="w-40" size="small">
                        <InputLabel>
                          Product <span className="text-red-600">*</span>
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Product"
                          name="product_id"
                          value={x.product_id}
                          onChange={(e) => handlechangeCommunication(e, i)}
                        >
                          {props.productD.map((ele, i) => {
                            return ele.selected ? (
                              <MenuItem value={ele.id}>{ele.name}</MenuItem>
                            ) : (
                              <></>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex">
                    {props.communication.length !== 1 &&
                      (i !== 0 ? (
                        <MdDelete
                          onClick={() => handleRemoveClick(i)}
                          color="red"
                          size={25}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <></>
                      ))}
                    {props.communication.length - 1 === i && (
                      <IoMdAddCircle
                        onClick={handleAddClick}
                        color="green"
                        size={25}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <span className="legend Btn_Gradient">Additional Notification</span>
      <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="New Assignment"
              name="new_Assignment"
              checked={props.Vendordata.new_Assignment}
              onChange={(e) => {
                props.setVendordata({
                  ...props.Vendordata,
                  [e.target.name]: !props.Vendordata.new_Assignment,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="QC Rejection"
              name="qcRejection"
              checked={props.Vendordata.qcRejection}
              onChange={(e) => {
                props.setVendordata({
                  ...props.Vendordata,
                  [e.target.name]: !props.Vendordata.qcRejection,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="Daily Reminder"
              name="dailyReminder"
              checked={props.Vendordata.dailyReminder}
              onChange={(e) => {
                props.setVendordata({
                  ...props.Vendordata,
                  [e.target.name]: !props.Vendordata.dailyReminder,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="Profile Reminder"
              name="profileReminder"
              checked={props.Vendordata.profileReminder}
              onChange={(e) => {
                props.setVendordata({
                  ...props.Vendordata,
                  [e.target.name]: !props.Vendordata.profileReminder,
                });
              }}
            />
          </FormGroup>
        </div>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={() => props.setActiveStep((prev) => prev - 1)}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleSubmit} variant="contained" sx={{ m: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Com_notification;
