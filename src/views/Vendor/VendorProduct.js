import React, { useEffect, useState } from 'react';
import {
    TextField,
    FormGroup,
    FormControlLabel,
    Box,
    Button,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Divider
} from '@mui/material';
import { AiFillEdit } from 'react-icons/ai';
import Android12Switch from './Android12Switch';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { GetVendorProductsPriceList, UpdateVendorproducts } from '../../servicesapi/Vendorapi';
import { FcExpand } from 'react-icons/fc';
import { useLocation } from 'react-router-dom';
import { GetcustomerProductsPriceList, UpdateCustomerProduct } from '../../servicesapi/Customerapi';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ProductPricePopup from './ProductPricePopup';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
import { AiFillEye } from 'react-icons/ai';
import { FaSalesforce } from 'react-icons/fa';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<FcExpand sx={{ fontSize: '0.9rem' }} />} {...props} />)(
    ({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)'
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1)
        }
    })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '10px',
    borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const VendorProduct = (props) => {
    const { customization } = useSelector((state) => state);
    const dispatch = useDispatch();
    const location = useLocation();
    const [formType, setFormType] = useState(location.pathname === '/admin/viewvendor' ? 'vendor' : 'customer');
    const [expanded, setExpanded] = React.useState(false);
    const [productid, setProductid] = useState();
    const [open, setopen] = useState(false);
    const [viewData, setViewData] = useState({ nation: [], state: [], county: [] });
    const [Productseletected, setProductseletected] = useState('');
    const handleNext = () => {
        let status = false;
        let count = 0;
        props.productD.map((ele) => {
            console.log();
            if (ele.selected === true) {
                count = 1;
                // if (ele.price1 === 0 && formType === 'vendor') status = true;
                // if (ele.price2 === 0 && formType === 'vendor') status = true;
                // if (ele.price3 === 0 && formType === 'vendor') status = true;
            }
        });
        if (status || count === 0) toast.error('Please fill all the mandatory fields');
        else {
            props.setVendordata({ ...props.Vendordata, product: props.productD });
            props.setActiveStep((prev) => prev + 1);
        }
    };
    const handleClose = () => {
        setopen(false);
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
    const handleaccordianChange = (panel) => (event, isExpanded) => {
        setExpanded(panel);
    };
    const handleopen = (productid) => {
        let data = {};
        if (props.selecetedVedorId !== undefined) {
            if (formType === 'vendor') {
                GetVendorProductsPriceList(props.selecetedVedorId, productid, 0).then((res) => {
                    data.nation = res.data;
                    GetVendorProductsPriceList(props.selecetedVedorId, productid, 1).then((res) => {
                        let tempdata = [];
                        res.data.map((ele) => {
                            if (ele.selected) tempdata.push(ele);
                        });
                        data.state = tempdata;
                        GetVendorProductsPriceList(props.selecetedVedorId, productid, 2).then((res) => {
                            let tempdata = [];
                            res.data.map((ele) => {
                                if (ele.selected) tempdata.push(ele);
                            });
                            data.county = tempdata;
                            console.log(res);
                            setViewData(data);
                            setopen(true);
                        });
                    });
                });
            } else {
                GetcustomerProductsPriceList(props.selecetedVedorId, productid, 0).then((res) => {
                    data.nation = res.data;
                    GetcustomerProductsPriceList(props.selecetedVedorId, productid, 1).then((res) => {
                        let tempdata = [];
                        res.data.map((ele) => {
                            if (ele.selected) tempdata.push(ele);
                        });
                        data.state = tempdata;
                        GetcustomerProductsPriceList(props.selecetedVedorId, productid, 2).then((res) => {
                            let tempdata = [];
                            res.data.map((ele) => {
                                if (ele.selected) tempdata.push(ele);
                            });
                            data.county = tempdata;
                            console.log(res);
                            setViewData(data);
                            setopen(true);
                        });
                    });
                });
            }
        } else {
            setopen(true);
            console.log(props.productD, productid);
            let data;
            let tempdata;
            for (let i = 0; i < props.productD.length; i++) {
                if (props.productD[i].id === productid) {
                    data = props.productD[i];
                    break;
                }
            }
        }
    };
    return (
        <>
            {customization.dialogueview !== '' ? (
                <ProductPricePopup
                    selecetedVedorId={props.selecetedVedorId}
                    setProductD={props.setProductD}
                    productid={productid}
                    productD={props.productD}
                    formType={formType}
                    Productseletected={Productseletected}
                />
            ) : (
                ''
            )}
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
            <Grid container>
                {props.productdata.map((ele, indx) => {
                    if (ele.subCategory && ele.subCategory.length > 0) {
                        return (
                            <Accordion
                                expanded={expanded === `panel${indx}`}
                                onClick={handleaccordianChange(`panel${indx}`)}
                                sx={{ width: '49%', marginLeft: '5px' }}
                            >
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Typography style={{ fontWeight: '700' }}>{ele.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ maxHeight: '300px', overflowX: 'auto' }}>
                                    <Typography>
                                        {ele.subCategory.map((val, i) => {
                                            return (
                                                // <AccordionDetails>
                                                //     <Typography>
                                                <Grid container>
                                                    <Grid item md={5}>
                                                        {' '}
                                                        <FormControlLabel
                                                            style={{ minWidth: '132px' }}
                                                            control={<Android12Switch />}
                                                            label={val.name}
                                                            name="selected"
                                                            checked={val.selected}
                                                            disabled={props.editData}
                                                            onChange={(e) => handlechange(e, i, indx, val.id)}
                                                        />
                                                    </Grid>
                                                    {formType === 'vendor' ? (
                                                        <Grid item md={7}>
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                disabled={props.editData}
                                                                onClick={() => {
                                                                    if (val.selected) {
                                                                        setProductid(val.id);
                                                                        setProductseletected(ele);
                                                                        dispatch(setDialogueview('addproductprice'));
                                                                    } else toast.error('Please select the product');
                                                                }}
                                                            >
                                                                Add Product Price
                                                            </Button>
                                                            {/* {props.selecetedVedorId !== undefined ? (
                                                                <IconButton onClick={() => handleopen(val.id)}>
                                                                    <AiFillEye style={{ color: '#1e88e5' }} />
                                                                </IconButton>
                                                            ) : (
                                                                <></>
                                                            )} */}
                                                            {/* <Grid container spacing={3}>
                                                                <Grid item md={4}>
                                                                    <TextField
                                                                        inputProps={{
                                                                            inputMode: 'numeric',
                                                                            pattern: '[0-9]*'
                                                                        }}
                                                                        label="City"
                                                                        variant="outlined"
                                                                        disabled={props.editData}
                                                                        size="small"
                                                                        value={val.price1 || 0}
                                                                        name="price1"
                                                                        onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={4}>
                                                                   
                                                                    <TextField
                                                                        label="State"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        disabled={props.editData}
                                                                        value={val.price2}
                                                                        name="price2"
                                                                        onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={4}>
                                                                    {' '}
                                                                    <TextField
                                                                        label="Country"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        disabled={props.editData}
                                                                        name="price3"
                                                                        value={val.price3}
                                                                        onChange={(e) => handlechange(e, i, indx, val.id)}
                                                                    />
                                                                </Grid>
                                                            </Grid> */}
                                                        </Grid>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Grid>
                                                //     </Typography>
                                                // </AccordionDetails>
                                            );
                                        })}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
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

                <Button onClick={() => handleEditSubmit()} variant="contained" sx={{ m: 1, display: props.editData ? 'none' : 'block' }}>
                    Submit
                </Button>
            </Box>
            <Dialog open={open} fullWidth={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'end' }}>
                    {' '}
                    <button
                        type="button"
                        className="btn-close focus:shadow-none"
                        data-bs-dismiss="modal"
                        id="closePopup"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <i class="fas fa-times-circle"></i>
                    </button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <MainCard>
                            {viewData?.nation.length > 0 || viewData?.state.length > 0 || viewData?.county.length > 0 ? (
                                <Grid container>
                                    {viewData?.nation.length > 0 ? (
                                        <Grid md={12} sx={{ pb: 1 }}>
                                            <h2 style={{ fontSize: '25px', fontWeight: 700 }}>Nation-wise</h2>
                                            <Divider />
                                        </Grid>
                                    ) : (
                                        <></>
                                    )}
                                    {viewData?.nation.map((val, i) => {
                                        return (
                                            <Grid item key={i}>
                                                {val.name} ({val.price})
                                            </Grid>
                                        );
                                    })}
                                    {viewData?.state.length > 0 ? (
                                        <Grid md={12} sx={{ my: 2 }}>
                                            <h2 style={{ fontSize: '25px', fontWeight: 700 }}>State-wise</h2>
                                            <Divider />
                                        </Grid>
                                    ) : (
                                        <></>
                                    )}
                                    {viewData?.state.map((val, i) => {
                                        return (
                                            <Grid item key={i}>
                                                {val.name} ({val.price})
                                            </Grid>
                                        );
                                    })}
                                    {viewData?.county.length > 0 ? (
                                        <Grid md={12} sx={{ my: 2 }}>
                                            <h2 style={{ fontSize: '25px', fontWeight: 700 }}>County-wise</h2>
                                            <Divider />
                                        </Grid>
                                    ) : (
                                        <></>
                                    )}
                                    <Grid md={12} sx={{ my: 2 }}>
                                        {viewData?.county.map((val, i) => {
                                            return val.countylist.length > 0 ? (
                                                <SubCard title={val.name}>
                                                    {val.countylist.map((ele, i) => {
                                                        return (
                                                            <span>
                                                                {val.name} ({val.price})
                                                            </span>
                                                        );
                                                    })}
                                                </SubCard>
                                            ) : (
                                                <></>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            ) : (
                                'No Date Found'
                            )}
                        </MainCard>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default VendorProduct;
