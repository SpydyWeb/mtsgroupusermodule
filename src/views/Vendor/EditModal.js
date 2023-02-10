import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
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
    GetCommunicationTypeList
} from '../../servicesapi/Vendorapi';
import {
    GetCustomerProductDetaills,
    GetCustomerCommunicationbyid,
    GetCustomerAddressbyid,
    GetCustomerContactbyid,
    GetCustomerIntegrationDetailbyid
} from '../../servicesapi/Customerapi';
import Com_notification from './Com_notification';
import FileUpload from './FileUpload';
import { AiOutlineClose } from 'react-icons/ai';
import Userregister from './Userregister';
const EditModal = (props) => {
    const { vendorDetail, setVendorDetail, formType } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [Vendordata, setVendordata] = useState({});
    const [licences, setLicence] = useState(vendorDetail.licences);
    const [licenceType, setLicenceType] = useState([]);
    const [communicationType, setCommunicaionType] = useState([]);
    const [allstate, setAllState] = useState([]);
    const [productdata, setProductdata] = useState([]);
    const [productD, setProductD] = useState([]);
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
        if (props.editView === 0) {
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
            if (formType === 'vendor') {
                GetVendorCommunicationbyid(props.selecetedVedorId).then((res) => {
                    setCommunicaion(res);
                });
            } else {
                GetCustomerCommunicationbyid(props.selecetedVedorId).then((res) => {
                    setCommunicaion(res.data);
                });
            }
            GetCommunicationTypeList().then((res) => {
                setCommunicaionType(res);
            });
        } else if (props.editView === 2) {
            if (formType === 'vendor') {
                GetVendorAddressbyid(props.selecetedVedorId).then((res) => {
                    const data = {
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
                    setVendordata(data);
                });
            } else {
                GetCustomerAddressbyid(props.selecetedVedorId).then((res) => {
                    res = res.data;
                    const data = {
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
                    setVendordata(data);
                });
            }
        } else if (props.editView === 3) {
            if (formType === 'vendor') {
                GetVendorContactbyid(props.selecetedVedorId).then((res) => {
                    const data = {
                        primery_Contact: {
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
                        },
                        secondary_contact: {
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
                        }
                    };
                    setVendordata(data);
                });
            } else {
                GetCustomerContactbyid(props.selecetedVedorId).then((res) => {
                    res = res.data;
                    const data = {
                        primery_Contact: {
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
                        },
                        secondary_contact: {
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
                        }
                    };
                    setVendordata(data);
                });
            }
        } else if (props.editView === 4) {
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
        } else if (props.editView === 5) {
            if (formType === 'vendor') {
                GetLicenceType().then((res) => {
                    setLicenceType(res);
                });
            } else {
                let additional = vendorDetail.additionalDetail.length > 0 ? vendorDetail.additionalDetail : [''];
                vendorDetail['additionalDetail'] = additional;
            }
        } else {
            let data = [
                {
                    fileName: '',
                    location: '',
                    size: 0,
                    file: '',
                    type: '',
                    remarks: '',
                    issueDate: '',
                    expiryDate: ''
                }
            ];

            setVendordata({ ...Vendordata, ['productFiles']: data });
            console.log(data);
        }
    }, [props.editView]);
    return (
        <div>
            {props.editView === 0 ? (
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
                />
            ) : props.editView === 2 ? (
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
            ) : props.editView === 3 ? (
                <VendorProfileForm
                    Vendordata={Vendordata}
                    setVendordata={setVendordata}
                    allstate={allstate}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    edit={true}
                    editType="Contact"
                    selecetedVedorId={props.selecetedVedorId}
                    setVendorDetail={setVendorDetail}
                    vendorDetail={vendorDetail}
                    seteditModalOpen={props.seteditModalOpen}
                    editData={props.editData}
                    setEditData={props.setEditData}
                    setOpenTableView={props.setOpenTableView}
                    openTableView={props.openTableView}
                />
            ) : props.editView === 6 ? (
                <FileUpload
                    Vendordata={Vendordata}
                    setVendordata={setVendordata}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    productD={productD}
                    edit={true}
                    editData={props.editData}
                    setEditData={props.setEditData}
                />
            ) : props.editView === 4 ? (
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
            )}
            {/* </DialogContent> */}
            {/* </Dialog> */}
        </div>
    );
};

export default EditModal;
