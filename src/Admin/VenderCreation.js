import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import {
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import "./Admin.css";
const VenderCreation = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper px-4 pt-5">
        <span className="legend Btn_Gradient">Profile Details</span>
        <div className="flex gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
          <div>
            <TextField id="Id" label="ID" variant="outlined" size="small" />
          </div>
          <div>
            <TextField id="Name" label="Name" variant="outlined" size="small" />
          </div>
        </div>
        {/* Primary AddressPrimary Address */}
        <span className="legend Btn_Gradient">Primary Address</span>
        <div className="flex flex-col gap-6 border-2 p-3 mb-10 rounded-xl bg-white relative border-sky-500">
          <div>
            <TextField
              id="Search"
              label="Search"
              variant="outlined"
              size="small"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-x-6">
            <div>
              <TextField
                id="Address"
                label="Address"
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <TextField
                id="Suit"
                label="Suit"
                variant="outlined"
                size="small"
              />
            </div>

            <div>
              <TextField
                id="City"
                label="City"
                variant="outlined"
                size="small"
              />
            </div>

            <div>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField id="Zip" label="Zip" variant="outlined" size="small" />
            </div>
          </div>
        </div>

        {/* Address Address */}
        <span className="legend bg-slate-400">Billing Address</span>
        <div className="flex flex-col gap-6 border-2 p-3 mb-3 rounded-xl bg-white relative border-sky-500">
          <div>
            <TextField
              id="Search"
              label="Search"
              variant="outlined"
              size="small"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-x-6">
            <div>
              <TextField
                id="Address"
                label="Address"
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <TextField
                id="Suit"
                label="Suit"
                variant="outlined"
                size="small"
              />
            </div>

            <div>
              <TextField
                id="City"
                label="City"
                variant="outlined"
                size="small"
              />
            </div>

            <div>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField id="Zip" label="Zip" variant="outlined" size="small" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VenderCreation;
