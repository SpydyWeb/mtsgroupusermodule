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
import StepperForm from "../Component/Vendor/StepperForm";
import "./Admin.css";
const VenderCreation = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper px-4 pt-5">
        <StepperForm />
      </div>
      <Footer />
    </>
  );
};

export default VenderCreation;
