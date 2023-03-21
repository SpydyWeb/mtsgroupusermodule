import React, { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, FormGroup, FormControlLabel, Box, Button } from '@mui/material';
import { AiFillEdit } from 'react-icons/ai';
import Android12Switch from './Android12Switch';
import { IoMdAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { UpdateVendor, UpdateVendorcommunications, AddCommunicationById, DeleteCommuncationbyVendorid } from '../../servicesapi/Vendorapi';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import {
    UpdateCustomercommunications,
    UpdateCustomerIntegrationDetail,
    Updatecustomer,
    DeleteCommuncationbycutomerid,
    addCustomercommunications
} from '../../servicesapi/Customerapi';
import SubCard from 'ui-component/cards/SubCard';
const Com_notification = (props) => {
    const location = useLocation();
    const [formType, setFormType] = useState(location.pathname === '/admin/viewvendor' ? 'vendor' : 'customer');

    const handleRemoveClick = (index) => {
        if (formType === 'vendor')
            DeleteCommuncationbyVendorid(props.selecetedVedorId).then((res) => {
                if (res.status === 200) {
                    toast.success('Data has been deleted successfully');
                }
            });
        else
            DeleteCommuncationbycutomerid(props.selecetedVedorId).then((res) => {
                if (res.status === 200) {
                    toast.success('Data has been deleted successfully');
                }
            });
        const list = [...props.communication];
        list.splice(index, 1);
        if (props.edit) {
            props.setCommunicaion(list);
        } else props.setVendordata({ ...props.Vendordata, ['communication']: list });
    };

    const handleSubmit = () => {
        let status = false;
        props.communication.map((ele, i) => {
            if ((ele.type === '' || ele.detail === '') && (ele.productId !== 0 || i === 0)) {
                status = true;
            }
        });
        if (status) toast.error('Please fill all the mandatory fields');
        else {
            props.setActiveStep((prev) => prev + 1);
        }
    };

    const handleAddClick = () => {
        let status = false;
        props.communication.map((ele, i) => {
            if ((ele.type === '' || ele.detail === '') && (ele.productId !== 0 || i === 0)) {
                status = true;
            }
        });
        if (status) toast.error('Please fill all the mandatory fields');
        else {
            if (props.edit) {
                let data = [...props.communication];
                data.push({
                    type: '',
                    detail: '',
                    product_id: 0
                });
                props.setCommunicaion(data);
            } else
                props.setVendordata({
                    ...props.Vendordata,
                    ['communication']: [
                        ...props.Vendordata.communication,
                        {
                            type: '',
                            detail: '',
                            product_id: 0
                        }
                    ]
                });
        }
    };
    const handlechangeCommunication = (e, i) => {
        const { name, value } = e.target;
        const data = [...props.communication];
        data[i][name] = value;
        let status = false;
        let count = 0;
        if (name === 'product_id')
            props.communication.map((ele) => {
                if (ele.product_id === value) count++;
            });
        if (count > 1) status = true;
        if (status) toast.error('Product name cannot be same');
        else props.setVendordata({ ...props.Vendordata, ['communication']: data });
        // setInputList(data);
    };
    const handleEditSubmit = () => {
        if (props.editType === 'Additional') {
            if (formType === 'vendor') {
                if (props.Vendordata.assignmentNote === '') toast.error('Please fill all the mandatory fields');
                else {
                    UpdateVendor(props.Vendordata).then((res) => {
                        if (res.status === 200) {
                            toast.success('Data updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['assignmentNote']: props.Vendordata.assignmentNote,
                                new_Assignment: props.Vendordata.new_Assignment,
                                qcRejection: props.Vendordata.qcRejection,
                                dailyReminder: props.Vendordata.dailyReminder,
                                profileReminder: props.Vendordata.profileReminder
                            });
                            props.seteditModalOpen((prev) => !prev);
                            props.setEditData(!props.editData);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                }
            } else {
                Updatecustomer(props.Vendordata).then((res) => {
                    if (res.status === 200) {
                        toast.success('Data updated succsessfully');
                        props.setVendorDetail({
                            ...props.vendorDetail,
                            assignment: props.Vendordata.assignment,
                            in_QC_Review: props.Vendordata.in_QC_Review,
                            inspection: props.Vendordata.inspection,
                            order_Confirmation: props.Vendordata.order_Confirmation
                        });
                        props.seteditModalOpen((prev) => !prev);
                        props.setEditData(!props.editData);
                    } else {
                        res.json().then((res) => toast.error(res));
                    }
                });
            }
        } else if (props.editType === 'Communication') {
            let status = false;
            props.communication.map((ele, i) => {
                if ((ele.type === '' || ele.detail === '') && (ele.productId !== 0 || i === 0)) {
                    status = true;
                }
            });
            if (status) toast.error('Please fill all the mandatory fields');
            else {
                if (formType === 'vendor') {
                    let CreateComData = [];
                    let UpdateComData = [];
                    props.communication.map((ele) => {
                        if (ele.id === undefined) CreateComData.push(ele);
                        else UpdateComData.push(ele);
                    });
                    CreateComData.map((ele) => {
                        AddCommunicationById(ele, props.selecetedVedorId);
                    });

                    UpdateVendorcommunications(UpdateComData, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Data updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['communication']: props.communication
                            });
                            props.seteditModalOpen((prev) => !prev);
                            props.setEditData(!props.editData);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                } else {
                    let CreateComData = [];
                    let UpdateComData = [];
                    props.communication.map((ele) => {
                        if (ele.id === undefined) CreateComData.push(ele);
                        else UpdateComData.push(ele);
                    });
                    CreateComData.map((ele) => {
                        addCustomercommunications(ele, props.selecetedVedorId);
                    });
                    UpdateCustomercommunications(UpdateComData, props.selecetedVedorId).then((res) => {
                        if (res.status === 200) {
                            toast.success('Data updated succsessfully');
                            props.setVendorDetail({
                                ...props.vendorDetail,
                                ['communication']: props.communication
                            });
                            props.seteditModalOpen((prev) => !prev);
                            props.setEditData(!props.editData);
                        } else {
                            res.json().then((res) => toast.error(res));
                        }
                    });
                }
            }
        } else {
            let data = props.vendorDetail.customer_Integration_details;
            data['additionalDetail'] = props.Vendordata.additionalDetail;
            UpdateCustomerIntegrationDetail(data, props.selecetedVedorId).then((res) => {
                if (res.status === 200) {
                    toast.success('Data updated succsessfully');
                    props.setVendorDetail({
                        ...props.vendorDetail,
                        ['customer_Integration_details']: props.Vendordata.customer_Integration_details,
                        ['additionalDetail']: props.Vendordata.additionalDetail
                    });
                    props.seteditModalOpen((prev) => !prev);
                    props.setEditData(!props.editData);
                } else {
                    res.json().then((res) => toast.error(res));
                }
            });
        }
    };

    return (
        <>
            <SubCard
                title="Communication"
                className={`${
                    props.edit ? (props.editType && props.editType === 'Communication' ? 'block' : 'hidden') : 'block'
                } py-1 mb-3`}
            >
                {props.communication &&
                    props.communication.map((x, i) => {
                        return (
                            <>
                                <div className={`flex flex-col md:flex-row gap-6 border-2 p-3  mb-1 rounded-xl items-center `}>
                                    <div>{i === 0 ? 'Default' : 'Additional'}</div>
                                    <div>
                                        <FormControl sx={{ width: '180px' }} fullWidth={true} size="small">
                                            <InputLabel>
                                                Type <span className="text-red-600">*</span>
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Type"
                                                name="type"
                                                disabled={props.editData}
                                                value={x.type}
                                                onChange={(e) => handlechangeCommunication(e, i)}
                                            >
                                                {props.communicationType &&
                                                    props.communicationType.map((ele) => {
                                                        return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                                                    })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <TextField
                                            label={
                                                <>
                                                    Detail <span className="text-red-600">*</span>
                                                </>
                                            }
                                            variant="outlined"
                                            size="small"
                                            name="detail"
                                            value={x.detail}
                                            disabled={props.editData}
                                            onChange={(e) => handlechangeCommunication(e, i)}
                                        />
                                    </div>
                                    {i !== 0 ? (
                                        <div>
                                            <FormControl style={{ minWidth: '150px' }} size="small">
                                                <InputLabel>
                                                    Product <span className="text-red-600">*</span>
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Product"
                                                    name="product_id"
                                                    value={x.product_id}
                                                    disabled={props.editData}
                                                    onChange={(e) => handlechangeCommunication(e, i)}
                                                >
                                                    {props.productD.map((ele, i) => {
                                                        return ele.selected ? <MenuItem value={ele.id}>{ele.name}</MenuItem> : <></>;
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <div className="flex">
                                        {props.communication &&
                                            props.communication.length !== 1 &&
                                            (i !== 0 ? (
                                                <MdDelete
                                                    onClick={() => (props.editData ? '' : handleRemoveClick(i))}
                                                    color="red"
                                                    size={25}
                                                    style={{ cursor: props.editData ? 'not-allowed' : 'pointer' }}
                                                />
                                            ) : (
                                                <></>
                                            ))}
                                        {props.communication && props.communication.length - 1 === i && (
                                            <IoMdAddCircle
                                                onClick={() => (props.editData ? '' : handleAddClick())}
                                                color="green"
                                                size={25}
                                                style={{ cursor: props.editData ? 'not-allowed' : 'pointer' }}
                                                disabled={props.editData}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        );
                    })}
            </SubCard>

            <SubCard
                title="Additional Notification"
                className={`${props.edit ? (props.editType && props.editType === 'Additional' ? 'block' : 'hidden') : 'block'}`}
            >
                <div
                    className={`${
                        props.edit ? (props.editType && props.editType === 'Additional' ? 'block' : 'hidden') : 'block'
                    }  flex-col md:flex-row gap-6`}
                >
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                disabled={props.editData}
                                control={<Android12Switch />}
                                label={location.pathname === '/admin/viewvendor' ? 'New Assignment' : 'Order Confirmation'}
                                name={location.pathname === '/admin/viewvendor' ? 'new_Assignment' : 'order_Confirmation'}
                                checked={
                                    location.pathname === '/admin/viewvendor'
                                        ? props.Vendordata.new_Assignment
                                        : props.Vendordata.order_Confirmation
                                }
                                onChange={(e) => {
                                    location.pathname === '/admin/viewvendor'
                                        ? props.setVendordata({
                                              ...props.Vendordata,
                                              ['new_Assignment']: !props.Vendordata.new_Assignment
                                          })
                                        : props.setVendordata({
                                              ...props.Vendordata,
                                              ['order_Confirmation']: !props.Vendordata.order_Confirmation
                                          });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                disabled={props.editData}
                                control={<Android12Switch />}
                                label={location.pathname === '/admin/viewvendor' ? 'QC Rejection' : 'Assignment'}
                                name="qcRejection"
                                checked={
                                    location.pathname === '/admin/viewvendor' ? props.Vendordata.qcRejection : props.Vendordata.assignment
                                }
                                onChange={(e) => {
                                    location.pathname === '/admin/viewvendor'
                                        ? props.setVendordata({
                                              ...props.Vendordata,
                                              ['qcRejection']: !props.Vendordata.qcRejection
                                          })
                                        : props.setVendordata({
                                              ...props.Vendordata,
                                              ['assignment']: !props.Vendordata.assignment
                                          });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                disabled={props.editData}
                                control={<Android12Switch />}
                                label={location.pathname === '/admin/viewvendor' ? 'Daily Reminder' : 'Inspection'}
                                name="dailyReminder"
                                checked={
                                    location.pathname === '/admin/viewvendor' ? props.Vendordata.dailyReminder : props.Vendordata.inspection
                                }
                                onChange={(e) => {
                                    location.pathname === '/admin/viewvendor'
                                        ? props.setVendordata({
                                              ...props.Vendordata,
                                              ['dailyReminder']: !props.Vendordata.dailyReminder
                                          })
                                        : props.setVendordata({
                                              ...props.Vendordata,
                                              ['inspection']: !props.Vendordata.inspection
                                          });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch />}
                                disabled={props.editData}
                                label={location.pathname === '/admin/viewvendor' ? 'Profile Reminder' : 'In QC Review'}
                                name="profileReminder"
                                checked={
                                    location.pathname === '/admin/viewvendor'
                                        ? props.Vendordata.profileReminder
                                        : props.Vendordata.in_QC_Review
                                }
                                onChange={(e) => {
                                    location.pathname === '/admin/viewvendor'
                                        ? props.setVendordata({
                                              ...props.Vendordata,
                                              ['profileReminder']: !props.Vendordata.profileReminder
                                          })
                                        : props.setVendordata({
                                              ...props.Vendordata,
                                              ['in_QC_Review']: !props.Vendordata.in_QC_Review
                                          });
                                }}
                            />
                        </FormGroup>
                        <div
                            className={`${
                                props.edit
                                    ? props.editType && props.editType === 'Additional' && formType === 'vendor'
                                        ? 'flex'
                                        : 'hidden'
                                    : 'hidden'
                            } gap-6 border-2 p-3  mb-2 rounded-xl bg-white relative border-sky-500`}
                        >
                            <div className=" w-full">
                                <TextField
                                    disabled={props.editData}
                                    id="assignment"
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
                                        props.setVendordata({
                                            ...(props.Vendordata ? props.Vendordata : ''),
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SubCard>
            {location.pathname === '/admin/viewvendor' || props.editType === 'Additional' || props.editType === 'Communication' ? (
                ''
            ) : (
                <div>
                    <span className="legend Btn_Gradient">Integration Detail</span>
                    <div className="  border-2 p-3  my-3 rounded-xl bg-white relative border-sky-500">
                        <div className={` border-2 p-3  mb-1 rounded-xl items-center `}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <div className="col-md-4">
                                    <TextField
                                        label={
                                            <>
                                                Detail <span className="text-red-600">*</span>
                                            </>
                                        }
                                        fullWidth={true}
                                        variant="outlined"
                                        disabled={props.editData}
                                        size="small"
                                        name="detail"
                                        value={props.Vendordata.customer_Integration_details.detail}
                                        onChange={(e) => {
                                            props.setVendordata({
                                                ...props.Vendordata,
                                                ['customer_Integration_details']: {
                                                    ...props.Vendordata.customer_Integration_details,
                                                    ['detail']: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>

                                <div className="col-md-2">
                                    <TextField
                                        disabled={props.editData}
                                        label={
                                            <>
                                                Port <span className="text-red-600">*</span>
                                            </>
                                        }
                                        variant="outlined"
                                        size="small"
                                        name="port"
                                        fullWidth={true}
                                        value={props.Vendordata.customer_Integration_details.port}
                                        onChange={(e) =>
                                            props.setVendordata({
                                                ...props.Vendordata,
                                                ['customer_Integration_details']: {
                                                    ...props.Vendordata.customer_Integration_details,
                                                    [e.target.name]: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </div>

                                <div className="col-md-3">
                                    <TextField
                                        label={
                                            <>
                                                Login <span className="text-red-600">*</span>
                                            </>
                                        }
                                        variant="outlined"
                                        size="small"
                                        disabled={props.editData}
                                        name="login"
                                        fullWidth={true}
                                        value={props.Vendordata.customer_Integration_details.login}
                                        onChange={(e) =>
                                            props.setVendordata({
                                                ...props.Vendordata,
                                                ['customer_Integration_details']: {
                                                    ...props.Vendordata.customer_Integration_details,
                                                    [e.target.name]: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </div>

                                <div className="col-md-3">
                                    <TextField
                                        label={
                                            <>
                                                Password <span className="text-red-600">*</span>
                                            </>
                                        }
                                        disabled={props.editData}
                                        variant="outlined"
                                        size="small"
                                        name="password"
                                        type={'password'}
                                        fullWidth={true}
                                        value={props.Vendordata.customer_Integration_details.password}
                                        onChange={(e) =>
                                            props.setVendordata({
                                                ...props.Vendordata,
                                                ['customer_Integration_details']: {
                                                    ...props.Vendordata.customer_Integration_details,
                                                    [e.target.name]: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            {props.Vendordata.additionalDetail.map((el, i) => (
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }} key={i}>
                                    <div className="col-md-4">
                                        <TextField
                                            label={<>Additional Detail</>}
                                            fullWidth={true}
                                            variant="outlined"
                                            size="small"
                                            name="detail"
                                            value={el}
                                            disabled={props.editData}
                                            onChange={(e) => {
                                                let data = [...props.Vendordata.additionalDetail];
                                                data[i] = e.target.value;
                                                props.setVendordata({
                                                    ...props.Vendordata,
                                                    ['additionalDetail']: data
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
                    disabled={props.activeStep === 0}
                    onClick={() => props.setActiveStep((prev) => prev - 1)}
                    variant="contained"
                    sx={{ m: 1 }}
                >
                    Back
                </Button>
                <Button onClick={handleSubmit} variant="contained" sx={{ m: 1 }}>
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
        </>
    );
};

export default Com_notification;
