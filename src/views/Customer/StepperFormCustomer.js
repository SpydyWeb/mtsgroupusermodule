import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { GetVendorProduct, GetStateList, GetCommunicationTypeList } from '../../servicesapi/Vendorapi';
import VendorProduct from '../Vendor/VendorProduct';
import VendorProfileForm from '../Vendor/VendorProfileForm';
import Com_notification from '../Vendor/Com_notification';
import Userregister from '../Vendor/Userregister';
import FileUpload from 'views/Vendor/FileUpload';
import { GetcommunicationLists } from 'servicesapi/Customerapi';
const steps = ['Basic Customer Details', 'Product/ Service', 'Communication/ Notification', 'Upload Documents', 'User Registration'];
export const StepperFormCustomer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [allstate, setAllState] = useState([]);
    const [productdata, setProductdata] = useState([]);
    const [productD, setProductD] = useState([]);
    const [communicationType, setCommunicaionType] = useState([]);
    const [fileupload, setfileuploadt] = useState();
    const [communicatioonMethod, setCommunicationMethod] = useState([]);
    const [customerData, setCustomerData] = useState({
        customerId: '',
        name: '',
        parent: '',
        client_type: '',
        timezone: '',
        primery_Address: {
            address: '',
            city: '',
            suite: '',
            state: '',
            pincode: ''
        },
        secondary_Address: {
            address: '',
            city: '',
            suite: '',
            state: '',
            pincode: ''
        },
        primery_Contact: {
            firstName: '',
            middleName: '',
            lastName: '',
            phone: '',
            email: '',
            ext: '',
            cellPhone: ''
        },
        secondary_contact: {
            firstName: '',
            middleName: '',
            lastName: '',
            phone: '',
            email: '',
            ext: '',
            cellPhone: ''
        },
        order_Confirmation: false,
        assignment: false,
        inspection: false,
        in_QC_Review: false,
        uploadedfile: 'string',
        communication: [
            {
                vendorId: 0,
                type: '',
                detail: '',
                product_id: 0,
                customerId: 0,
                method: ''
            }
        ],
        product: [
            {
                id: 0,
                name: 'string',
                price1: 0,
                price2: 0,
                price3: 0,
                productId: 0,
                selected: true,
                subCategory: [null]
            }
        ],
        additionalDetail: [''],
        customer_Integration_details: {
            detail: '',
            port: '',
            login: '',
            password: '',
            customerId: 0
        },
        registerId: [],
        accountinfo: {
            billing_Code: '',
            billing_Name: '',
            tax_Id: '',
            custom_Field1: '',
            custom_Field2: '',
            profile_Note: ''
        },
        productFiles: [
            {
                fileName: '',
                location: '',
                size: 0,
                file: '',
                type: '',
                remarks: '',
                issueDate: '',
                expiryDate: '',
                fileid: 0
            }
        ]
    });
    useEffect(() => {
        GetStateList().then((res) => {
            setAllState(res);
        });
        GetcommunicationLists().then((res) => {
            let data = res.data.communication_Method_Masters;
            setCommunicationMethod(data);
        });
        GetCommunicationTypeList().then((res) => {
            setCommunicaionType(res);
        });
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
                        id: val.id
                    });
                });
            });

            setProductD(data);
        });
    }, []);
    return (
        <Box sx={{ width: '100%' }}>
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
            <div className="flex text-red-600 justify-end">(*) fields are mandatory</div>

            <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {activeStep === 0 ? (
                        <VendorProfileForm
                            Vendordata={customerData}
                            setVendordata={setCustomerData}
                            allstate={allstate}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                            edit={false}
                        />
                    ) : activeStep === 1 ? (
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
                            communicatioonMethod={communicatioonMethod}
                        />
                    ) : activeStep === 3 ? (
                        <FileUpload
                            Vendordata={customerData}
                            setVendordata={setCustomerData}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                            productD={productD}
                            edit={false}
                        />
                    ) : activeStep === 4 ? (
                        <Userregister
                            Vendordata={customerData}
                            setVendordata={setCustomerData}
                            setActiveStep={setActiveStep}
                            activeStep={activeStep}
                            Userregister={customerData.userregistration}
                            fileupload={fileupload}
                        />
                    ) : (
                        ''
                    )}
                </Typography>
            </React.Fragment>
        </Box>
    );
};
