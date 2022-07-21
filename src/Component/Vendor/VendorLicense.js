import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";

import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
const VendorLicense = (props) => {
  const top100Films = [{ title: "", year: 1994 }];

  const handleRemoveClick = (index) => {
    const list = [...props.licences];
    list.splice(index, 1);

    props.setVendordata({ ...props.Vendordata, ["licences"]: list });
  };
  const handleNext = () => {
    let status = false;
    props.Vendordata.licences.map((ele) => {
      if (
        ele.firstName === "" ||
        ele.lastName === "" ||
        ele.licenceNo === "" ||
        ele.licenceType === "" ||
        ele.address === "" ||
        ele.expiry_Date === "" ||
        ele.issueDate === "" ||
        ele.disciplinaryAction === "" ||
        ele.note === ""
      ) {
        status = true;
      }
    });
    if (status) toast.error("Please fill all the mandatory fields");
    else props.setActiveStep((prev) => prev + 1);
  };
  const handleAddClick = () => {
    let status = false;
    props.Vendordata.licences.map((ele) => {
      if (
        ele.firstName === "" ||
        ele.lastName === "" ||
        ele.licenceNo === "" ||
        ele.licenceType === "" ||
        ele.address === "" ||
        ele.expiry_Date === "" ||
        ele.issueDate === "" ||
        ele.disciplinaryAction === "" ||
        ele.note === ""
      ) {
        status = true;
      }
    });
    if (status) toast.error("Please fill all the mandatory fields");
    else
      props.setVendordata({
        ...props.Vendordata,
        ["licences"]: [
          ...props.Vendordata.licences,
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
      });
  };
  const handlechangeLicense = (e, i) => {
    const { name, value } = e.target;
    const data = [...props.licences];
    var q = new Date();
    var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());

    if (name === "issueDate") {
      if (new Date(value) < date) {
        data[i][name] = value;
      } else {
        toast.error("Issue date should be less than from today");
      }
    } else data[i][name] = value;
    props.setVendordata({ ...props.Vendordata, ["licences"]: data });
  };
  return (
    <>
      <div className=" border-2 py-3 mb-3 border-sky-500 p-3 rounded-xl">
        {props.licences.map((x, i) => {
          return (
            <>
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
                      variant="outlined"
                      size="small"
                      value={x.firstName}
                      onChange={(e) => handlechangeLicense(e, i)}
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
                      variant="outlined"
                      size="small"
                      value={x.lastName}
                      onChange={(e) => handlechangeLicense(e, i)}
                    />
                  </div>
                  <div>
                    <TextField
                      name="licenceNo"
                      label={
                        <>
                          Licence No. <span className="text-red-600">*</span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      value={x.licenceNo}
                      onChange={(e) => handlechangeLicense(e, i)}
                    />
                  </div>
                  <div>
                    <FormControl className="w-40" size="small">
                      <InputLabel>
                        License Type <span className="text-red-600">*</span>
                      </InputLabel>
                      <Select
                        labelId="License_Type"
                        name="licenceType"
                        label="License Type"
                        value={x.licenceType}
                        onChange={(e) => handlechangeLicense(e, i)}
                      >
                        {props.licenceType.map((ele, indx) => {
                          return (
                            <MenuItem value={ele.name} key={indx}>
                              {ele.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      name="status"
                      label={
                        <>
                          Status <span className="text-red-600">*</span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      value={x.status}
                      onChange={(e) => handlechangeLicense(e, i)}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6  py-2 mb-1 flex-wrap">
                  <div>
                    <Autocomplete
                      freeSolo
                      style={{ minWidth: "300px" }}
                      disableClearable
                      options={top100Films.map((option) => option.title)}
                      inputValue={x.address}
                      onInputChange={(event, newInputValue) => {
                        const data = [...props.licences];

                        data[i]["address"] = newInputValue;
                        props.setVendordata({
                          ...props.Vendordata,
                          ["licences"]: data,
                        });
                      }}
                      name="address"
                      onChange={(e) => handlechangeLicense(e, i)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={
                            <>
                              Address <span className="text-red-600">*</span>
                            </>
                          }
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
                      label={
                        <>
                          Issue Date <span className="text-red-600">*</span>
                        </>
                      }
                      name="issueDate"
                      type="date"
                      variant="outlined"
                      size="small"
                      value={x.issueDate}
                      onChange={(e) => handlechangeLicense(e, i)}
                      onBlur={(e) => {
                        const data = [...props.licences];
                        if (new Date(e.target.value) < new Date("01-01-3000")) {
                          data[i][e.target.name] = e.target.value;
                        } else {
                          toast.error("Enter valid date");
                          data[i][e.target.name] = "";
                        }
                        props.setVendordata({
                          ...props.Vendordata,
                          ["licences"]: data,
                        });
                      }}
                      focused
                    />
                  </div>

                  <div>
                    <TextField
                      label={
                        <>
                          Expiry Date <span className="text-red-600">*</span>
                        </>
                      }
                      name="expiry_Date"
                      type="date"
                      variant="outlined"
                      size="small"
                      value={x.expiry_Date}
                      onChange={(e) => handlechangeLicense(e, i)}
                      focused
                      onBlur={(e) => {
                        const data = [...props.licences];
                        if (
                          new Date(e.target.value) >
                            new Date(data[i].issueDate) &&
                          new Date(e.target.value) < new Date("01-01-3000")
                        ) {
                          data[i][e.target.name] = e.target.value;
                        } else {
                          toast.error(
                            "Expiry date should be greater than issue date"
                          );
                          data[i][e.target.name] = "";
                        }
                        props.setVendordata({
                          ...props.Vendordata,
                          ["licences"]: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-6 py-1 mb-1">
                  <div className="w-full md:w-1/2">
                    <TextField
                      name="disciplinaryAction"
                      label={
                        <>
                          Disciplinary/ Other Actions{" "}
                          <span className="text-red-600">*</span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      multiline
                      rows={2}
                      fullWidth
                      value={x.disciplinaryAction}
                      onChange={(e) => handlechangeLicense(e, i)}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextField
                      name="note"
                      label={
                        <>
                          Note <span className="text-red-600">*</span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      multiline
                      rows={2}
                      fullWidth
                      value={x.note}
                      onChange={(e) => handlechangeLicense(e, i)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {props.licences.length !== 1 && (
                    <MdDelete
                      onClick={() => handleRemoveClick(i)}
                      color="red"
                      size={25}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {props.licences.length - 1 === i && (
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "end",
        }}
      >
        <Button
          disabled={props.activeStep === 0}
          onClick={() => props.setActiveStep((prev) => prev - 1)}
          variant="contained"
          sx={{ m: 1 }}
        >
          Back
        </Button>

        <Button onClick={handleNext} variant="contained" sx={{ m: 1 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default VendorLicense;
