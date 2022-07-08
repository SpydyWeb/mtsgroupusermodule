import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
const VendorLicense = () => {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
  ];
  const [inputList, setInputList] = useState([
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
  ]);
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
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
    ]);
  };
  return (
    <div className=" border-2 py-3 mb-3 border-sky-500 p-3 rounded-xl">
      {inputList.map((x, i) => {
        return (
          <>
            <div className="flex flex-col">
              <div className="flex gap-6 flex-col md:flex-row  py-3 mb-3">
                <div>
                  <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <TextField
                    name="licenceNo"
                    label="Licence No."
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <FormControl className="w-40" size="small">
                    <InputLabel>License Type</InputLabel>
                    <Select
                      labelId="License_Type"
                      name="licenceType"
                      label="License Type"
                    >
                      <MenuItem value={10}>Select..</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    name="status"
                    label="Status"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6  py-3 mb-3">
                <div>
                  <Autocomplete
                    freeSolo
                    style={{ minWidth: "300px" }}
                    disableClearable
                    options={top100Films.map((option) => option.title)}
                    inputValue={inputList.address}
                    onInputChange={(event, newInputValue) => {
                      setInputList([
                        {
                          ...inputList,
                          name: newInputValue,
                        },
                      ]);
                    }}
                    name="address"
                    onChange={(e) => {
                      setInputList([
                        {
                          ...inputList,
                          name: e.target.value,
                        },
                      ]);
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
                    label="Expiry Date"
                    name="expiry_Date"
                    type="date"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div>
                  <TextField
                    label="Issue Date"
                    name="issueDate"
                    type="date"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 py-3 mb-3">
                <div className=" w-full">
                  <TextField
                    name="disciplinaryAction"
                    label="Disciplinary/ Other Actions"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </div>
                <div className=" w-full">
                  <TextField
                    name="assignnotement"
                    label="Note"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </div>
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
  );
};

export default VendorLicense;
