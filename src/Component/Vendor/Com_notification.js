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
const Com_notification = () => {
  const [inputList, setInputList] = useState([
    { type: "", detail: "", product: "" },
  ]);
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
      <div className="border-2 py-3 mb-3 ">
        <div className="flex gap-6 py-3 mb-3 ">
          <h4>default</h4>
          <div>
            <FormControl className="w-40" size="small">
              <InputLabel>Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Select..</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField label="Detail" variant="outlined" size="small" />
          </div>
        </div>
        {inputList.map((x, i) => {
          return (
            <div className="flex gap-6 py-3 mb-3 ">
              <h4>Additional</h4>

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
          );
        })}
      </div>
      <div className="flex flex-col gap-6 border-2 py-3 mb-3">
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="New Assignment"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="QC Rejection"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="Daily Reminder"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Android12Switch />}
              label="Profile Reminder"
            />
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default Com_notification;
