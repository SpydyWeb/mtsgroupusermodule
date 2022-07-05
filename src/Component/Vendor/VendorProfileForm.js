import React from "react";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
const VendorProfileForm = () => {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
  ];
  return (
    <div>
      <div className="flex gap-6 border-2 py-3 mb-3">
        <div>
          <TextField id="Id" label="ID" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="Name" label="Name" variant="outlined" size="small" />
        </div>
      </div>
      <div className="flex gap-6 border-2 py-3 mb-3">
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
          <TextField id="Suite" label="Suite" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="City" label="City" variant="outlined" size="small" />
        </div>
        <div>
          <FormControl className="w-40" size="small">
            <InputLabel>State</InputLabel>
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
          <TextField id="Zip" label="Zip" variant="outlined" size="small" />
        </div>
      </div>
      <div className="flex gap-6 border-2 py-3 mb-3">
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
          <TextField id="Suite" label="Suite" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="City" label="City" variant="outlined" size="small" />
        </div>
        <div>
          <FormControl className="w-40" size="small">
            <InputLabel>State</InputLabel>
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
          <TextField id="Zip" label="Zip" variant="outlined" size="small" />
        </div>
      </div>
      <div className="flex gap-6 border-2 py-3 mb-3">
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
            id="middleName"
            label="Middle Name"
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
          <TextField id="phone" label="Phone" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="ext" label="Ext" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="email" label="Email" variant="outlined" size="small" />
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
      <div className="flex gap-6 border-2 py-3 mb-3">
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
            id="middleName"
            label="Middle Name"
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
          <TextField id="phone" label="Phone" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="ext" label="Ext" variant="outlined" size="small" />
        </div>
        <div>
          <TextField id="email" label="Email" variant="outlined" size="small" />
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
      <div className="flex gap-6 border-2 py-3 mb-3">
        <div className=" w-full">
          <TextField
            id="assignment"
            label="Assignment Note"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default VendorProfileForm;
