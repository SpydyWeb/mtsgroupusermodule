import React, { useState } from 'react';
import { TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl, Checkbox, Box, Button } from '@mui/material';
import toast from 'react-hot-toast';
import {
    Addvendoreoc,
    Checkexistingid,
    UpdateVendorAddress,
    UpdateVendorContact,
    UpdateVendorEandO,
    updateAccountinfo
} from '../../servicesapi/Vendorapi';
import ToolTipValidation from '../Validation/ToolTipValidation';
import { PhonenoMask, validateEmail } from '../Common/renderutil';
import { useLocation } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { UpdateCustomerAddress, UpdateCustomerContact, Updatecustomeraccountinfo } from '../../servicesapi/Customerapi';
import SubCard from 'ui-component/cards/SubCard';
import EandO from './EandO';
const clientTypeDDl = [
    { name: 'Lender', value: 'Lender' },
    { name: 'Broker', value: 'Broker' },
    { name: 'Agent', value: 'Agent' },
    { name: 'Servicer', value: 'Servicer' },
    { name: 'Other', value: 'Other' }
];
const VendorProfileForm = (props) => {
    const location = useLocation();
    const [formType, setFormType] = useState(location.pathname === '/admin/viewvendor' ? 'vendor' : 'customer');
    const top100Films = [{ label: '', year: 1994 }];
    const [tooltip, setTooltip] = useState({ isshow: false, valid: false });
    const [sameAs, setSameas] = useState({ address: false, contact: false });
    const handleNext = () => {
        console.log(props.Vendordata);
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
            props.Vendordata.accountinfo.billing_Code === '' ||
            props.Vendordata.accountinfo.billing_Name === '' ||
            props.Vendordata.accountinfo.tax_Id === '' ||
            props.Vendordata.accountinfo.custom_Field1 === '' ||
            props.Vendordata.accountinfo.custom_Field2 === '' ||
            props.Vendordata.accountinfo.profile_Note === '' ||
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
                props.Vendordata.secondary_Address.pincode === '' ||
                props.Vendordata.primery_Contact.firstName === '' ||
                props.Vendordata.primery_Contact.lastName === '' ||
                props.Vendordata.primery_Contact.phone === '' ||
                props.Vendordata.primery_Contact.email === '' ||
                props.Vendordata.primery_Contact.cellPhone === '' ||
                props.Vendordata.billing_Code === '' ||
                props.Vendordata.billing_Name === '' ||
                props.Vendordata.tax_Id === '' ||
                props.Vendordata.custom_Field1 === '' ||
                props.Vendordata.custom_Field2 === '' ||
                props.Vendordata.profile_Note === ''
            )
                toast.error('Please fill all the mandatory fields');
            else {
                let dataaddress = [];
                let datacontact = [];
                let dataaccountinginfo = [];
                dataaddress.push(props.Vendordata.primery_Address);
                dataaddress.push(props.Vendordata.secondary_Address);
                datacontact.push(props.Vendordata.primery_Contact);
                datacontact.push(props.Vendordata.secondary_contact);
                dataaccountinginfo = props.Vendordata.accountinfo;
                if (datacontact[1].firstName === '') {
                    datacontact = new Array(datacontact[0]);
                } else {
                    delete datacontact[1]['id'];
                    delete datacontact[1]['updateDate'];
                    delete datacontact[1]['createdDate'];
                    delete datacontact[1]['isDeleted'];
                }
                if (formType === 'vendor') {
                    UpdateVendorAddress(dataaddress, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
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
                    UpdateVendorContact(datacontact, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Profile updated succsessfully');
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
                    console.log('hitt');
                    if (props.EOformValue.providerName !== '') {
                        props.EOformValue['vendor_id'] = props.selecetedVedorId;
                        if (props.EOformValue.id === undefined) {
                            Addvendoreoc(props.EOformValue).then((res) => {
                                if (res.status === 200) {
                                    toast.success('E&O coverage policy added succsessfully');
                                    props.setEditData(!props.editData);
                                    props.seteditModalOpen((prev) => !prev);
                                } else {
                                    res.json().then((res) => toast.error(res));
                                }
                            });
                        } else {
                            delete props.EOformValue.updateDate;
                            delete props.EOformValue.createdDate;
                            delete props.EOformValue.isDeleted;
                            UpdateVendorEandO(props.EOformValue, props.EOformValue.id).then((res) => {
                                if (res.status === 200) {
                                    toast.success('E&O coverage policy Updated succsessfully');
                                    props.setEditData(!props.editData);
                                    props.seteditModalOpen((prev) => !prev);
                                } else {
                                    res.json().then((res) => toast.error(res));
                                }
                            });
                        }
                    }
                    updateAccountinfo(dataaccountinginfo, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Profile updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['accountinfo']: props.Vendordata.accountinfo
                            });
                            props.setEditData(!props.editData);
                            props.seteditModalOpen((prev) => !prev);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                } else {
                    delete dataaddress[0].updateDate;
                    delete dataaddress[0].createdDate;
                    delete dataaddress[1].updateDate;
                    delete dataaddress[1].createdDate;
                    UpdateCustomerAddress(dataaddress, props.selecetedVedorId).then((res) => {
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
                    UpdateCustomerContact(datacontact, props.selecetedVedorId).then((res) => {
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
                    let accoutninfodata = props.Vendordata.accountinfo;
                    Updatecustomeraccountinfo(accoutninfodata, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Accouting information updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['accountinfo']: accoutninfodata
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
    const handleEOChange = (e) => {
        const { name, value } = e.target;
        props.setEOFormValue({ ...props.EOformValue, [name]: value });
    };
    return (
        <div className="mt-3">
            <SubCard
                title="Profile Details"
                sx={{ mb: 2 }}
                className={`${props.edit ? (props.editType && props.editType === 'Profile' ? 'block' : 'hidden') : 'block'}`}
            >
                <div
                    // style={{ marginBottom: '20px', paddingTop: '20px' }}
                    className={`flex flex-col md:flex-row gap-6`}
                >
                    <div>
                        <TextField
                            id="Id"
                            label={
                                <>
                                    ID <span className="text-red-600">*</span>
                                </>
                            }
                            value={formType === 'vendor' ? props.Vendordata?.vendorId : props.Vendordata.customerId}
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
                        {tooltip.isshow && props.Vendordata?.vendorId !== '' ? (
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
                        <>
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
                            <div>
                                <FormControl sx={{ width: '150px' }} fullWidth={true} size="small">
                                    <InputLabel>
                                        Type <span className="text-red-600">*</span>
                                    </InputLabel>
                                    <Select
                                        disabled={props.editData}
                                        value={props?.Vendordata?.client_type ? props.Vendordata.client_type : ''}
                                        name="client_type"
                                        onChange={(e) => {
                                            props.setVendordata({
                                                ...(props.Vendordata ? props.Vendordata : ''),
                                                ['client_type']: e.target.value
                                            });
                                        }}
                                    >
                                        {clientTypeDDl.map((ele, indx) => {
                                            return <MenuItem value={ele.value}>{ele.name}</MenuItem>;
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    label={
                                        <>
                                            Time zone <span className="text-red-600">*</span>
                                        </>
                                    }
                                    value={props.Vendordata && props.Vendordata?.timezone ? props.Vendordata.timezone : ''}
                                    name="timezone"
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
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </SubCard>

            <SubCard
                title="Primary Address"
                sx={{ mb: 2 }}
                className={`${props.edit ? (props.editType && props.editType === 'Address' ? 'block' : 'hidden') : 'block'}`}
            >
                <div className={`flex flex-col md:flex-row gap-6`}>
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
                                value={props?.Vendordata?.primery_Address?.state ? props.Vendordata.primery_Address.state : ''}
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
                            onBlur={(e) => {
                                if (e.target.value.length !== 5) {
                                    toast.error('Please enter the valid zipcode');
                                    props.setVendordata({
                                        ...(props.Vendordata ? props.Vendordata : ''),
                                        ['primery_Address']: {
                                            ...props.Vendordata.primery_Address,
                                            [e.target.name]: ''
                                        }
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            </SubCard>
            <SubCard
                title={
                    <Box sx={{ display: 'flex', gap: '6px' }}>
                        <Box>Billing Address</Box>{' '}
                        <Box>
                            (&nbsp;
                            <input
                                disabled={props.editData}
                                type={'checkbox'}
                                checked={sameAs.address}
                                onChange={(e) => {
                                    setSameas({ ...sameAs, address: !sameAs.address });
                                    console.log(e.target.checked);
                                    if (e.target.checked)
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['secondary_Address']: props.Vendordata.primery_Address
                                        });
                                    else
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['secondary_Address']: { address: '', city: '', suite: '', state: '', pincode: '' }
                                        });
                                }}
                            />{' '}
                            Same as Primary Address)
                        </Box>
                    </Box>
                }
                sx={{ mb: 2 }}
                className={`${props.edit ? (props.editType && props.editType === 'Address' ? 'block' : 'hidden') : 'block'}`}
            >
                <div className={`flex flex-col md:flex-row gap-6`}>
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
                            disabled={props.editData || sameAs.address}
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
                            disabled={props.editData || sameAs.address}
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
                            disabled={props.editData || sameAs.address}
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
                                disabled={props.editData || sameAs.address}
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
                            disabled={props.editData || sameAs.address}
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
                            onBlur={(e) => {
                                if (e.target.value.length !== 5) {
                                    toast.error('Please enter the valid zipcode');
                                    props.setVendordata({
                                        ...(props.Vendordata ? props.Vendordata : ''),
                                        ['secondary_Address']: {
                                            ...props.Vendordata.secondary_Address,
                                            [e.target.name]: ''
                                        }
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            </SubCard>
            <SubCard
                title="Primary Contact"
                sx={{ mb: 2 }}
                className={`${props.edit ? (props.editType && props.editType === 'Address' ? 'block' : 'hidden') : 'block'}`}
            >
                <div className={`flex flex-col md:flex-row gap-6`}>
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
                                    }),
                                onBlur: (e) => {
                                    if (e.target.value.replace(/\D/g, '').length !== 10) {
                                        toast.error('Please enter valid phone no.');
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['primery_Contact']: {
                                                ...props.Vendordata.primery_Contact,
                                                [e.target.name]: ''
                                            }
                                        });
                                    }
                                }
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
                            onBlur={(e) => {
                                if (!validateEmail(e.target.value)) {
                                    toast.error('Please enter valid email id in primary contact');
                                    props.setVendordata({
                                        ...(props.Vendordata ? props.Vendordata : ''),
                                        ['primery_Contact']: {
                                            ...props.Vendordata.primery_Contact,
                                            [e.target.name]: ''
                                        }
                                    });
                                }
                            }}
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
                                    }),
                                onBlur: (e) => {
                                    if (e.target.value.replace(/\D/g, '').length !== 10) {
                                        toast.error('Please enter valid phone no.');
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['primery_Contact']: {
                                                ...props.Vendordata.primery_Contact,
                                                [e.target.name]: ''
                                            }
                                        });
                                    }
                                }
                            }}
                            variant="outlined"
                            size="small"
                            name="cellPhone"
                        ></TextField>
                    </div>
                </div>
            </SubCard>
            <SubCard
                title={
                    <Box sx={{ display: 'flex', gap: '6px' }}>
                        <Box>Additional Contact</Box>{' '}
                        <Box>
                            (&nbsp;
                            <input
                                disabled={props.editData}
                                type={'checkbox'}
                                checked={sameAs.contact}
                                onChange={(e) => {
                                    setSameas({ ...sameAs, contact: !sameAs.contact });
                                    if (e.target.checked)
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['secondary_contact']: props.Vendordata.primery_Contact
                                        });
                                    else
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['secondary_contact']: {
                                                firstName: '',
                                                middleName: '',
                                                lastName: '',
                                                phone: '',
                                                email: '',
                                                ext: '',
                                                cellPhone: ''
                                            }
                                        });
                                }}
                            />{' '}
                            Same as Primary Contact)
                        </Box>
                    </Box>
                }
                sx={{ mb: 2 }}
                className={`${props.edit ? (props.editType && props.editType === 'Address' ? 'block' : 'hidden') : 'block'}`}
            >
                <div className={`flex flex-col md:flex-row gap-6`}>
                    <div>
                        <TextField
                            id="firstname"
                            label="First Name"
                            disabled={props.editData || sameAs.contact}
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
                            disabled={props.editData || sameAs.contact}
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
                            disabled={props.editData || sameAs.contact}
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
                            disabled={props.editData || sameAs.contact}
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
                                    }),
                                onBlur: (e) => {
                                    if (e.target.value.replace(/\D/g, '').length !== 10) {
                                        toast.error('Please enter valid phone no.');
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['secondary_contact']: {
                                                ...props.Vendordata.primery_Contact,
                                                [e.target.name]: ''
                                            }
                                        });
                                    }
                                }
                            }}
                            name="phone"
                        />
                    </div>
                    <div>
                        <TextField
                            id="ext"
                            label="Ext"
                            variant="outlined"
                            disabled={props.editData || sameAs.contact}
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
                            disabled={props.editData || sameAs.contact}
                            variant="outlined"
                            size="small"
                            value={
                                props.Vendordata && props.Vendordata.secondary_contact && props.Vendordata.secondary_contact.email
                                    ? props.Vendordata.secondary_contact.email
                                    : ''
                            }
                            name="email"
                            onBlur={(e) => {
                                if (!validateEmail(e.target.value)) {
                                    toast.error('Please enter valid email id in secondary contact');
                                    props.setVendordata({
                                        ...(props.Vendordata ? props.Vendordata : ''),
                                        ['secondary_contact']: {
                                            ...props.Vendordata.secondary_contact,
                                            [e.target.name]: ''
                                        }
                                    });
                                }
                            }}
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
                            disabled={props.editData || sameAs.contact}
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
                                    }),
                                onBlur: (e) => {
                                    if (e.target.value.replace(/\D/g, '').length !== 10) {
                                        toast.error('Please enter valid phone no.');
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            ['secondary_contact']: {
                                                ...props.Vendordata.primery_Contact,
                                                [e.target.name]: ''
                                            }
                                        });
                                    }
                                }
                            }}
                            name="cellPhone"
                        />
                    </div>
                </div>
            </SubCard>

            <SubCard
                title="Accounting Information"
                sx={{ mb: 2 }}
                className={`${props.edit ? (props.editType && props.editType === 'Address' ? 'block' : 'hidden') : 'block'}`}
            >
                <div className={`flex flex-col md:flex-row gap-6`}>
                    <div>
                        <TextField
                            id="Billing Code"
                            label={
                                <>
                                    Billing Code <span className="text-red-600">*</span>
                                </>
                            }
                            disabled={props.editData}
                            variant="outlined"
                            size="small"
                            value={props.Vendordata?.accountinfo?.billing_Code ? props.Vendordata.accountinfo.billing_Code : ''}
                            name="billing_Code"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['accountinfo']: {
                                        ...props.Vendordata.accountinfo,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="Billing Name"
                            label={
                                <>
                                    Billing Name <span className="text-red-600">*</span>
                                </>
                            }
                            disabled={props.editData}
                            variant="outlined"
                            size="small"
                            value={props.Vendordata?.accountinfo?.billing_Name ? props.Vendordata.accountinfo.billing_Name : ''}
                            name="billing_Name"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['accountinfo']: {
                                        ...props.Vendordata.accountinfo,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="Tax Id"
                            disabled={props.editData}
                            label={
                                <>
                                    Tax Id <span className="text-red-600">*</span>
                                </>
                            }
                            variant="outlined"
                            size="small"
                            value={props.Vendordata?.accountinfo?.tax_Id ? props.Vendordata.accountinfo.tax_Id : ''}
                            name="tax_Id"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['accountinfo']: {
                                        ...props.Vendordata.accountinfo,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="custom_Field1"
                            disabled={props.editData}
                            label={
                                <>
                                    Custom Field1 <span className="text-red-600">*</span>
                                </>
                            }
                            variant="outlined"
                            size="small"
                            value={props.Vendordata?.accountinfo?.custom_Field1 ? props.Vendordata.accountinfo.custom_Field1 : ''}
                            name="custom_Field1"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['accountinfo']: {
                                        ...props.Vendordata.accountinfo,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="custom_Field1"
                            disabled={props.editData}
                            label={
                                <>
                                    Custom Field2 <span className="text-red-600">*</span>
                                </>
                            }
                            variant="outlined"
                            size="small"
                            value={props.Vendordata?.accountinfo?.custom_Field2 ? props.Vendordata.accountinfo.custom_Field2 : ''}
                            name="custom_Field2"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['accountinfo']: {
                                        ...props.Vendordata.accountinfo,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={`flex flex-col md:flex-row gap-6 mt-3`}>
                    <div className=" w-full">
                        <TextField
                            id="profile_Note"
                            disabled={props.editData}
                            label={
                                <>
                                    Profile Note <span className="text-red-600">*</span>
                                </>
                            }
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                            fullWidth
                            value={props.Vendordata?.accountinfo?.profile_Note ? props.Vendordata.accountinfo.profile_Note : ''}
                            name="profile_Note"
                            onChange={(e) => {
                                props.setVendordata({
                                    ...(props.Vendordata ? props.Vendordata : ''),
                                    ['accountinfo']: {
                                        ...props.Vendordata.accountinfo,
                                        [e.target.name]: e.target.value
                                    }
                                });
                            }}
                        />
                    </div>
                </div>
            </SubCard>
            {props.edit && location.pathname === '/admin/viewvendor' && (
                <EandO editData={props.editData} formValue={props.EOformValue} handleChange={(e) => handleEOChange(e)} />
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

                <Button onClick={() => handleEditSubmit()} variant="contained" sx={{ m: 1, display: props.editData ? 'none' : 'block' }}>
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default VendorProfileForm;
