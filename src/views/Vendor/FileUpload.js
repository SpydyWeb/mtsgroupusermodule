import React, { useRef } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { Grid, Box, Button, FormControl, InputLabel, Select, TextField, IconButton, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { toast } from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
const FileUpload = (props) => {
    console.log(props);
    props.Vendordata?.productFiles?.map((ele) => console.log(ele));
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
        props.setVendordata({ ...props.Vendordata, ['productFiles']: data });
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
            <Grid container style={{ justifyContent: 'center', minHeight: '400px', overflow: 'hidden' }}>
                {/* Display the files to be uploaded */}
                {props.Vendordata?.productFiles?.length > 0 ? (
                    <MainCard sx={{ width: '100%' }}>
                        <ul>
                            {props.Vendordata.productFiles.map((ele, i) => (
                                <li style={{ marginBottom: '10px' }} key={i}>
                                    <Grid container alignItems={'center'} sx={{ gap: '15px' }}>
                                        <Grid item container alignItems={'center'} sx={{ gap: '5px' }} md={3}>
                                            <Button variant="contained" component="label">
                                                Upload
                                                <input
                                                    hidden
                                                    accept="image/*"
                                                    multiple
                                                    type="file"
                                                    name="file"
                                                    onChange={(e) => {
                                                        console.log(e.target.files[0]);
                                                        let arrydata = '';
                                                        const data = [...props.Vendordata.productFiles];
                                                        data[i]['fileName'] = e.target.files[0].name;
                                                        data[i]['size'] = e.target.files[0].size;
                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            arrydata = new Uint8Array(reader.result);
                                                            data[i]['file'] = arrydata.join('');
                                                            props.setVendordata({ ...props.Vendordata, ['productFiles']: data });
                                                        };
                                                        reader.readAsArrayBuffer(e.target.files[0]);
                                                    }}
                                                />
                                            </Button>
                                            <Box>{ele.fileName === '' ? 'No file' : ele.fileName}</Box>
                                        </Grid>
                                        <Grid md={1}>
                                            <FormControl size="small" fullWidth={true}>
                                                <InputLabel>
                                                    <Box sx={{ display: 'flex' }}>
                                                        Type
                                                        <Box sx={{ color: 'red' }}>&nbsp;*</Box>
                                                    </Box>
                                                </InputLabel>
                                                <Select name={'type'} value={ele.type} onChange={(e) => handlechangedate(e, i)}>
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
                                                value={props.edit ? ele.issueDate.slice(0, ele.issueDate.indexOf('T')) : ele.issueDate}
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
                                                value={props.edit ? ele.expiryDate.slice(0, ele.expiryDate.indexOf('T')) : ele.expiryDate}
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
                                                variant="outlined"
                                                label="Remarks"
                                                name={'remarks'}
                                                vlaue={ele.remarks}
                                                size="small"
                                                onChange={(e) => handlechangedate(e, i)}
                                            />
                                        </Grid>
                                        <Grid md={1} display={'flex'} justifyContent={'center'}>
                                            {i === 0 ? (
                                                <></>
                                            ) : (
                                                <IconButton
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
                                                sx={{ color: '#349164' }}
                                                onClick={() => {
                                                    let data = props.Vendordata.productFiles;
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
                                                }}
                                            >
                                                <IoMdAddCircle size={30} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </li>
                            ))}
                        </ul>
                    </MainCard>
                ) : (
                    <></>
                )}
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
                {!props.editData ? (
                    <Button onClick={() => props.setEditData(!props.editData)} variant="contained" color="error" sx={{ m: 1 }}>
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
export default FileUpload;
