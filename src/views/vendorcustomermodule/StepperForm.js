import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Grid, Stack } from '@mui/material';
// import { GetVendorProduct, GetStateList, GetCommunicationTypeList } from '../../Services/Vendor';
// import VendorProduct from '../Vendor/VendorProduct';
// import VendorProfileForm from '../Vendor/VendorProfileForm';
// import Com_notification from '../Vendor/Com_notification';
// import Userregister from '../Vendor/Userregister';

import ProfileForm from './ProfileForm';
import { stepslabel, initailCustomerStateForm } from './utilities';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveStep } from 'store/action/actions';
import ProductForm from './ProductForm';
import { getProductdata } from 'store/action/vendorAction';
export const StepperForm = () => {
    const { customization, VendorData } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [allstate, setAllState] = useState([]);
    const [productdata, setProductdata] = useState([]);
    const [productD, setProductD] = useState([]);
    const [communicationType, setCommunicaionType] = useState([]);
    const [fileupload, setfileuploadt] = useState();
    const [customerData, setCustomerData] = useState(initailCustomerStateForm);
    useEffect(() => {
        if (customization.activeStep === 1) {
            dispatch(getProductdata());
        }
    }, [customization.activeStep]);
    // useEffect(() => {
    //     GetStateList().then((res) => {
    //         setAllState(res);
    //     });
    //     GetCommunicationTypeList().then((res) => {
    //         setCommunicaionType(res);
    //     });
    //     GetVendorProduct().then((res) => {
    //         setProductdata(res);
    //         let data = [];
    //         res.map((ele) => {
    //             ele.subCategory.map((val) => {
    //                 data.push({
    //                     name: val.name,
    //                     price: 0,
    //                     productId: ele.id,
    //                     selected: false,
    //                     id: val.id
    //                 });
    //             });
    //         });

    //         setProductD(data);
    //     });
    // }, []);
    const handleNext = () => {
        dispatch(setActiveStep(customization.activeStep + 1));
        console.log(customization.activeStep);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={customization.activeStep}>
                {stepslabel[customization.isOpen[0]].map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Box textAlign={'end'} color={'red'}>
                (*) fields are mandatory
            </Box>

            <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {customization.activeStep === 0 ? (
                        <ProfileForm Vendordata={customerData} setVendordata={setCustomerData} allstate={allstate} />
                    ) : (
                        <ProductForm ProductData={VendorData.ProductData} />
                    )}
                    {/* {activeStep === 0 ? ( */}

                    {/* ) : activeStep === 1 ? (
                        <VendorProduct
                            Vendordata={customerData}
                            setVendordata={setCustomerData}
                            product={customerData.product}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                            productdata={productdata}
                            productD={productD}
                            setProductD={setProductD}
                            setProductdata={setProductdata}
                            setfileuploadt={setfileuploadt}
                        />
                    ) : activeStep === 2 ? (
                        <Com_notification
                            Vendordata={customerData}
                            setVendordata={setCustomerData}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                            productD={productD}
                            communicationType={communicationType}
                            communication={customerData.communication}
                            edit={false}
                        />
                    ) : activeStep === 3 ? (
                        <Userregister
                            Vendordata={customerData}
                            setVendordata={setCustomerData}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                            Userregister={customerData.userregistration}
                            fileupload={fileupload}
                        />
                    ) : (
                        '' */}
                    {/* )} */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                            justifyContent: 'end'
                        }}
                    >
                        <Button
                            color="inherit"
                            onClick={() => dispatch(setActiveStep(customization.activeStep - 1))}
                            disabled={customization.activeStep === 0}
                            variant="contained"
                            sx={{ m: 1 }}
                        >
                            Back
                        </Button>

                        <Button onClick={() => handleNext()} variant="contained" sx={{ m: 1 }}>
                            Next
                        </Button>
                    </Box>
                </Typography>
            </React.Fragment>
        </Box>
    );
};
export default StepperForm;
