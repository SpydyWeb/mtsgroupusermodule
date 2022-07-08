import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VendorProfileForm from "./VendorProfileForm";
import VendorProduct from "./VendorProduct";
import VendorLicense from "./VendorLicense";
import Com_notification from "./Com_notification";
import { GetVendorProduct } from "../../Services/Vendor";
const steps = [
  "Basic Vendor Details",
  "Vendor License",
  "Product/ Service",
  "Communication/ Notification",
];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [product, setProduct] = useState([]);
  const [Vendordata, setVendordata] = useState({
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
        id: 0,
        updateDate: "2022-07-06T18:45:05.462Z",
        createdDate: "2022-07-06T18:45:05.462Z",
        isDeleted: true,
        firstName: "string",
        lastName: "string",
        licenceNo: "string",
        licenceType: "string",
        status: "string",
        address: "string",
        expiry_Date: "2022-07-06T18:45:05.462Z",
        issueDate: "2022-07-06T18:45:05.462Z",
        disciplinaryAction: "string",
        note: "string",
      },
    ],
    communication: [
      {
        id: 0,
        updateDate: "2022-07-06T18:45:05.462Z",
        createdDate: "2022-07-06T18:45:05.462Z",
        isDeleted: true,
        vendorId: 0,
        type: "string",
        detail: "string",
        product: "string",
      },
    ],
    product: [
      {
        id: 0,
        name: "string",
        price: 0,
        productId: 0,
        subCategory: [null],
      },
    ],
  });
  useEffect(() => {
    GetVendorProduct().then((res) => {
      setProduct(res);
    });
  }, []);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 ? (
              <VendorProfileForm
                Vendordata={Vendordata}
                setVendordata={setVendordata}
              />
            ) : activeStep === 1 ? (
              <VendorLicense
                Vendordata={Vendordata}
                setVendordata={setVendordata}
              />
            ) : activeStep === 2 ? (
              <VendorProduct
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                product={product}
              />
            ) : (
              <Com_notification
                Vendordata={Vendordata}
                setVendordata={setVendordata}
              />
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              sx={{ m: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} variant="contained" sx={{ m: 1 }}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default StepperForm;
