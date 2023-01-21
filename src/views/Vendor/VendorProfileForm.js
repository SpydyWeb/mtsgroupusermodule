import React, { useState } from 'react';
import { TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl, Box, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { Checkexistingid, UpdateVendorAddress, UpdateVendorContact } from '../../servicesapi/Vendorapi';
import ToolTipValidation from '../Validation/ToolTipValidation';
import { PhonenoMask } from '../Common/renderutil';
import { useLocation } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { UpdateCustomerAddress, UpdateCustomerContact } from '../../servicesapi/Customerapi';
const VendorProfileForm = (props) => {
    const location = useLocation();
    const [formType, setFormType] = useState(location.pathname === '/admin/viewvendor' ? 'vendor' : 'customer');
    const top100Films = [{ label: '', year: 1994 }];
    const [tooltip, setTooltip] = useState({ isshow: false, valid: false });
    const handleNext = () => {
        if (
            props.Vendordata.vendorId === '' ||
            props.Vendordata.name === '' ||
            props.Vendordata.primery_Address.address === '' ||
            props.Vendordata.primery_Address.city === '' ||
            props.Vendordata.primery_Address.state === '' ||
            props.Vendordata.primery_Address.pincode === '' ||
            props.Vendordata.secondary_Address.address === '' ||
            props.Vendordata.secondary_Address.city === '' ||
            props.Vendordata.secondary_Address.state === '' ||
            props.Vendordata.secondary_Address.pincode === '' ||
            props.Vendordata.primery_Contact.firstName === '' ||
            props.Vendordata.primery_Contact.lastName === '' ||
            props.Vendordata.primery_Contact.phone === '' ||
            props.Vendordata.primery_Contact.email === '' ||
            props.Vendordata.primery_Contact.cellPhone === '' ||
            (props.Vendordata.assignmentNote && props.Vendordata.assignmentNote === '' && formType === 'vendor') ||
            (props.Vendordata.parent && props.Vendordata.parent === '' && formType === 'customer')
        )
            toast.error('Please fill all the mandatory fields');
        else props.setActiveStep((prev) => prev + 1);
    };
    const checkUserId = (id) => {
        Checkexistingid(id).then((res) => {
            if (res.status === 200 && id.length > 3) {
                res.json().then((res1) => {
                    setTooltip({
                        isshow: true,
                        valid: res1
                    });
                });
            } else {
                setTooltip({
                    isshow: true,
                    valid: false
                });
            }
        });
    };
    const handleEditSubmit = () => {
        if (props.editType === 'Address') {
            if (
                props.Vendordata.primery_Address.address === '' ||
                props.Vendordata.primery_Address.city === '' ||
                props.Vendordata.primery_Address.state === '' ||
                props.Vendordata.primery_Address.pincode === '' ||
                props.Vendordata.secondary_Address.address === '' ||
                props.Vendordata.secondary_Address.city === '' ||
                props.Vendordata.secondary_Address.state === '' ||
                props.Vendordata.secondary_Address.pincode === ''
            )
                toast.error('Please fill all the mandatory fields');
            else {
                let data = [];
                data.push(props.Vendordata.primery_Address);
                data.push(props.Vendordata.secondary_Address);
                if (formType === 'vendor') {
                    UpdateVendorAddress(data, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Address Updated Succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['primery_Address']: props.Vendordata.primery_Address,
                                ['secondary_Address']: props.Vendordata.secondary_Address
                            });
                            props.setEditData(!props.editData);
                            props.seteditModalOpen((prev) => !prev);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                } else {
                    delete data[0].updateDate;
                    delete data[0].createdDate;
                    delete data[1].updateDate;
                    delete data[1].createdDate;
                    UpdateCustomerAddress(data, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Address Updated Succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['primery_Address']: props.Vendordata.primery_Address,
                                ['secondary_Address']: props.Vendordata.secondary_Address
                            });
                            props.seteditModalOpen((prev) => !prev);
                            props.setEditData(!props.editData);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                }
            }
        } else if (props.editType === 'Contact') {
            if (
                props.Vendordata.primery_Contact.firstName === '' ||
                props.Vendordata.primery_Contact.lastName === '' ||
                props.Vendordata.primery_Contact.phone === '' ||
                props.Vendordata.primery_Contact.email === '' ||
                props.Vendordata.primery_Contact.cellPhone === ''
            )
                toast.error('Please fill all the mandatory fields');
            else {
                let data = [];
                data.push(props.Vendordata.primery_Contact);
                data.push(props.Vendordata.secondary_contact);
                let contactData = data;
                if (contactData[1].firstName === '') {
                    contactData = new Array(contactData[0]);
                } else {
                    delete contactData[1]['id'];
                    delete contactData[1]['updateDate'];
                    delete contactData[1]['createdDate'];
                    delete contactData[1]['isDeleted'];
                }
                if (formType === 'vendor') {
                    UpdateVendorContact(contactData, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Contact updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['primery_Contact']: props.Vendordata.primery_Contact,
                                ['secondary_contact']: props.Vendordata.secondary_contact
                            });
                            props.setEditData(!props.editData);
                            props.seteditModalOpen((prev) => !prev);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                } else {
                    // if(data[1].firstName===""){
                    //   let temp=data;
                    //   data=[]
                    //   data.push(temp[0])
                    //             }
                    UpdateCustomerContact(contactData, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Contact updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['primery_Contact']: props.Vendordata.primery_Contact,
                                ['secondary_contact']: props.Vendordata.secondary_contact
                            });
                            props.setEditData(!props.editData);
                            props.seteditModalOpen((prev) => !prev);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                }
            }
        }
    };
    return (
        <div className="mt-3">
            <span className="legend Btn_Gradient">Profile Details</span>
            <div
                style={{ marginBottom: '20px' }}
                className={`${
                    props.edit ? (props.editType && props.editType === 'Profile' ? 'flex' : 'hidden') : 'flex'
                } flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
            >
                <div>
                    <TextField
                        id="Id"
                        label={
                            <>
                                ID <span className="text-red-600">*</span>
                            </>
                        }
                        value={formType === 'vendor' ? props.Vendordata.vendorId : props.Vendordata.customerId}
                        name={formType === 'vendor' ? 'vendorId' : 'customerId'}
                        onChange={(e) => {
                            if (e.target.value.length > 3 && e.target.value.length != 11) {
                                checkUserId(e.target.value);
                            }
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                [e.target.name]: e.target.value
                            });
                        }}
                        onBlur={(e) => {
                            if (tooltip.valid && e.target.value.length > 3)
                                setTooltip({
                                    isshow: false,
                                    valid: true
                                });
                        }}
                        variant="outlined"
                        size="small"
                    />
                    {tooltip.isshow && props.Vendordata.vendorId !== '' ? (
                        <ToolTipValidation isValid={tooltip.valid} validMessage="Correct" invalidMessage={'Vendor ID already exist'} />
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    <TextField
                        label={
                            <>
                                Name <span className="text-red-600">*</span>
                            </>
                        }
                        value={props.Vendordata && props.Vendordata.name ? props.Vendordata.name : ''}
                        name="name"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                [e.target.name]: e.target.value
                            });
                        }}
                        variant="outlined"
                        size="small"
                    />
                </div>
                {formType === 'customer' ? (
                    <div>
                        <TextField
                            label={
                                <>
                                    parent <span className="text-red-600">*</span>
                                </>
                            }
                            value={props.Vendordata && props.Vendordata.parent ? props.Vendordata.parent : ''}
                            name="parent"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    [e.target.name]: e.target.value
                                });
                            }}
                            variant="outlined"
                            size="small"
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <span
                className={`${
                    props.edit ? (props.editType && props.editType === 'Address' ? 'flex' : 'hidden') : 'flex'
                } legend Btn_Gradient`}
            >
                Primary Address
            </span>
            <div
                style={{ marginBottom: '20px' }}
                className={`${
                    props.edit ? (props.editType && props.editType === 'Address' ? 'flex' : 'hidden') : 'flex'
                } flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
            >
                <div>
                    <Autocomplete
                        freeSolo
                        disabled={props.editData}
                        style={{ minWidth: '300px' }}
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films}
                        inputValue={
                            props.Vendordata && props.Vendordata.primery_Address && props.Vendordata.primery_Address.address
                                ? props.Vendordata.primery_Address.address
                                : ''
                        }
                        onInputChange={(event, newInputValue) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Address']: {
                                    ...props.Vendordata.primery_Address,
                                    ['address']: newInputValue
                                }
                            });
                        }}
                        name="address"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Address']: {
                                    ...props.Vendordata.primery_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={
                                    <>
                                        Address <span className="text-red-600">*</span>
                                    </>
                                }
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'text'
                                }}
                                size="small"
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        id="Suite"
                        label={<>Suite</>}
                        disabled={props.editData}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Address && props.Vendordata.primery_Address.suite
                                ? props.Vendordata.primery_Address.suite
                                : ''
                        }
                        name="suite"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Address']: {
                                    ...props.Vendordata.primery_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="City"
                        disabled={props.editData}
                        label={
                            <>
                                City <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Address && props.Vendordata.primery_Address.city
                                ? props.Vendordata.primery_Address.city
                                : ''
                        }
                        name="city"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Address']: {
                                    ...props.Vendordata.primery_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <FormControl sx={{ width: '150px' }} fullWidth={true} size="small">
                        <InputLabel>
                            State <span className="text-red-600">*</span>
                        </InputLabel>
                        <Select
                            disabled={props.editData}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={
                                props.Vendordata && props.Vendordata.primery_Address && props.Vendordata.primery_Address.state
                                    ? props.Vendordata.primery_Address.state
                                    : ''
                            }
                            name="state"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['primery_Address']: {
                                        ...props.Vendordata.primery_Address,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        >
                            {props.allstate.map((ele, indx) => {
                                return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="Zip"
                        disabled={props.editData}
                        label={
                            <>
                                Zip <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Address && props.Vendordata.primery_Address.pincode
                                ? props.Vendordata.primery_Address.pincode
                                : ''
                        }
                        inputProps={{ maxLength: 5 }}
                        name="pincode"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Address']: {
                                    ...props.Vendordata.primery_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
            </div>
            <span
                className={`${
                    props.edit ? (props.editType && props.editType === 'Address' ? 'flex' : 'hidden') : 'flex'
                } legend Btn_Gradient`}
            >
                Billing Address
            </span>
            <div
                style={{ marginBottom: '20px' }}
                className={`${
                    props.edit ? (props.editType && props.editType === 'Address' ? 'flex' : 'hidden') : 'flex'
                } flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
            >
                <div>
                    <Autocomplete
                        freeSolo
                        style={{ minWidth: '300px' }}
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films}
                        inputValue={
                            props.Vendordata && props.Vendordata.secondary_Address && props.Vendordata.secondary_Address.address
                                ? props.Vendordata.secondary_Address.address
                                : ''
                        }
                        onInputChange={(event, newInputValue) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_Address']: {
                                    ...props.Vendordata.secondary_Address,
                                    ['address']: newInputValue
                                }
                            });
                        }}
                        name="address"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_Address']: {
                                    ...props.Vendordata.secondary_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                        disabled={props.editData}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={
                                    <>
                                        Address <span className="text-red-600">*</span>
                                    </>
                                }
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'text'
                                }}
                                size="small"
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField
                        id="Suite"
                        label={<>Suite</>}
                        disabled={props.editData}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_Address && props.Vendordata.secondary_Address.suite
                                ? props.Vendordata.secondary_Address.suite
                                : ''
                        }
                        name="suite"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_Address']: {
                                    ...props.Vendordata.secondary_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        disabled={props.editData}
                        id="City"
                        label={
                            <>
                                City <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_Address && props.Vendordata.secondary_Address.city
                                ? props.Vendordata.secondary_Address.city
                                : ''
                        }
                        name="city"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_Address']: {
                                    ...props.Vendordata.secondary_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <FormControl sx={{ width: '150px' }} fullWidth={true} size="small">
                        <InputLabel>
                            State <span className="text-red-600">*</span>
                        </InputLabel>
                        <Select
                            disabled={props.editData}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={
                                props.Vendordata && props.Vendordata.secondary_Address && props.Vendordata.secondary_Address.state
                                    ? props.Vendordata.secondary_Address.state
                                    : ''
                            }
                            name="state"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['secondary_Address']: {
                                        ...props.Vendordata.secondary_Address,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        >
                            {props.allstate.map((ele, indx) => {
                                return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="Zip"
                        disabled={props.editData}
                        label={
                            <>
                                Zip <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_Address && props.Vendordata.secondary_Address.pincode
                                ? props.Vendordata.secondary_Address.pincode
                                : ''
                        }
                        inputProps={{ maxLength: 5 }}
                        name="pincode"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_Address']: {
                                    ...props.Vendordata.secondary_Address,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
            </div>
            <span
                className={`${
                    props.edit ? (props.editType && props.editType === 'Contact' ? 'flex' : 'hidden') : 'flex'
                } legend Btn_Gradient`}
            >
                Primary Contact
            </span>
            <div
                style={{ marginBottom: '20px' }}
                className={`${
                    props.edit ? (props.editType && props.editType === 'Contact' ? 'flex' : 'hidden') : 'flex'
                }  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
            >
                <div>
                    <TextField
                        id="firstname"
                        disabled={props.editData}
                        label={
                            <>
                                First Name <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.firstName
                                ? props.Vendordata.primery_Contact.firstName
                                : ''
                        }
                        name="firstName"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Contact']: {
                                    ...props.Vendordata.primery_Contact,
                                    [e.target.name]: e.target.value.replace(/[^a-z]/gi, '')
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="middleName"
                        disabled={props.editData}
                        label={<>Middle Name</>}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.middleName
                                ? props.Vendordata.primery_Contact.middleName
                                : ''
                        }
                        name="middleName"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Contact']: {
                                    ...props.Vendordata.primery_Contact,
                                    [e.target.name]: e.target.value.replace(/[^a-z]/gi, '')
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="lastname"
                        disabled={props.editData}
                        label={
                            <>
                                Last Name <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.lastName
                                ? props.Vendordata.primery_Contact.lastName
                                : ''
                        }
                        name="lastName"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Contact']: {
                                    ...props.Vendordata.primery_Contact,
                                    [e.target.name]: e.target.value.replace(/[^a-z]/gi, '')
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="phone"
                        disabled={props.editData}
                        label={
                            <>
                                Phone<span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        InputProps={{
                            inputComponent: PhonenoMask,
                            value:
                                props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.phone
                                    ? props.Vendordata.primery_Contact.phone
                                    : '',
                            onChange: (e) =>
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['primery_Contact']: {
                                        ...props.Vendordata.primery_Contact,
                                        [e.target.name]: e.target.value
                                    }
                                })
                        }}
                        name="phone"
                    />
                </div>
                <div>
                    <TextField
                        id="ext"
                        disabled={props.editData}
                        label={<>Ext</>}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.ext
                                ? props.Vendordata.primery_Contact.ext
                                : ''
                        }
                        name="ext"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Contact']: {
                                    ...props.Vendordata.primery_Contact,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        disabled={props.editData}
                        label={
                            <>
                                Email <span className="text-red-600">*</span>
                            </>
                        }
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.email
                                ? props.Vendordata.primery_Contact.email
                                : ''
                        }
                        name="email"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['primery_Contact']: {
                                    ...props.Vendordata.primery_Contact,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="cellphone"
                        disabled={props.editData}
                        label={
                            <>
                                Cell Phone <span className="text-red-600">*</span>
                            </>
                        }
                        InputProps={{
                            inputComponent: PhonenoMask,
                            value:
                                props.Vendordata && props.Vendordata.primery_Contact && props.Vendordata.primery_Contact.cellPhone
                                    ? props.Vendordata.primery_Contact.cellPhone
                                    : '',
                            onChange: (e) =>
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['primery_Contact']: {
                                        ...props.Vendordata.primery_Contact,
                                        [e.target.name]: e.target.value
                                    }
                                })
                        }}
                        variant="outlined"
                        size="small"
                        name="cellPhone"
                    ></TextField>
                </div>
            </div>
            <span
                className={`${
                    props.edit ? (props.editType && props.editType === 'Contact' ? 'flex' : 'hidden') : 'flex'
                } legend Btn_Gradient`}
            >
                Additional Contact
            </span>
            <div
                style={{ marginBottom: '20px' }}
                className={`${
                    props.edit ? (props.editType && props.editType === 'Contact' ? 'flex' : 'hidden') : 'flex'
                }  flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
            >
                <div>
                    <TextField
                        id="firstname"
                        label="First Name"
                        disabled={props.editData}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.firstName
                                ? props.Vendordata.secondary_contact.firstName
                                : ''
                        }
                        name="firstName"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_contact']: {
                                    ...props.Vendordata.secondary_contact,
                                    [e.target.name]: e.target.value.replace(/[^a-z]/gi, '')
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="middleName"
                        label="Middle Name"
                        disabled={props.editData}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.middleName
                                ? props.Vendordata.secondary_contact.middleName
                                : ''
                        }
                        name="middleName"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_contact']: {
                                    ...props.Vendordata.secondary_contact,
                                    [e.target.name]: e.target.value.replace(/[^a-z]/gi, '')
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        disabled={props.editData}
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.lastName
                                ? props.Vendordata.secondary_contact.lastName
                                : ''
                        }
                        name="lastName"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_contact']: {
                                    ...props.Vendordata.secondary_contact,
                                    [e.target.name]: e.target.value.replace(/[^a-z]/gi, '')
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="phone"
                        label="Phone"
                        variant="outlined"
                        disabled={props.editData}
                        size="small"
                        InputProps={{
                            inputComponent: PhonenoMask,
                            value:
                                props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.phone
                                    ? props.Vendordata.secondary_contact.phone
                                    : '',
                            onChange: (e) =>
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['secondary_contact']: {
                                        ...props.Vendordata.secondary_contact,
                                        [e.target.name]: e.target.value
                                    }
                                })
                        }}
                        name="phone"
                    />
                </div>
                <div>
                    <TextField
                        id="ext"
                        label="Ext"
                        variant="outlined"
                        disabled={props.editData}
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.ext
                                ? props.Vendordata.secondary_contact.ext
                                : ''
                        }
                        name="ext"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_contact']: {
                                    ...props.Vendordata.secondary_contact,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        disabled={props.editData}
                        variant="outlined"
                        size="small"
                        value={
                            props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.email
                                ? props.Vendordata.secondary_contact.email
                                : ''
                        }
                        name="email"
                        onChange={(e) => {
                            props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ''),
                                ['secondary_contact']: {
                                    ...props.Vendordata.secondary_contact,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="cellphone"
                        label="Cell Phone"
                        variant="outlined"
                        disabled={props.editData}
                        size="small"
                        InputProps={{
                            inputComponent: PhonenoMask,
                            value:
                                props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.cellPhone
                                    ? props.Vendordata.secondary_contact.cellPhone
                                    : '',
                            onChange: (e) =>
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['secondary_contact']: {
                                        ...props.Vendordata.secondary_contact,
                                        [e.target.name]: e.target.value
                                    }
                                })
                        }}
                        name="cellPhone"
                    />
                </div>
            </div>
            {formType === 'vendor' ? (
                <div
                    style={{ marginBottom: '20px' }}
                    className={`${
                        props.edit ? (props.editType && props.editType === 'Profile' ? 'flex' : 'hidden') : 'flex'
                    } gap-6 border-2 p-3  mb-2 rounded-xl bg-white relative border-sky-500`}
                >
                    <div className=" w-full">
                        <TextField
                            id="assignment"
                            disabled={props.editData}
                            label={
                                <>
                                    Assignment Note <span className="text-red-600">*</span>
                                </>
                            }
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                            fullWidth
                            value={props.Vendordata && props.Vendordata.assignmentNote ? props.Vendordata.assignmentNote : ''}
                            name="assignmentNote"
                            onChange={(e) => {
                                console.log(e.target.name);
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    [e.target.name]: e.target.value
                                });
                            }}
                        />
                    </div>
                </div>
            ) : (
                ''
            )}
            <Box
                sx={{
                    display: props.edit ? 'none' : 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    justifyContent: 'end'
                }}
            >
                <Button
                    color="inherit"
                    disabled={props.activeStep === 0}
                    onClick={() => props.setActiveStep((prev) => prev - 1)}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    Back
                </Button>

                <Button onClick={handleNext} variant="contained" sx={{ m: 1 }}>
                    Next
                </Button>
            </Box>
            <Box
                sx={{
                    display: props.edit ? 'flex' : 'none',
                    flexDirection: 'row',
                    pt: 2,
                    justifyContent: 'end'
                }}
            >
                {props.edit ? (
                    <Button onClick={() => props.setOpenTableView(!props.openTableView)} variant="outlined" color="info" sx={{ m: 1 }}>
                        Back
                    </Button>
                ) : (
                    ''
                )}
                {!props.editData ? (
                    <Button onClick={() => props.setEditData(!props.editData)} variant="contained" color="secondary" sx={{ m: 1 }}>
                        Cancel
                    </Button>
                ) : (
                    <></>
                )}
                <Button
                    onClick={() => (props.editData ? props.setEditData(!props.editData) : handleEditSubmit())}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    {props.editData ? (
                        <>
                            <AiFillEdit /> Edit
                        </>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </Box>
        </div>
    );
};

export default VendorProfileForm;
