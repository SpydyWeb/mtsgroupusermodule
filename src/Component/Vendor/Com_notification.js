import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Android12Switch from "./Android12Switch";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
const Com_notification = (props) => {
  const [inputList, setInputList] = useState([
    { type: "", detail: "", product: "" },
  ]);
  const [defaultinput, setDefaultInput] = useState({
    type: "",
    detail: "",
    product: "",
  });
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { type: "", detail: "", product: "" }]);
  };
  return (
    <>
      <div className="py-3 mb-3 ">
        <span className="legend Btn_Gradient">Communication</span>
        <div className="  border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
          <div className="flex border-2 gap-3 p-3  mb-1 rounded-xl">
            <div>Default</div>
            <div>
              <FormControl className="w-40" size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="type"
                  onChange={(e) => {
                    setDefaultInput({
                      ...defaultinput,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  value={defaultinput.type}
                  label="Age"
                >
                  <MenuItem value={10}>Select..</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                label="Detail"
                variant="outlined"
                size="small"
                name="detail"
                onChange={(e) => {
                  setDefaultInput({
                    ...defaultinput,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={defaultinput.detail}
              />
            </div>
          </div>
          {inputList.map((x, i) => {
            return (
              <>
                <div className="flex  flex-col md:flex-row gap-6 border-2 p-3  mb-1 rounded-xl ">
                  <div>Additional</div>
                  <div>
                    <FormControl className="w-40" size="small">
                      <InputLabel>Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                      >
                        <MenuItem value={10}>Select..</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField label="Detail" variant="outlined" size="small" />
                  </div>
                  <div>
                    <FormControl className="w-40" size="small">
                      <InputLabel>Product</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Product"
                      >
                        <MenuItem value={10}>Select..</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex">
                    {inputList.length !== 1 && (
                      <MdDelete
                        onClick={() => handleRemoveClick(i)}
                        color="red"
                        size={25}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {inputList.length - 1 === i && (
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
    </>
  );
};

export default Com_notification;
