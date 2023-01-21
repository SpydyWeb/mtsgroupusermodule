import React, { useEffect, useState } from 'react';
import { TextField, FormGroup, FormControlLabel, Box, Button, Grid } from '@mui/material';
import { AiFillEdit } from 'react-icons/ai';
import Android12Switch from './Android12Switch';
import Accordion from '@mui/material/Accordion';
import { AccordionSummary } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { UpdateVendorproducts } from '../../servicesapi/Vendorapi';
import { FcExpand } from 'react-icons/fc';
import { useLocation } from 'react-router-dom';
import { UpdateCustomerProduct } from '../../servicesapi/Customerapi';
const VendorProduct = (props) => {
    const location = useLocation();
    const [formType, setFormType] = useState(location.pathname === '/admin/viewvendor' ? 'vendor' : 'customer');
    const handleNext = () => {
        let status = false;
        let count = 0;
        props.productD.map((ele) => {
            if (ele.selected === true) {
                count = 1;
                // if (ele.price === 0 && formType === "vendor")
                //   status = true;
            }
        });
        if (status || count === 0) toast.error('Please fill all the mandatory fields');
        else {
            props.setVendordata({ ...props.Vendordata, product: props.productD });
            props.setActiveStep((prev) => prev + 1);
        }
    };

    const handlechange = (e, indx, mainIndx, productid) => {
        const { name, value } = e.target;
        console.log();
        const data = [...props.productD];
        for (let index = 0; index < data.length; index++) {
            if (data[index].id === productid) {
                if (name === 'selected') data[index].selected = !data[index].selected;
                else if (name === 'price1') data[index].price1 = +value;
                else if (name === 'price2') data[index].price2 = +value;
                else if (name === 'price3') data[index].price3 = +value;
                break;
            }
        }
        props.setProductD(data);
        const productdata = [...props.productdata];
        if (name === 'selected') productdata[mainIndx].subCategory[indx].selected = !productdata[mainIndx].subCategory[indx].selected;
        else if (name === 'price1') productdata[mainIndx].subCategory[indx].price1 = isNaN(value) ? '' : +value;
        else if (name === 'price2') productdata[mainIndx].subCategory[indx].price2 = isNaN(value) ? '' : +value;
        else if (name === 'price3') productdata[mainIndx].subCategory[indx].price3 = isNaN(value) ? '' : +value;
        props.setProductdata(productdata);
    };
    const updateProductState = () => {
        props.seteditModalOpen((prev) => !prev);
        for (let index = 0; index < props.productdata.length; index++) {
            if (props.productdata[index].subCategory !== null) {
                props.productdata[index].subCategory.forEach((element) => {
                    let status = true;
                    if (element.selected) {
                        props.vendorDetail.product.forEach((val) => {
                            if (element.id === val.id) {
                                val.price1 = element.price1;
                                val.price2 = element.price2;
                                val.price3 = element.price3;
                                status = false;
                            }
                        });
                        if (status) {
                            props.vendorDetail.product.push({
                                id: element.id,
                                name: element.name,
                                price1: element.price1,
                                price2: element.price2,
                                price3: element.price3,
                                productId: 0,
                                selected: true,
                                subCategory: null
                            });
                        }
                    }
                });
            }
        }
        props.setVendorDetail({
            ...props.vendorDetail,
            ['communication']: props.communication
        });
    };
    const handleEditSubmit = () => {
        if (formType === 'vendor') {
            UpdateVendorproducts(props.productdata, props.selecetedVedorId).then((res) => {
                if (res.status === 200) {
                    toast.success('Data updated succsessfully');
                    updateProductState();
                } else {
                    res.json().then((res) => toast.error(res));
                }
            });
        } else {
            let data = [];
            props.productdata.forEach((element) => {
                element.subCategory.forEach((element) => {
                    if (element.selected)
                        data.push({
                            price1: element.price1,
                            price2: element.price2,
                            price3: element.price3,
                            customerid: props.selecetedVedorId,
                            productid: element.id
                        });
                });
            });
            UpdateCustomerProduct(data).then((res) => {
                if (res.status === 200) {
                    toast.success('Product price updated successfully');
                    updateProductState();
                }
            });
        }
    };
    const handleUploadClick = (e) => {
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('file', element);
        }
        props.setfileuploadt(form);
    };
    return (
        <>
            {formType === 'customer' ? (
                <div
                    className={`${
                        props.edit ? (props.editType && props.editType === 'Profile' ? 'flex' : 'hidden') : 'flex'
                    } flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
                >
                    <div>
                        <input type="file" onChange={(e) => handleUploadClick(e)} />
                    </div>
                    <div></div>
                </div>
            ) : (
                <></>
            )}
            <Grid container spacing={5}>
                {props.productdata.map((ele, indx) => {
                    if (ele.subCategory && ele.subCategory.length > 0) {
                        return (
                            <Grid item xs={6}>
                                <Accordion className="max-h-[250px] overflow-y-auto">
                                    <AccordionSummary
                                        expandIcon={<FcExpand />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{ borderBottom: '1px solid lightgray' }}
                                    >
                                        <Typography style={{ fontWeight: '700' }}>{ele.name}</Typography>
                                    </AccordionSummary>
                                    {ele.subCategory.map((val, i) => {
                                        return (
                                            <AccordionDetails>
                                                <Typography>
                                                    <div style={{ display: 'flex' }}>
                                                        <FormGroup key={i} className="flex flex-row gap-x-8">
                                                            <div style={{ width: '30%' }}>
                                                                <FormControlLabel
                                                                    style={{ minWidth: '132px' }}
                                                                    control={<Android12Switch />}
                                                                    label={val.name}
                                                                    name="selected"
                                                                    checked={val.selected}
                                                                    disabled={props.editData}
                                                                    onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                />
                                                            </div>
                                                            {formType === 'vendor' || props.edit === true ? (
                                                                <div style={{ width: '60%', display: 'flex', gap: '2px' }}>
                                                                    <div style={{ width: '30%' }}>
                                                                        <TextField
                                                                            inputProps={{
                                                                                inputMode: 'numeric',
                                                                                pattern: '[0-9]*'
                                                                            }}
                                                                            label="Price"
                                                                            variant="outlined"
                                                                            disabled={props.editData}
                                                                            size="small"
                                                                            value={val.price1 || 0}
                                                                            name="price1"
                                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: '30%' }}>
                                                                        <TextField
                                                                            label="Price"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            disabled={props.editData}
                                                                            value={val.price2}
                                                                            name="price2"
                                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: '30%' }}>
                                                                        <TextField
                                                                            label="Price"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            disabled={props.editData}
                                                                            name="price3"
                                                                            value={val.price3}
                                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </FormGroup>
                                                    </div>
                                                </Typography>
                                            </AccordionDetails>
                                        );
                                    })}
                                </Accordion>
                            </Grid>
                        );
                    } else return <></>;
                })}
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
        </>
    );
};

export default VendorProduct;
