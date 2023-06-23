import React, { useEffect, useState } from 'react';
import TransDialoague from 'ui-component/DialogueBox/TransDialoague';
import { Box, TextField, Button, CircularProgress, Grid, Checkbox, Stepper, Step, StepLabel, IconButton, Tabs, Tab } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogueview } from 'store/action/actions';
import {
    GetStateList,
    GetCountyList,
    AddVendorProductPrice,
    GetNationList,
    GetStateListBynation,
    AddVendorNationProduct,
    AddVendorStateProduct,
    AddVendorCountyProduct,
    UpdateVendorStateProduct,
    UpdateVendorCountyProduct,
    GetVendorProductsPriceList,
    UpdateVendorNationProduct
} from 'servicesapi/Vendorapi';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { toast } from 'react-hot-toast';
import {
    AddcustomerNationProduct,
    UpdatecustomerCountyProduct,
    UpdatecustomerStateProduct,
    UpdateCustomerNationProduct
} from 'servicesapi/Customerapi';

// const steps = ['State List', 'County List', 'Zipcode List'];
const steps = ['Nation-wise', 'State-wise', 'County-wise'];

const ProductPricePopup = (props) => {
    const dispatch = useDispatch();
    const [stateList, setStateList] = useState([]);
    const [countyList, setCountyList] = useState([]);
    const [nationList, setnationList] = useState([]);
    const [checkboxData, setCheckboxData] = useState({
        state: [],
        county: [],
        nation: []
    });
    const [viewstatecounty, setViewstatecounty] = useState(0);
    const [viewState, setViewState] = useState(0);
    useEffect(() => {
        let data = [...props.Productseletected?.subCategory];
        let selected;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === props.productid) {
                if (data[i].productPriceList === null) {
                    selected = 0;
                    break;
                }
                selected = data[i].productPriceList[0].cityStateType;
                break;
            }
        }
        console.log(selected, data);
        if (selected === 0) {
            GetNationListData();
            setViewState(0);
        } else if (selected === 1) {
            GetStateListData(1);
            setViewState(1);
        } else {
            GetStateListData(2);
            setViewState(2);
            setViewstatecounty(1);
        }
    }, []);
    const GetNationListData = () => {
        GetNationList().then((res) => {
            let data;
            for (let i = 0; i < props.productD.length; i++) {
                if (props.productD[i].id === props.productid) {
                    data = props.productD[i];
                    break;
                }
            }
            if (props?.selecetedVedorId) {
                GetVendorProductsPriceList(props.selecetedVedorId, props.productid, 0).then((res1) => {
                    res1.data.map((ele) => {
                        if (ele.selected && ele.price > 0) {
                            ele['price'] = ele.price;
                            ele['isChecked'] = true;
                        } else {
                            ele['price'] = '';
                            ele['isChecked'] = false;
                        }
                    });
                    setnationList(res1.data);
                });
            } else {
                res.data.map((ele) => {
                    if (data?.productPriceList === undefined || data === undefined) {
                        ele['price'] = '';
                        ele['isChecked'] = false;
                    } else {
                        for (let i = 0; i < data.productPriceList.length; i++) {
                            if (data.productPriceList[i].cityStateType === 0 && data.productPriceList[i].cityStateId === ele.id) {
                                ele['price'] = data.productPriceList[i].price;
                                ele['isChecked'] = true;
                                break;
                            } else {
                                ele['price'] = '';
                                ele['isChecked'] = false;
                            }
                        }
                    }
                });
                setnationList(res.data);
            }
        });
    };
    const handleNext = (event, newValue) => {
        let data = [...props.Productseletected?.subCategory];
        let selected = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === props.productid && data[i].productPriceList !== null) {
                selected = data[i].productPriceList[0].cityStateType;
                break;
            }
        }
        if (selected === '') {
            setViewstatecounty(0);
            setViewState(newValue);
            if (newValue === 0) GetNationListData();
            else {
                GetStateListData();
            }
        } else {
            toast.error('You can only have one price ');
        }
    };
    const getContyListdata = () => {
        let data;
        for (let i = 0; i < props.productD.length; i++) {
            if (props.productD[i].id === props.productid) {
                data = props.productD[i];
                break;
            }
        }
        GetCountyList(checkboxData.state).then((res) => {
            res.data.map((ele) => {
                if (data?.productPriceList === undefined || data === undefined) {
                    ele['price'] = '';
                    ele['isChecked'] = false;
                } else {
                    for (let i = 0; i < data.productPriceList.length; i++) {
                        if (data.productPriceList[i].cityStateType === 0 && data.productPriceList[i].cityStateId === ele.id) {
                            ele['price'] = data.productPriceList[i].price;
                            ele['isChecked'] = true;
                            break;
                        } else {
                            ele['price'] = '';
                            ele['isChecked'] = false;
                        }
                    }
                }
            });
            setCountyList(res.data);
        });
    };
    const GetStateListData = (type = 1) => {
        let data;
        for (let i = 0; i < props.productD.length; i++) {
            if (props.productD[i].id === props.productid) {
                data = props.productD[i];
                break;
            }
        }
        GetStateListBynation([1]).then((res) => {
            if (props?.selecetedVedorId) {
                GetVendorProductsPriceList(props.selecetedVedorId, props.productid, type).then((res1) => {
                    let data = [];
                    res1.data.map((ele) => {
                        if (type === 1) {
                            if (ele.selected && ele.price > 0) {
                                ele['price'] = ele.price;
                                ele['isChecked'] = true;
                            } else {
                                ele['price'] = '';
                                ele['isChecked'] = false;
                            }
                        } else {
                            if (ele.selected) {
                                data.push(ele.id);
                                ele['isChecked'] = true;
                            } else {
                                ele['isChecked'] = false;
                            }
                        }
                    });
                    if (type === 2) {
                        setCheckboxData({ ...checkboxData, state: data });
                        let countyData = [];
                        for (let i = 0; i < res1.data.length; i++) {
                            if (res1.data[i].isChecked) countyData = [...countyData, ...res1.data[i].countylist];
                        }

                        for (let i = 0; i < countyData.length; i++) {
                            if (countyData[i].price > 0) {
                                countyData[i].isChecked = true;
                            } else {
                                countyData[i].price = '';
                                countyData[i].isChecked = false;
                            }
                        }

                        setCountyList(countyData);
                    }
                    setStateList(res1.data);
                });
            } else {
                res.data.map((ele) => {
                    if (data?.productPriceList === undefined || data === undefined) {
                        ele['price'] = '';
                        ele['isChecked'] = false;
                    } else {
                        for (let i = 0; i < data.productPriceList.length; i++) {
                            if (data.productPriceList[i].cityStateType === 1 && data.productPriceList[i].cityStateId === ele.id) {
                                ele['price'] = data.productPriceList[i].price;
                                ele['isChecked'] = true;
                                break;
                            } else {
                                ele['price'] = '';
                                ele['isChecked'] = false;
                            }
                        }
                    }
                });
                setStateList(res.data);
            }
        });
    };
    const handlePrevious = () => {
        setViewstatecounty(viewstatecounty - 1);
    };
    const handleChange = (id, type = '', value = '') => {
        if (viewState === 0) {
            let selectedstate = checkboxData.nation;
            let data = [...nationList];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    if (type === 'price') data[i].price = value;
                    else data[i].isChecked = !data[i].isChecked;
                    if (data[i].isChecked) {
                        selectedstate.push(id);
                    } else {
                        selectedstate.splice(selectedstate.indexOf(id), 1);
                    }
                    setCheckboxData({ ...checkboxData, nation: selectedstate });
                    setnationList(data);
                    break;
                }
            }
        } else if (viewState === 1 || (viewState === 2 && viewstatecounty === 0)) {
            let selectedstate = checkboxData.state;
            let data = [...stateList];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    if (type === 'price') data[i].price = value;
                    else data[i].isChecked = !data[i].isChecked;
                    if (data[i].isChecked) {
                        selectedstate.push(id);
                    } else {
                        selectedstate.splice(selectedstate.indexOf(id), 1);
                    }
                    setCheckboxData({ ...checkboxData, state: selectedstate });
                    setStateList(data);
                    break;
                }
            }
        } else {
            let selectedstate = checkboxData.county;
            let data = [...countyList];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    if (type === 'price') data[i].price = value;
                    else data[i].isChecked = !data[i].isChecked;
                    if (data[i].isChecked) {
                        selectedstate.push(id);
                    } else {
                        selectedstate.splice(selectedstate.indexOf(id), 1);
                    }
                    setCheckboxData({ ...checkboxData, county: selectedstate });
                    setCountyList(data);
                    break;
                }
            }
        }
    };
    const handleSubmit = () => {
        let data = [];

        if (viewState === 0) {
            nationList.map((ele) => {
                if (ele.isChecked) data.push({ price: +ele.price, cityStateType: 0, cityStateId: ele.id });
            });
            if (props.selecetedVedorId !== undefined) {
                if (props.formType === 'vendor') {
                    UpdateVendorNationProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('Nation wise price saved successfully');
                        }
                    });
                } else {
                    UpdateCustomerNationProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('Nation wise price saved successfully');
                        }
                    });
                }
            } else {
                let index = 0;
                let product = [...props.productD];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].id === props.productid) {
                        index = i;
                        break;
                    }
                }
                if (product[index].productPriceList !== undefined) {
                    let tempdata = product[index].productPriceList;
                    if (tempdata !== undefined) {
                        for (let i = 0; i < product[index].productPriceList.length; i++) {
                            if (product[index].productPriceList[i].cityStateType === 0) {
                                tempdata.splice(i, 1);
                            } else {
                                data.push(product[index].productPriceList[i]);
                            }
                        }
                    }
                }
                product[index]['productPriceList'] = data;
                props.setProductD(product);
                toast.success('Nation wise price saved successfully');
            }
        } else if (viewState === 1) {
            console.log('hitt');
            stateList.map((ele) => {
                if (ele.isChecked) data.push({ price: +ele.price, cityStateType: 1, cityStateId: ele.id });
            });
            if (props.selecetedVedorId !== undefined) {
                if (props.formType === 'vendor') {
                    UpdateVendorStateProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('State wise price saved successfully');
                        }
                    });
                } else {
                    UpdatecustomerStateProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('State wise price saved successfully');
                        }
                    });
                }
            } else {
                let index = 0;
                let product = [...props.productD];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].id === props.productid) {
                        index = i;
                        break;
                    }
                }
                if (product[index].productPriceList !== undefined) {
                    let tempdata = product[index].productPriceList;
                    if (tempdata !== undefined) {
                        for (let i = 0; i < product[index].productPriceList.length; i++) {
                            if (product[index].productPriceList[i].cityStateType === 1) {
                                tempdata.splice(i, 1);
                            } else {
                                data.push(product[index].productPriceList[i]);
                            }
                        }
                    }
                }
                product[index]['productPriceList'] = data;
                console.log();
                props.setProductD(product);
                toast.success('State wise price saved successfully');
            }
        } else {
            countyList.map((ele) => {
                if (ele.isChecked) data.push({ price: +ele.price, cityStateType: 2, cityStateId: ele.id });
            });
            if (props.selecetedVedorId !== undefined) {
                if (props.formType === 'vendor') {
                    UpdateVendorCountyProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('County wise price saved successfully');
                        }
                    });
                } else {
                    UpdatecustomerCountyProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('County wise price saved successfully');
                        }
                    });
                }
            } else {
                let index = 0;
                let product = [...props.productD];
                for (let i = 0; i < product.length; i++) {
                    if (product[i].id === props.productid) {
                        index = i;
                        break;
                    }
                }
                if (product[index].productPriceList !== undefined) {
                    let tempdata = product[index].productPriceList;
                    if (tempdata !== undefined) {
                        for (let i = 0; i < product[index].productPriceList.length; i++) {
                            if (product[index].productPriceList[i].cityStateType === 2) {
                                tempdata.splice(i, 1);
                            } else {
                                data.push(product[index].productPriceList[i]);
                            }
                        }
                    }
                }
                product[index]['productPriceList'] = data;
                props.setProductD(product);
                toast.success('County wise price saved successfully');
            }
        }
        dispatch(setDialogueview(''));
    };
    const handlecountynext = () => {
        setViewstatecounty(viewstatecounty + 1);
        getContyListdata();
    };
    return (
        <TransDialoague
            dialogTitle={
                <Tabs value={viewState} onChange={handleNext} centered>
                    {steps.map((val) => (
                        <Tab label={val} />
                    ))}
                </Tabs>
            }
            maxWidth={'md'}
            fullWidth={true}
        >
            <MainCard>
                {viewState === 2 && viewstatecounty === 0 ? 'Please select state' : ''}
                <Grid container>
                    {viewState === 0
                        ? nationList.map((ele) => {
                              return (
                                  <Grid container md={6} sx={{ mb: 1 }}>
                                      <Grid item md={1}>
                                          <Checkbox
                                              inputProps={{ 'aria-label': 'controlled' }}
                                              defaultChecked={ele.isChecked}
                                              checked={ele.isChecked}
                                              onClick={(e) => handleChange(ele.id)}
                                              value={ele.id}
                                          />
                                      </Grid>
                                      <Grid item md={5} sx={{ display: 'flex', alignItems: 'center' }}>
                                          {ele.name}
                                      </Grid>
                                      <Grid item md={6}>
                                          <TextField
                                              label="Price"
                                              size="small"
                                              value={ele.price}
                                              onChange={(e) => handleChange(ele.id, 'price', e.target.value)}
                                          />
                                      </Grid>
                                  </Grid>
                              );
                          })
                        : viewState === 1
                        ? stateList.map((ele) => {
                              return (
                                  <Grid container md={6} sx={{ mb: 1 }}>
                                      <Grid item md={1}>
                                          <Checkbox
                                              inputProps={{ 'aria-label': 'controlled' }}
                                              defaultChecked={ele.isChecked}
                                              checked={ele.isChecked}
                                              onClick={(e) => handleChange(ele.id)}
                                              value={ele.id}
                                          />
                                      </Grid>
                                      <Grid item md={5} sx={{ display: 'flex', alignItems: 'center' }}>
                                          {ele.name}
                                      </Grid>
                                      <Grid item md={6}>
                                          <TextField
                                              label="Price"
                                              size="small"
                                              value={ele.price}
                                              onChange={(e) => handleChange(ele.id, 'price', e.target.value)}
                                          />
                                      </Grid>
                                  </Grid>
                              );
                          })
                        : viewstatecounty === 0
                        ? stateList.map((ele) => {
                              return (
                                  <Grid container md={4}>
                                      <Grid item md={2}>
                                          <Checkbox
                                              inputProps={{ 'aria-label': 'controlled' }}
                                              defaultChecked={ele.isChecked}
                                              checked={ele.isChecked}
                                              onClick={(e) => handleChange(ele.id, 'check')}
                                              value={ele.id}
                                          />
                                      </Grid>
                                      <Grid item md={10} sx={{ display: 'flex', alignItems: 'center' }}>
                                          {ele.name}
                                      </Grid>
                                      {/* <Grid item md={6}>
                                          <TextField
                                              label="Price"
                                              size="small"
                                              value={ele.price}
                                              onChange={(e) => handleChange(ele.id, 'price', e.target.value)}
                                          />
                                      </Grid> */}
                                  </Grid>
                              );
                          })
                        : countyList.map((ele) => {
                              return (
                                  <Grid container md={6} sx={{ mb: 1 }}>
                                      <Grid item md={1}>
                                          <Checkbox
                                              inputProps={{ 'aria-label': 'controlled' }}
                                              defaultChecked={ele.isChecked}
                                              checked={ele.isChecked}
                                              onClick={(e) => handleChange(ele.id, 'check')}
                                              value={ele.id}
                                          />
                                      </Grid>
                                      <Grid item md={5} sx={{ display: 'flex', alignItems: 'center' }}>
                                          {ele.city}
                                      </Grid>
                                      <Grid item md={6}>
                                          <TextField
                                              label="Price"
                                              size="small"
                                              value={ele.price}
                                              onChange={(e) => handleChange(ele.id, 'price', e.target.value)}
                                          />
                                      </Grid>
                                  </Grid>
                              );
                          })}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: '5px' }}>
                    {viewState === 2 && viewstatecounty !== 0 ? (
                        <Button variant="outlined" color="primary" size="small" onClick={() => handlePrevious()}>
                            Previous
                        </Button>
                    ) : (
                        ''
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => (viewState === 2 && viewstatecounty === 0 ? handlecountynext() : handleSubmit())}
                    >
                        {viewState === 2 && viewstatecounty === 0 ? 'Next' : 'Submit'}
                    </Button>
                </Box>
            </MainCard>
        </TransDialoague>
    );
};

export default ProductPricePopup;
