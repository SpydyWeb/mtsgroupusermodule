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
    { firstname: "", lastname: "", licenseno: "", licensetype: "", status: "" },
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
        firstname: "",
        lastname: "",
        licenseno: "",
        licensetype: "",
        status: "",
      },
    ]);
  };
  return (
    <div className=" border-2 py-3 mb-3">
      {inputList.map((x, i) => {
        return (
          <>
            <div className="flex gap-6  py-3 mb-3">
              <div>
                <TextField
                  id="firstname"
                  label="First Name"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <TextField
                  id="lastname"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <TextField
                  id="Licence"
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
                    id="License_Type"
                    label="License Type"
                  >
                    <MenuItem value={10}>Select..</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <TextField
                  id="Status"
                  label="Status"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <Autocomplete
                  freeSolo
                  style={{ width: "300px" }}
                  id="free-solo-2-demo"
                  disableClearable
                  options={top100Films.map((option) => option.title)}
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
                  id="Expiry"
                  label="Expiry Date"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <TextField label="Issue Date" variant="outlined" size="small" />
              </div>
              <div>
                <TextField
                  id="cellphone"
                  label="Cell Phone"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="flex gap-6 py-3 mb-3">
              <div className=" w-full">
                <TextField
                  id="assignment"
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
                  id="assignment"
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
          </>
        );
      })}
    </div>
  );
};

export default VendorLicense;
