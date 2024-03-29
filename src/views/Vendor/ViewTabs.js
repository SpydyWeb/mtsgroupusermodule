import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ViewVendor from './ViewVendor';
import StepperForm from './StepperForm';
// import Footer from '../../Admin/Footer';
import { StepperFormCustomer } from '../Customer/StepperFormCustomer';
import { useLocation } from 'react-router-dom';
import TabPanel from '../Common/TabPanel';
import { a11yProps } from '../Common/renderutil';
import MainCard from 'ui-component/cards/MainCard';
const ViewTabs = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    useEffect(() => {
        setValue(0);
    }, [location]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        newValue;
    };
    return (
        <MainCard>
            <div className="content-wrapper">
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="View" {...a11yProps(0)} />
                        <Tab label="New" {...a11yProps(1)} />
                    </Tabs>
                </Box> */}
                <TabPanel value={value} index={0}>
                    <ViewVendor
                        setValue={(newValue) => setValue(newValue)}
                        formType={location.pathname === '/admin/viewvendor' ? 'vendor' : 'customer'}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {location.pathname === '/admin/viewvendor' ? (
                        <StepperForm />
                    ) : (
                        <>
                            <StepperFormCustomer />
                        </>
                    )}
                </TabPanel>
            </div>
            {/* <Footer /> */}
        </MainCard>
    );
};

export default ViewTabs;
