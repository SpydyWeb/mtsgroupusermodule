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
import { UpdateVendor,UpdateVendorcommunications } from "../../Services/Vendor";
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
      props.setActiveStep((prev) => prev + 1);
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
      {
        if(props.edit){
          let data=props.Vendordata        
          data.push({
           type: "",
          detail: "",
          product_id: 0,
          })
          props.setCommunicaion(data)  
        }
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
      });}
  };
  const handlechangeCommunication = (e, i) => {
    const { name, value } = e.target;
    const data = [...props.communication];

    data[i][name] = value;
    let status = false;
    let count = 0;
    if (name === "product_id")
      props.communication.map((ele) => {
        if (ele.product_id === value) count++;
      });
    if (count > 1) status = true;
    if (status) toast.error("Product name cannott be same");
    else props.setVendordata({ ...props.Vendordata, ["communication"]: data });
    // setInputList(data);
  };
  const handleEditSubmit=()=>{
    if(props.editType==="Additional"){
    if(props.Vendordata.assignmentNote==="")
    toast.error("Please fill all the mandatory fields");
    else{
      UpdateVendor(props.Vendordata).then((res)=>{
        if (res.status === 200) {
          toast.success("Data updated succsessfully");
          props.setVendorDetail({...props.vendorDetail,["assignmentNote"]:props.Vendordata.assignmentNote,new_Assignment: props.Vendordata.new_Assignment,
          qcRejection: props.Vendordata.qcRejection,
          dailyReminder: props.Vendordata.dailyReminder,
          profileReminder: props.Vendordata.profileReminder,})
          props.seteditModalOpen(prev=>!prev)
       
        } else {
          res.json().then((res) => toast.error(res));
        }
      })
    }}
    else{
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
        UpdateVendorcommunications(props.communication,props.selecetedVedorId).then((res)=>{
          if (res.status === 200) {
            toast.success("Data updated succsessfully");
            props.setVendorDetail({...props.vendorDetail,["communication"]:props.communication
            })
            props.seteditModalOpen(prev=>!prev)
         
          } else {
            res.json().then((res) => toast.error(res));
          }
        })
      }
    }
  }
 
  return (
    <>
      <div className={`${
          props.edit
            ? props.editType && props.editType === "Communication"
              ? "block"
              : "hidden"
            : "block"
        } py-1 mb-3`}>
        <span className="legend Btn_Gradient">Communication</span>
        <div className="  border-2 p-3  mb-2 rounded-xl bg-white relative border-sky-500">
          {props.communication.map((x, i) => {
            return (
              <>
                <div className={`flex flex-col md:flex-row gap-6 border-2 p-3  mb-1 rounded-xl items-center `}>
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
                        {props.communicationType&&props.communicationType.map((ele) => {
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
                 {!props.edit? <div className="flex">
                    {props.communication&&props.communication.length !== 1 &&
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
                    {props.communication&&props.communication.length - 1 === i && (
                      <IoMdAddCircle
                        onClick={handleAddClick}
                        color="green"
                        size={25}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>:''}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <span className={`${
          props.edit
            ? props.editType && props.editType === "Additional"
              ? "block"
              : "hidden"
            : "block"
        } legend Btn_Gradient`}>Additional Notification</span>
      <div className={`${
          props.edit
            ? props.editType && props.editType === "Additional"
              ? "block"
              : "hidden"
            : "block"
        }  flex-col md:flex-row gap-6 border-2 p-3  mb-2 rounded-xl bg-white relative border-sky-500`}>
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
                  ["new_Assignment"]: !props.Vendordata.new_Assignment,
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
                  ["qcRejection"]: !props.Vendordata.qcRejection,
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
                  ["dailyReminder"]: !props.Vendordata.dailyReminder,
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
                  ["profileReminder"]: !props.Vendordata.profileReminder,
                });
              }}
            />
          </FormGroup>
          <div
        className={`${
          props.edit
            ? props.editType && props.editType === "Additional"
              ? "flex"
              : "hidden"
            : "hidden"
        } gap-6 border-2 p-3  mb-2 rounded-xl bg-white relative border-sky-500`}
      >
        <div className=" w-full">
          <TextField
            id="assignment"
            label={
              <>
                Assignment Note <span className="text-red-600">*</span>
              </>
            }
            variant="outlined"
            size="small"
            multiline
            rows={2}
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
      </div>
      <Box
        sx={{
          display: props.edit ? "none" : "flex",
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
        <Button onClick={handleSubmit} variant="contained" sx={{ m: 1 }}>
          Next
        </Button>
      </Box>
      <Box
        sx={{
          display: props.edit ? "flex" : "none",
          flexDirection: "row",
          pt: 2,
          justifyContent: "end",
        }}
      >
        <Button onClick={handleEditSubmit} variant="contained" sx={{ m: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Com_notification;
