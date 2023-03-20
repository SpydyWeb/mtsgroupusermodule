import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AddVendor, Addvendorfile } from '../../servicesapi/Vendorapi';
import { AddCustomer, DeleteCustomerUser, UpdateCustomerUser, AddCustomerUser, UploadProductFile } from '../../servicesapi/Customerapi';
import { TextField, Button, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import PasswordValidateMessage from '../Headers/PasswordValidateMessage';
import { CheckvalidatePassword, CheckvalidEmail } from '../Headers/PasswordValid';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { validateEmail } from 'views/Common/renderutil';
import SubCard from 'ui-component/cards/SubCard';
const Userregister = (props) => {
    const location = useLocation();
    const [cPassword, setCpassword] = useState('');
    const [passwordValid, setPasswordValid] = useState({
        length: false,
        uppercase: false,
        number: false,
        specailchar: false
    });
    const [userlist, setUserList] = useState([]);
    const [userregistration, setUserRegistation] = useState({
        vendorid: 0,
        firstName: '',
        lastName: '',
        emailId: '',
        logId: '',
        password: '',
        allowTextMsg: true
    });
    const [loading, setLoading] = useState(false);
    const [ispasswordmessage, setisPasswordMessage] = useState(true);
    const Submit = (e) => {
        if (location.pathname === '/admin/viewvendor') {
            if (
                props.Userregister.firstName === '' ||
                props.Userregister.emailId === '' ||
                props.Userregister.lastName === '' ||
                props.Userregister.logId === '' ||
                props.Userregister.password === '' ||
                cPassword === ''
            )
                toast.error('Please fill all the mandatory fields');
            else {
                setLoading(true);
                let vendordata = props.Vendordata;
                vendordata.productFiles.map((ele) => {
                    Addvendorfile(ele.file).then((res) => {
                        setLoading(false);
                        ele.fileid = res.data[0];
                        delete ele.file;
                        // props.setVendordata(vendordata);
                        AddVendor(props.Vendordata).then((res) => {
                            if (res.status === 200) {
                                setLoading(false);
                                toast.success('Vendor has been create successfully');
                                props.setActiveStep(0);
                                props.setVendordata({
                                    id: 0,
                                    vendorId: '',
                                    name: '',
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
                                    assignmentNote: '',
                                    new_Assignment: true,
                                    qcRejection: true,
                                    dailyReminder: true,
                                    profileReminder: true,
                                    licences: [
                                        {
                                            firstName: '',
                                            lastName: '',
                                            licenceNo: '',
                                            licenceType: '',
                                            status: '',
                                            address: '',
                                            expiry_Date: '',
                                            issueDate: '',
                                            disciplinaryAction: '',
                                            note: ''
                                        }
                                    ],
                                    communication: [
                                        {
                                            type: '',
                                            detail: '',
                                            product_id: 0
                                        }
                                    ],
                                    product: [
                                        {
                                            id: '',
                                            name: 'string',
                                            price: 0,
                                            productId: 0,
                                            selected: false
                                        }
                                    ],
                                    userregistration: {
                                        firstName: '',
                                        lastName: '',
                                        emailId: '',
                                        logId: '',
                                        password: '',
                                        allowTextMsg: true
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
                            } else {
                                res.json().then((val) => toast.error('Log Id is already exists'));
                            }
                        });
                    });
                });
            }
        } else {
            if (userlist.length > 0) {
                AddCustomer(props.Vendordata).then((res) => {
                    if (res.status === 200) {
                        UploadProductFile(props.fileupload, res.data).then((res) => {
                            console.log(res);
                        });
                        toast.success('Customer has been create successfully');
                        props.setActiveStep(0);
                        props.setVendordata({
                            customerId: '',
                            name: '',
                            parent: '',
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
                                    customerId: 0
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
                            registerId: [0]
                        });
                    } else {
                        res.json().then((val) => toast.error(val));
                    }
                });
            } else {
                toast.error('Please enter atleast one user details');
            }
        }
    };
    const isPasswordMview = () => {
        if (passwordValid.length && passwordValid.number && passwordValid.specailchar && passwordValid.uppercase) {
            setisPasswordMessage(true);
        } else {
            setisPasswordMessage(false);
        }
    };
    const handleAdduser = () => {
        if (
            userregistration.firstName === '' ||
            userregistration.emailId === '' ||
            userregistration.lastName === '' ||
            userregistration.logId === '' ||
            userregistration.password === '' ||
            cPassword === ''
        )
            toast.error('Please fill all the mandatory fields');
        else {
            if (userregistration.vendorid === 0) {
                AddCustomerUser(userregistration).then((res) => {
                    if (res.status === 200) {
                        if (res.data === 0) {
                            toast.error('User already exist');
                        } else {
                            toast.success('User added successfully');
                            let data = [...props.Vendordata.registerId];
                            data.push(res.data);
                            props.setVendordata({ ...props.Vendordata, registerId: data });
                            setUserList([
                                ...userlist,
                                {
                                    vendorid: res.data,
                                    firstName: userregistration.firstName,
                                    lastName: userregistration.lastName,
                                    emailId: userregistration.emailId,
                                    logId: userregistration.logId,
                                    password: userregistration.password,
                                    allowTextMsg: userregistration.allowTextMsg
                                }
                            ]);
                            setUserRegistation({
                                vendorid: 0,
                                firstName: '',
                                lastName: '',
                                emailId: '',
                                logId: '',
                                password: '',
                                allowTextMsg: true
                            });
                            setCpassword('');
                        }
                    }
                });
            } else {
                UpdateCustomerUser(userregistration).then((res) => {
                    if (res.status === 200) {
                        toast.success('User updated successfully');
                        let data = [...userlist];
                        for (let index = 0; index < data.length; index++) {
                            if (data[index].vendorid === userregistration.vendorid) {
                                data[index] = userregistration;
                            }
                        }

                        setUserList(data);
                        setUserRegistation({
                            vendorid: 0,
                            firstName: '',
                            lastName: '',
                            emailId: '',
                            logId: '',
                            password: '',
                            allowTextMsg: true
                        });
                        setCpassword('');
                    }
                });
            }
        }
    };
    const handleChange = (e) => {
        if (location.pathname === '/admin/viewvendor') {
            props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ''),
                ['userregistration']: {
                    ...props.Vendordata.userregistration,
                    [e.target.name]: e.target.value
                }
            });
        } else {
            setUserRegistation({
                ...userregistration,
                [e.target.name]: e.target.value
            });
        }
    };
    const handleDleteuser = (id) => {
        console.log('hitt', id);
        DeleteCustomerUser(id).then((res) => {
            if (res.status === 200) {
                toast.success('User deleted successfully');
                let data = [...userlist];

                data = data.filter((ele) => ele.vendorid !== id);
                console.log(data);
                setUserList(data);
            }
        });
    };
    const handleEdituser = (id) => {
        let data = [...userlist];

        let mydata = data.filter((ele) => ele.vendorid === id);

        setUserRegistation(mydata[0]);
    };
    return (
        <>
            {userlist.length > 0 ? (
                <SubCard title="User Details">
                    <div className="flex flex-col flex-wrap  border-2 border-slate-300 p-2 mb-1 rounded-xl">
                        <table>
                            <tr>
                                <th>S. No.</th>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Log Id</th>
                                <th>Status</th>
                            </tr>
                            {userlist.map((ele, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{`${ele.firstName} ${ele.lastName}`}</td>
                                        <td>{ele.emailId}</td>
                                        <td>{ele.logId}</td>
                                        <td>{ele.allowTextMsg ? 'True' : 'False'}</td>
                                        <td className="flex gap-1">
                                            <MdDelete
                                                color="red"
                                                size={20}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDleteuser(ele.vendorid)}
                                            />
                                            <AiFillEdit
                                                color="blue"
                                                size={20}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleEdituser(ele.vendorid)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </SubCard>
            ) : (
                <></>
            )}
            <SubCard title="User Details">
                <div className="flex flex-col flex-wrap  ">
                    <div className="flex gap-6 flex-col md:flex-row  py-1 mb-1">
                        <div>
                            <TextField
                                name="firstName"
                                label={
                                    <>
                                        First Name <span className="text-red-600">*</span>
                                    </>
                                }
                                value={
                                    location.pathname === '/admin/viewvendor' ? props.Userregister.firstName : userregistration.firstName
                                }
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                name="lastName"
                                label={
                                    <>
                                        Last Name <span className="text-red-600">*</span>
                                    </>
                                }
                                value={location.pathname === '/admin/viewvendor' ? props.Userregister.lastName : userregistration.lastName}
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                name="emailId"
                                label={
                                    <>
                                        Email id <span className="text-red-600">*</span>
                                    </>
                                }
                                onBlur={(e) => {
                                    if (!validateEmail(e.target.value)) {
                                        toast.error('Please enter valid email id');
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['userregistration']: {
                                                ...props.Vendordata.userregistration,
                                                [e.target.name]: ''
                                            }
                                        });
                                    }
                                }}
                                value={location.pathname === '/admin/viewvendor' ? props.Userregister.emailId : userregistration.emailId}
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>

                        <div>
                            <TextField
                                name="logId"
                                label={
                                    <>
                                        Login ID <span className="text-red-600">*</span>
                                    </>
                                }
                                value={location.pathname === '/admin/viewvendor' ? props.Userregister.logId : userregistration.logId}
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-6 flex-col md:flex-row  py-1 mb-1">
                        <div>
                            <TextField
                                name="password"
                                label={
                                    <>
                                        Password <span className="text-red-600">*</span>
                                    </>
                                }
                                onFocus={isPasswordMview}
                                onBlur={isPasswordMview}
                                value={location.pathname === '/admin/viewvendor' ? props.Userregister.password : userregistration.password}
                                variant="outlined"
                                size="small"
                                type="password"
                                onChange={(e) => {
                                    setPasswordValid(CheckvalidatePassword(e.target.value, passwordValid));
                                    handleChange(e);
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                name="Confirm password"
                                label={
                                    <>
                                        Confirm Password <span className="text-red-600">*</span>
                                    </>
                                }
                                value={cPassword}
                                variant="outlined"
                                size="small"
                                onChange={(e) => setCpassword(e.target.value)}
                                type="password"
                                onBlur={() => {
                                    if (location.pathname === '/admin/viewvendor') {
                                        if (props.Userregister.password !== cPassword) {
                                            toast.error('Confirm password should be same as password');
                                            setCpassword('');
                                        }
                                    } else {
                                        if (userregistration.password !== cPassword) {
                                            toast.error('Confirm password should be same as password');
                                            setCpassword('');
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="allowTextMsg"
                                            checked={
                                                location.pathname === '/admin/viewvendor'
                                                    ? props.Userregister.allowTextMsg
                                                    : userregistration.allowTextMsg
                                            }
                                            onChange={(e) => {
                                                if (location.pathname === '/admin/viewvendor') {
                                                    props.setVendordata({
                                                        ...(props.Vendordata ? props.Vendordata : ''),
                                                        ['userregistration']: {
                                                            ...props.Vendordata.userregistration,
                                                            [e.target.name]: !props.Vendordata.userregistration.allowTextMsg
                                                        }
                                                    });
                                                } else {
                                                    setUserRegistation({
                                                        ...userregistration,
                                                        [e.target.name]: !userregistration.allowTextMsg
                                                    });
                                                }
                                            }}
                                        />
                                    }
                                    label="Allow Text"
                                />
                            </FormGroup>
                        </div>
                        {location.pathname === '/admin/viewvendor' ? (
                            <></>
                        ) : (
                            <div>
                                <Button variant="contained" color="success" onClick={() => handleAdduser()}>
                                    Add
                                </Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <PasswordValidateMessage isView={ispasswordmessage} passwordValid={passwordValid} />
                    </div>
                </div>
            </SubCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    justifyContent: 'end'
                }}
            >
                <Button
                    disabled={props.activeStep === 0}
                    onClick={() => props.setActiveStep((prev) => prev - 1)}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    Back
                </Button>
                <Button variant="contained" sx={{ m: 1 }} disabled={loading} onClick={() => Submit()}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </Box>
        </>
    );
};

export default Userregister;
