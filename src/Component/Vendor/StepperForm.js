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
import {
  GetVendorProduct,
  GetStateList,
  GetCommunicationTypeList,
  GetLicenceType,
} from "../../Services/Vendor";
const steps = [
  "Basic Vendor Details",
  "Vendor License",
  "Product/ Service",
  "Communication/ Notification",
];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [productdata, setProductdata] = useState([]);
  const [allstate, setAllState] = useState([]);
  const [communicationType, setCommunicaionType] = useState([]);
  const [licenceType, setLicenceType] = useState([]);
  const [productD, setProductD] = useState([]);
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
    communication: [
      {
        type: "",
        detail: "",
        product_id: 0,
      },
    ],
    product: [
      { id: "", name: "string", price: 0, productId: 0, selected: false },
    ],
  });
  useEffect(() => {
    GetVendorProduct().then((res) => {
      setProductdata(res);
      let data = [];
      res.map((ele) => {
        ele.subCategory.map((val) => {
          data.push({
            name: val.name,
            price: 0,
            productId: ele.id,
            selected: false,
            id: val.id,
          });
        });
      });

      setProductD(data);
    });
    GetStateList().then((res) => {
      setAllState(res);
    });
    GetCommunicationTypeList().then((res) => {
      setCommunicaionType(res);
    });
    GetLicenceType().then((res) => {
      setLicenceType(res);
    });
  }, []);

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
      <div className="flex text-red-600 justify-end">
        (*) fields are mandatory
      </div>
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
                allstate={allstate}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
              />
            ) : activeStep === 1 ? (
              <VendorLicense
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                activeStep={activeStep}
                licences={Vendordata.licences}
                setActiveStep={setActiveStep}
                licenceType={licenceType}
              />
            ) : activeStep === 2 ? (
              <VendorProduct
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                product={Vendordata.product}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                productdata={productdata}
                productD={productD}
                setProductD={setProductD}
                setProductdata={setProductdata}
              />
            ) : (
              <Com_notification
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                productD={productD}
                communicationType={communicationType}
                communication={Vendordata.communication}
              />
            )}
          </Typography>
        </React.Fragment>
      )}
    </Box>
  );
};

export default StepperForm;
