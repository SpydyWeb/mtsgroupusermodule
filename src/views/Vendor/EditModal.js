import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Button } from '@mui/material';
import VendorProduct from './VendorProduct';
import VendorProfileForm from './VendorProfileForm';
import VendorLicense from './VendorLicense';
import {
    GetvendorProductbyid,
    GetVendorCommunicationbyid,
    GetStateList,
    GetVendorAddressbyid,
    GetVendorContactbyid,
    GetVendorLicencebyid,
    GetLicenceType,
    GetCommunicationTypeList,
    GetVendorFileById,
    GetVendorProduct
} from '../../servicesapi/Vendorapi';
import {
    GetCustomerProductDetaills,
    GetCustomerCommunicationbyid,
    GetCustomerAddressbyid,
    GetCustomerContactbyid,
    GetCustomerIntegrationDetailbyid,
    GetCustomerFileById,
    GetcommunicationLists
} from '../../servicesapi/Customerapi';
import Com_notification from './Com_notification';
import FileUpload from './FileUpload';
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai';
import Userregister from './Userregister';
import SubCard from 'ui-component/cards/SubCard';
import EandO from './EandO';
const EditModal = (props) => {
    const { vendorDetail, setVendorDetail, formType } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [errmsg, seterrmsg] = useState('');
    const [Vendordata, setVendordata] = useState({});
    const [licences, setLicence] = useState(vendorDetail.licences);
    const [licenceType, setLicenceType] = useState([]);
    const [communicationType, setCommunicaionType] = useState([]);
    const [allstate, setAllState] = useState([]);
    const [productdata, setProductdata] = useState([]);
    const [productD, setProductD] = useState([]);
    const [iseditdata, setiseditdata] = useState('');
    const [communicatioonMethod, setCommunicationMethod] = useState([]);
    const [communication, setCommunicaion] = useState([
        {
            type: '',
            detail: '',
            product_id: 0
        }
    ]);
    useEffect(() => {
        GetStateList().then((res) => {
            setAllState(res);
        });
        if (props.editView === 2) {
            if (formType === 'vendor') {
                GetvendorProductbyid(props.selecetedVedorId).then((res) => {
                    setProductdata(res);
                    setProductD(res);
                });
            } else {
                GetCustomerProductDetaills(props.selecetedVedorId).then((res) => {
                    setProductdata(res.data);
                    setProductD(res.data);
                });
            }
        } else if (props.editView === 1) {
            setProductD(vendorDetail.product);
            GetcommunicationLists().then((res) => {
                let data = res.data.communication_Method_Masters;
                setCommunicationMethod(data);
            });
            if (formType === 'vendor') {
                GetVendorCommunicationbyid(props.selecetedVedorId).then((res) => {
                    setCommunicaion(res);
                });
            } else {
                GetCustomerCommunicationbyid(props.selecetedVedorId).then((res) => {
                    console.log(res);
                    setCommunicaion(res.data);
                });
            }
            GetCommunicationTypeList().then((res) => {
                setCommunicaionType(res);
            });
        } else if (props.editView === 0) {
            if (formType === 'vendor') {
                let data;
                GetVendorAddressbyid(props.selecetedVedorId).then((res) => {
                    data = {
                        primery_Address: {
                            address: res[0].address,
                            city: res[0].city,
                            createdDate: res[0].createdDate,
                            id: res[0].id,
                            isDeleted: res[0].isDeleted,
                            pincode: res[0].pincode,
                            state: res[0].state,
                            suite: res[0].suite,
                            updateDate: res[0].updateDate
                        },
                        secondary_Address: {
                            address: res[1].address,
                            city: res[1].city,
                            createdDate: res[1].createdDate,
                            id: res[1].id,
                            isDeleted: res[1].isDeleted,
                            pincode: res[1].pincode,
                            state: res[1].state,
                            suite: res[1].suite,
                            updateDate: res[1].updateDate
                        }
                    };
                    GetVendorContactbyid(props.selecetedVedorId).then((res) => {
                        (data['primery_Contact'] = {
                            firstName: res[0].firstName,
                            middleName: res[0].middleName,
                            lastName: res[0].lastName,
                            phone: res[0].phone,
                            email: res[0].email,
                            ext: res[0].ext,
                            cellPhone: res[0].cellPhone,
                            id: res[0].id,
                            updateDate: res[0].updateDate,
                            createdDate: res[0].createdDate,
                            isDeleted: res[0].isDeleted
                        }),
                            (data['secondary_contact'] = {
                                firstName: res[1] !== null ? res[1].firstName : '',
                                middleName: res[1] !== null ? res[1].middleName : '',
                                lastName: res[1] !== null ? res[1].lastName : '',
                                phone: res[1] !== null ? res[1].phone : '',
                                email: res[1] !== null ? res[1].email : '',
                                ext: res[1] !== null ? res[1].ext : '',
                                cellPhone: res[1] !== null ? res[1].cellPhone : '',
                                id: res[1] !== null ? res[1].id : '',
                                updateDate: res[1] !== null ? res[1].updateDate : '',
                                createdDate: res[1] !== null ? res[1].createdDate : '',
                                isDeleted: res[1] !== null ? res[1].isDeleted : ''
                            });

                        setVendordata(data);
                    });
                });
            } else {
                let data;
                GetCustomerAddressbyid(props.selecetedVedorId).then((res) => {
                    res = res.data;
                    data = {
                        primery_Address: {
                            address: res[0].address,
                            city: res[0].city,
                            createdDate: res[0].createdDate,
                            id: res[0].id,
                            isDeleted: res[0].isDeleted,
                            pincode: res[0].pincode,
                            state: res[0].state,
                            suite: res[0].suite,
                            updateDate: res[0].updateDate
                        },
                        secondary_Address: {
                            address: res[1].address,
                            city: res[1].city,
                            createdDate: res[1].createdDate,
                            id: res[1].id,
                            isDeleted: res[1].isDeleted,
                            pincode: res[1].pincode,
                            state: res[1].state,
                            suite: res[1].suite,
                            updateDate: res[1].updateDate
                        }
                    };
                    GetCustomerContactbyid(props.selecetedVedorId).then((res) => {
                        res = res.data;
                        data['primery_Contact'] = {
                            firstName: res[0].firstName,
                            middleName: res[0].middleName,
                            lastName: res[0].lastName,
                            phone: res[0].phone,
                            email: res[0].email,
                            ext: res[0].ext,
                            cellPhone: res[0].cellPhone,
                            id: res[0].id,
                            updateDate: res[0].updateDate,
                            createdDate: res[0].createdDate,
                            isDeleted: res[0].isDeleted
                        };
                        data['secondary_contact'] = {
                            firstName: res.length === 1 ? res[1].firstName : '',
                            middleName: res.length === 1 ? res[1].middleName : '',
                            lastName: res.length === 1 ? res[1].lastName : '',
                            phone: res.length === 1 ? res[1].phone : '',
                            email: res.length === 1 ? res[1].email : '',
                            ext: res.length === 1 ? res[1].ext : '',
                            cellPhone: res.length === 1 ? res[1].cellPhone : '',
                            id: res.length === 1 ? res[1].id : '',
                            updateDate: res.length === 1 ? res[1].updateDate : '',
                            createdDate: res.length === 1 ? res[1].createdDate : '',
                            isDeleted: res.length === 1 ? res[1].isDeleted : ''
                        };
                        data['accountinfo'] = vendorDetail.customer_Account_Information;
                        setVendordata(data);
                    });
                });
            }
        } else if (props.editView === 3) {
            if (formType === 'vendor') {
                const data = {
                    id: props.selecetedVedorId,
                    profileReminder: vendorDetail.profileReminder,
                    dailyReminder: vendorDetail.dailyReminder,
                    qcRejection: vendorDetail.qcRejection,
                    new_Assignment: vendorDetail.new_Assignment,
                    assignmentNote: vendorDetail.assignmentNote
                };
                setVendordata(data);
            } else {
                const data = {
                    id: props.selecetedVedorId,
                    in_QC_Review: vendorDetail.in_QC_Review,
                    inspection: vendorDetail.inspection,
                    order_Confirmation: vendorDetail.order_Confirmation,
                    assignment: vendorDetail.assignment
                };
                setVendordata(data);
            }
        } else if (props.editView === 4) {
            if (formType === 'vendor') {
                GetLicenceType().then((res) => {
                    setLicenceType(res);
                });
            } else {
                let additional = vendorDetail.additionalDetail.length > 0 ? vendorDetail.additionalDetail : [''];
                vendorDetail['additionalDetail'] = additional;
            }
        } else {
            GetVendorProduct().then((res) => {
                let data = [];
                res.map((ele) => {
                    ele.subCategory.map((val) => {
                        data.push({
                            name: val.name,
                            price1: 0,
                            price2: 0,
                            price3: 0,
                            productId: ele.id,
                            selected: false,
                            id: val.id
                        });
                    });
                });
                setProductD(data);
            });
            if (formType === 'vendor') {
                GetVendorFileById(props.selecetedVedorId).then((res) => {
                    setVendordata({ ...Vendordata, ['productFiles']: res });
                    if (res.length === 0) {
                        setiseditdata(0);
                        seterrmsg('Data not found');
                    } else {
                        setiseditdata(res.length);
                        seterrmsg('');
                    }
                });
            } else {
                GetCustomerFileById(props.selecetedVedorId).then((res) => {
                    setVendordata({ ...Vendordata, ['productFiles']: res });
                    if (res.length === 0) {
                        setiseditdata(0);
                        seterrmsg('Data not found');
                    } else {
                        setiseditdata(res.length);
                        seterrmsg('');
                    }
                });
            }
        }
    }, [props.editView]);

    const renderComp = () => {
        return props.editView === 2 ? (
            productD.length > 0 ? (
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
                    setVendorDetail={setVendorDetail}
                    vendorDetail={vendorDetail}
                    edit={true}
                    selecetedVedorId={props.selecetedVedorId}
                    seteditModalOpen={props.seteditModalOpen}
                    editData={props.editData}
                    setEditData={props.setEditData}
                    setOpenTableView={props.setOpenTableView}
                    openTableView={props.openTableView}
                />
            ) : (
                <div>Loading...</div>
            )
        ) : props.editView === 1 ? (
            <Com_notification
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                productD={productD}
                communicationType={communicationType}
                communication={communication}
                edit={true}
                setCommunicaion={setCommunicaion}
                editType="Communication"
                selecetedVedorId={props.selecetedVedorId}
                seteditModalOpen={props.seteditModalOpen}
                setVendorDetail={setVendorDetail}
                vendorDetail={vendorDetail}
                editData={props.editData}
                setEditData={props.setEditData}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
                communicatioonMethod={communicatioonMethod}
            />
        ) : props.editView === 0 ? (
            <VendorProfileForm
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                allstate={allstate}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                edit={true}
                editData={props.editData}
                setEditData={props.setEditData}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
                editType="Address"
                selecetedVedorId={props.selecetedVedorId}
                setVendorDetail={setVendorDetail}
                vendorDetail={vendorDetail}
                seteditModalOpen={props.seteditModalOpen}
            />
        ) : props.editView === 5 ? (
            <FileUpload
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                productD={productD}
                edit={true}
                editData={props.editData}
                setEditData={props.setEditData}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
                selecetedVedorId={props.selecetedVedorId}
                errmsg={errmsg}
                iseditdata={iseditdata}
                formType={formType}
            />
        ) : props.editView === 6 ? (
            <EandO
                selecetedVedorId={props.selecetedVedorId}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
                editData={props.editData}
                setEditData={props.setEditData}
                edit={true}
            />
        ) : props.editView === 3 ? (
            <Com_notification
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                edit={true}
                editType="Additional"
                setVendorDetail={setVendorDetail}
                vendorDetail={vendorDetail}
                seteditModalOpen={props.seteditModalOpen}
                editData={props.editData}
                setEditData={props.setEditData}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
            />
        ) : formType === 'vendor' ? (
            <VendorLicense
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                activeStep={activeStep}
                licences={licences}
                setActiveStep={setActiveStep}
                licenceType={licenceType}
                edit={true}
                seteditModalOpen={props.seteditModalOpen}
                selecetedVedorId={props.selecetedVedorId}
                setVendorDetail={setVendorDetail}
                vendorDetail={vendorDetail}
                setLicence={setLicence}
                editData={props.editData}
                setEditData={props.setEditData}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
            />
        ) : (
            <Com_notification
                Vendordata={vendorDetail}
                setVendordata={setVendorDetail}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                edit={true}
                editType="IntegrationDetail"
                selecetedVedorId={props.selecetedVedorId}
                seteditModalOpen={props.seteditModalOpen}
                setVendorDetail={setVendorDetail}
                vendorDetail={vendorDetail}
                editData={props.editData}
                setEditData={props.setEditData}
                setOpenTableView={props.setOpenTableView}
                openTableView={props.openTableView}
            />
        );
    };
    return (
        <>
            {' '}
            <SubCard
                title={
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '21px' }}>{props.TabLabelName[props.TabValue]} Information</Box>
                        {!props.editData ? (
                            <Button
                                size="small"
                                onClick={() => props.setEditData(!props.editData)}
                                variant="contained"
                                color="error"
                                sx={{ m: 1 }}
                            >
                                Cancel
                            </Button>
                        ) : (
                            <Button
                                size="small"
                                onClick={() => {
                                    console.log(props.TabValue);
                                    if (props.TabValue === 6) {
                                        if (Vendordata.productFiles.length === 0) {
                                            let data = [
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
                                            ];
                                            setVendordata({ ...Vendordata, ['productFiles']: data });
                                        }
                                    }
                                    props.setEditData(!props.editData);
                                }}
                                variant="contained"
                                sx={{ m: 1 }}
                            >
                                <AiFillEdit /> Edit {props.TabLabelName[props.TabValue]}
                            </Button>
                        )}
                    </Box>
                }
            >
                {renderComp()}
            </SubCard>
        </>
    );
};

export default EditModal;
