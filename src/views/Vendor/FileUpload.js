import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { Grid, Box, Button, FormControl, InputLabel, Select, TextField, IconButton, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { toast } from 'react-hot-toast';
import { AiFillEdit, AiOutlineDownload, AiFillCloseCircle } from 'react-icons/ai';
import { Addexistingvendorfile, Addvendorfile, UpdateVendorFile } from 'servicesapi/Vendorapi';
import { CurrentUrl } from 'servicesapi/UrlApi';
import { Addcustomerfile, Addexistingcustomerfile, UpdatecustomerFile } from 'servicesapi/Customerapi';
const FileUpload = (props) => {
    console.log();
    const handlechangedate = (e, i) => {
        const { name, value } = e.target;
        const data = [...props.Vendordata.productFiles];
        var q = new Date();
        var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());

        if (name === 'issueDate') {
            if (new Date(value) < date) {
                data[i][name] = value;
            } else {
                toast.error('Issue date should be less than from today');
            }
        } else data[i][name] = value;
        console.log(data);
        props.setVendordata({ ...props.Vendordata, ['productFiles']: data });
    };
    const handleEditSubmit = () => {
        let status = false;
        props.Vendordata.productFiles.map((ele) => {
            if (ele.fileName === '' || ele.type === '' || ele.issueDate === '' || ele.expiryDate === '') {
                status = true;
            }
        });
        if (status) toast.error('Please fill all the mandatory fields');
        else {
            let data = props.Vendordata.productFiles;
            if (props.formType === 'vendor') {
                data.map((ele) => {
                    console.log();
                    if (props.iseditdata === 0 || ele.id === undefined) {
                        const data = new FormData();
                        data.append('expiryDate', ele.expiryDate);
                        data.append('issueDate', ele.issueDate);
                        data.append('remarks', ele.remarks);
                        data.append('size', ele.size);
                        data.append('type', ele.type);
                        data.append('fileName', ele.fileName);
                        Addvendorfile(ele.file).then((resP) => {
                            data.append('File_id', resP.data[0]);
                            Addexistingvendorfile(data, props.selecetedVedorId).then((res) => {
                                ele.File_id = ele.fileid;
                                ele.new_File_id = res.data[0];
                                delete ele.updateDate;
                                // ele.File_id = ele.fileid;
                                // ele.new_File_id = 0;

                                if (res.status === 200) {
                                    toast.success('File updated succsessfully');
                                } else {
                                    res.json().then((res) => toast.error(res));
                                }
                            });
                        });
                    } else {
                        console.log('else hit');
                        Addvendorfile(ele.file).then((res) => {
                            ele.File_id = ele.fileid;
                            ele.size = ele.size === null ? 0 : ele.size;
                            ele.new_File_id = res.data[0];
                            // ele.id = props.selecetedVedorId;
                            delete ele.updateDate;
                            UpdateVendorFile(ele).then((res) => {
                                if (res.status === 200) {
                                    toast.success('File updated succsessfully');
                                } else {
                                    res.json().then((res) => toast.error(res));
                                }
                            });
                        });
                    }
                });
            } else {
                data.map((ele) => {
                    console.log();
                    if (props.iseditdata === 0 || ele.id === undefined) {
                        const data = new FormData();
                        data.append('expiryDate', ele.expiryDate);
                        data.append('issueDate', ele.issueDate);
                        data.append('remarks', ele.remarks);
                        data.append('size', ele.size);
                        data.append('type', ele.type);
                        data.append('fileName', ele.fileName);
                        Addcustomerfile(ele.file).then((resP) => {
                            data.append('File_id', resP.data[0]);
                            Addexistingcustomerfile(data, props.selecetedVedorId).then((res) => {
                                ele.File_id = ele.fileid;
                                ele.new_File_id = res.data[0];
                                delete ele.updateDate;
                                // ele.File_id = ele.fileid;
                                // ele.new_File_id = 0;

                                if (res.status === 200) {
                                    toast.success('File updated succsessfully');
                                } else {
                                    res.json().then((res) => toast.error(res));
                                }
                            });
                        });
                    } else {
                        Addcustomerfile(ele.file).then((res) => {
                            ele.File_id = ele.fileid;
                            ele.size = ele.size === null ? 0 : ele.size;
                            ele.new_File_id = res.data[0];
                            // ele.id = props.selecetedVedorId;
                            delete ele.updateDate;
                            UpdatecustomerFile(ele).then((res) => {
                                if (res.status === 200) {
                                    toast.success('File updated succsessfully');
                                } else {
                                    res.json().then((res) => toast.error(res));
                                }
                            });
                        });
                    }
                });
            }
            props.setVendorDetail({ ...props.vendorDetail, ['productFiles']: data });
            props.seteditModalOpen((prev) => !prev);
        }
    };
    const handleNext = () => {
        let status = false;
        props.Vendordata.productFiles.map((ele) => {
            if (ele.fileName === '' || ele.type === '' || ele.issueDate === '' || ele.expiryDate === '') {
                status = true;
            }
        });
        if (status) toast.error('Please fill all the mandatory fields');
        else props.setActiveStep((prev) => prev + 1);
    };

    return (
        <div>
            <Grid container style={{ justifyContent: 'center', maxHeight: '300px', overflow: 'auto' }}>
                {/* Display the files to be uploaded */}

                <MainCard sx={{ width: '100%' }}>
                    {props.Vendordata?.productFiles?.length > 0 ? (
                        <ul>
                            {props.Vendordata.productFiles.map((ele, i) => (
                                <li style={{ marginBottom: '10px' }} key={i}>
                                    <Grid container alignItems={'center'} sx={{ gap: '15px' }}>
                                        <Grid item container alignItems={'center'} sx={{ gap: '5px' }} md={2}>
                                            {ele.file === '' ? (
                                                <Button variant="contained" component="label" disabled={props.editData}>
                                                    Upload
                                                    <input
                                                        hidden
                                                        type="file"
                                                        name="file"
                                                        onChange={(e) => {
                                                            const data = [...props.Vendordata.productFiles];
                                                            data[i]['fileName'] = e.target.files[0].name;
                                                            data[i]['size'] = e.target.files[0].size;
                                                            data[i]['file'] = e.target.files[0];
                                                            props.setVendordata({ ...props.Vendordata, ['productFiles']: data });
                                                        }}
                                                    />
                                                </Button>
                                            ) : (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    {' '}
                                                    {props.editData ? (
                                                        <IconButton
                                                            onClick={() => {
                                                                if (ele.location !== null) {
                                                                    let url =
                                                                        CurrentUrl +
                                                                        ele.location.slice(ele.location.indexOf('UploadedVendorFiles'));
                                                                    window.open(url, '_blank', 'noreferrer');
                                                                } else toast('error', 'File not found');
                                                            }}
                                                        >
                                                            <AiOutlineDownload style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <Box>
                                                        {ele.fileName === ''
                                                            ? 'No file'
                                                            : ele.fileName.length > 10
                                                            ? ele.fileName.slice(0, 10) + '...'
                                                            : ele.fileName}
                                                    </Box>
                                                    <IconButton
                                                        disabled={props.editData}
                                                        onClick={() => {
                                                            const data = [...props.Vendordata.productFiles];
                                                            data[i]['fileName'] = '';
                                                            data[i]['size'] = '';
                                                            data[i]['file'] = '';
                                                            props.setVendordata({ ...props.Vendordata, ['productFiles']: data });
                                                        }}
                                                    >
                                                        <AiFillCloseCircle style={{ color: props.editData ? 'gray' : '#b81515' }} />
                                                    </IconButton>
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid md={2}>
                                            <FormControl size="small" fullWidth={true}>
                                                <InputLabel>
                                                    <Box sx={{ display: 'flex' }}>
                                                        Type
                                                        <Box sx={{ color: 'red' }}>&nbsp;*</Box>
                                                    </Box>
                                                </InputLabel>
                                                <Select
                                                    name={'type'}
                                                    disabled={props.editData}
                                                    value={ele.type}
                                                    onChange={(e) => handlechangedate(e, i)}
                                                >
                                                    {props.productD.map((ele, indx) => {
                                                        return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid md={2}>
                                            <TextField
                                                fullWidth={true}
                                                disabled={props.editData}
                                                label={
                                                    <>
                                                        Issue Date <span className="text-red-600">*</span>
                                                    </>
                                                }
                                                name="issueDate"
                                                type="date"
                                                variant="outlined"
                                                size="small"
                                                value={ele.issueDate.split('T')[0]}
                                                onChange={(e) => handlechangedate(e, i)}
                                                onBlur={(e) => {
                                                    const data = [...props.Vendordata.productFiles];
                                                    if (new Date(e.target.value) < new Date('01-01-3000')) {
                                                        data[i][e.target.name] = e.target.value;
                                                    } else {
                                                        toast.error('Enter valid date');
                                                        data[i][e.target.name] = '';
                                                    }
                                                    // if (props.edit) props.setLicence(data);
                                                    // else
                                                    props.setVendordata({
                                                        ...props.Vendordata,
                                                        ['productFiles']: data
                                                    });
                                                }}
                                                focused
                                            />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextField
                                                fullWidth={true}
                                                disabled={props.editData}
                                                label={
                                                    <>
                                                        Expiry Date <span className="text-red-600">*</span>
                                                    </>
                                                }
                                                name="expiryDate"
                                                type="date"
                                                variant="outlined"
                                                size="small"
                                                value={ele.expiryDate.split('T')[0]}
                                                onChange={(e) => handlechangedate(e, i)}
                                                onBlur={(e) => {
                                                    const data = [...props.Vendordata.productFiles];
                                                    if (new Date(e.target.value) < new Date('01-01-3000')) {
                                                        data[i][e.target.name] = e.target.value;
                                                    } else {
                                                        toast.error('Enter valid date');
                                                        data[i][e.target.name] = '';
                                                    }
                                                    if (props.edit) props.setLicence(data);
                                                    else
                                                        props.setVendordata({
                                                            ...props.Vendordata,
                                                            ['productFiles']: data
                                                        });
                                                }}
                                                focused
                                            />
                                        </Grid>
                                        <Grid md={2}>
                                            <TextField
                                                disabled={props.editData}
                                                variant="outlined"
                                                label="Remarks"
                                                name="remarks"
                                                value={ele.remarks}
                                                size="small"
                                                onChange={(e) => handlechangedate(e, i)}
                                            />
                                        </Grid>
                                        <Grid md={1} display={'flex'} justifyContent={'center'}>
                                            {i === 0 ? (
                                                <></>
                                            ) : (
                                                <IconButton
                                                    disabled={props.editData}
                                                    size="small"
                                                    sx={{ color: '#f31111' }}
                                                    onClick={() => {
                                                        let data = props.Vendordata.productFiles;
                                                        data.splice(i, 1);
                                                        props.setVendordata({ ...props.Vendordata, productFiles: data });
                                                    }}
                                                >
                                                    <FaTrash title="Delete" />
                                                </IconButton>
                                            )}

                                            <IconButton
                                                disabled={props.editData}
                                                sx={{ color: '#349164' }}
                                                onClick={() => {
                                                    let data = props.Vendordata.productFiles;
                                                    if (data.at(-1).type === '' || data.at(-1).fileName === '')
                                                        toast.error('Please enter the mandatory fields');
                                                    else {
                                                        data.push({
                                                            fileName: '',
                                                            location: '',
                                                            size: 0,
                                                            file: '',
                                                            type: '',
                                                            remarks: '',
                                                            issueDate: '',
                                                            expiryDate: ''
                                                        });
                                                        props.setVendordata({ ...props.Vendordata, productFiles: data });
                                                    }
                                                }}
                                            >
                                                <IoMdAddCircle size={30} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Box>{props.errmsg}</Box>
                    )}
                </MainCard>
            </Grid>
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

                <Button
                    onClick={() => {
                        if (props.editData) {
                            if (props.Vendordata?.productFiles?.length === 0)
                                props.setVendordata({
                                    ...props.Vendordata,
                                    ['productFiles']: [
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
                            props.setEditData(!props.editData);
                        } else handleEditSubmit();
                    }}
                    variant="contained"
                    sx={{ m: 1, display: props.editData ? 'none' : 'block' }}
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
};
export default FileUpload;
