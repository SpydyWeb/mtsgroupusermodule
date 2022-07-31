import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import ViewVendor from "./ViewVendor";
import StepperForm from "./StepperForm";
import Footer from "../../Admin/Footer";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ViewTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="content-wrapper px-4 pt-2">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="View" {...a11yProps(0)} />
            <Tab label="New" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ViewVendor />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StepperForm />
        </TabPanel>
      </div>
      <Footer />
    </>
  );
};

export default ViewTabs;
