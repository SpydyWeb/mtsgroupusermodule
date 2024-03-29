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
    UpdateCustomerNationProduct,
    GetcustomerProductsPriceList
} from 'servicesapi/Customerapi';
import SubCard from 'ui-component/cards/SubCard';

// const steps = ['State List', 'County List', 'Zipcode List'];
const steps = ['Nation-wise', 'State-wise', 'County-wise'];

const ProductPricePopup = (props) => {
    const dispatch = useDispatch();
    const [stateList, setStateList] = useState([]);
    const [countyList, setCountyList] = useState([]);
    const [countyerrmsg, setCountyerrmsg] = useState('');
    const [nationList, setnationList] = useState([]);
    const [checkboxData, setCheckboxData] = useState({
        state: [],
        county: [],
        nation: []
    });
    const [selectedStates, setSelectedStates] = useState([]);
    const [viewstatecounty, setViewstatecounty] = useState(0);
    const [viewState, setViewState] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let data = [...props.Productseletected?.subCategory];
        let selected = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === props.productid) {
                if (data[i].productPriceList === null) {
                    selected = 0;
                    break;
                }
                selected = data[i].productPriceList[0]?.cityStateType;
                break;
            }
        }
        if (selected === 0 || selected === undefined) {
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
            if (
                data[i].id === props.productid &&
                data[i].productPriceList !== null &&
                data[i].productPriceList[0]?.price !== 0 &&
                data[i].productPriceList.length > 0
            ) {
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
        let formvalue = [...new Set(checkboxData.state)];
        setLoading(true);
        setCheckboxData({ ...checkboxData, state: formvalue });
        setCountyList([]);
        GetCountyList(formvalue).then((res) => {
            let msg = '';
            let tempdata = selectedStates;
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
                for (let i = 0; i < selectedStates.length; i++) {
                    if (selectedStates[i].id === ele.stateId) {
                        let status = false;
                        for (let j = 0; j < tempdata.length; j++) {
                            if (tempdata[i].countylist === undefined) break;
                            else {
                                for (let k = 0; k < tempdata[i].countylist.length; k++) {
                                    if (tempdata[i].countylist[k].id === ele.id) {
                                        status = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (status === false) {
                            if (tempdata[i].countylist === undefined) tempdata[i]['countylist'] = [ele];
                            else tempdata[i]['countylist'].push(ele);
                        }
                    }
                }
            });
            console.log(tempdata, selectedStates);

            setCountyList(tempdata);

            if (res.data.length === 0) msg = 'Selected state has no county. Please select other states';
            else msg = '';
            setCountyerrmsg(msg);
            setLoading(false);
        });
    };
    const GetStateListData = (type = 1) => {
        let data;
        setLoading(true);
        for (let i = 0; i < props.productD.length; i++) {
            if (props.productD[i].id === props.productid) {
                data = props.productD[i];
                break;
            }
        }
        GetStateListBynation([1]).then((res) => {
            if (props?.selecetedVedorId) {
                if (props.formType === 'vendor') {
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
                            let tempdata = [];
                            setCheckboxData({ ...checkboxData, state: data });
                            let countyData = [];
                            console.log(countyData, res1, tempdata);
                            for (let i = 0; i < res1.data.length; i++) {
                                if (res1.data[i].isChecked) {
                                    countyData = [...countyData, res1.data[i]];
                                }
                            }
                            console.log(countyData);
                            for (let i = 0; i < countyData.length; i++) {
                                for (let j = 0; j < countyData[i].countylist.length; j++) {
                                    if (countyData[i].countylist[j].price > 0) {
                                        countyData[i].countylist[j].isChecked = true;
                                    } else {
                                        countyData[i].countylist[j].price = '';
                                        countyData[i].countylist[j].isChecked = false;
                                    }
                                }
                            }

                            setCountyList(countyData);
                        }
                        setStateList(res1.data);
                    });
                } else {
                    GetcustomerProductsPriceList(props.selecetedVedorId, props.productid, type).then((res1) => {
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
                            let tempdata = [];
                            setCheckboxData({ ...checkboxData, state: data });
                            let countyData = [];
                            console.log(countyData, res1, tempdata);
                            for (let i = 0; i < res1.data.length; i++) {
                                if (res1.data[i].isChecked) {
                                    countyData = [...countyData, res1.data[i]];
                                }
                            }
                            console.log(countyData);
                            for (let i = 0; i < countyData.length; i++) {
                                for (let j = 0; j < countyData[i].countylist.length; j++) {
                                    if (countyData[i].countylist[j].price > 0) {
                                        countyData[i].countylist[j].isChecked = true;
                                    } else {
                                        countyData[i].countylist[j].price = '';
                                        countyData[i].countylist[j].isChecked = false;
                                    }
                                }
                            }

                            setCountyList(countyData);
                        }
                        setStateList(res1.data);
                    });
                }
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
            setLoading(false);
        });
    };
    const handlePrevious = () => {
        setViewstatecounty(viewstatecounty - 1);
    };
    const handleChange = (id, type = '', value = '', indx = '') => {
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
            console.log('else if');
            let selectedstate = checkboxData.state;
            let data = [...stateList];
            let states = selectedStates;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    if (type === 'price') data[i].price = value;
                    else data[i].isChecked = !data[i].isChecked;
                    if (data[i].isChecked) {
                        selectedstate.push(id);
                        states.push({ id: id, ['name']: data[i].name });
                    } else {
                        selectedstate.splice(selectedstate.indexOf(id), 1);
                        states.splice(states.indexOf(id), 1);
                    }
                    setCheckboxData({ ...checkboxData, state: selectedstate });
                    setStateList(data);
                    console.log(states);
                    setSelectedStates(states);
                    break;
                }
            }
        } else {
            let selectedstate = checkboxData.county;
            let data = [...countyList];
            for (let i = 0; i < data[indx]?.countylist.length; i++) {
                if (data[indx]?.countylist[i].id === id) {
                    if (type === 'price') data[indx].countylist[i].price = value;
                    else data[indx].countylist[i].isChecked = !data[indx]?.countylist[i].isChecked;
                    if (data[indx]?.countylist[i].isChecked) {
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
    const handleSubmit = (type = '') => {
        let data = [];

        if (viewState === 0) {
            if (type === '')
                nationList.map((ele) => {
                    if (ele.isChecked) data.push({ price: +ele.price, cityStateType: 0, cityStateId: ele.id });
                });
            if (props.selecetedVedorId !== undefined) {
                if (props.formType === 'vendor') {
                    UpdateVendorNationProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('Nation wise price saved successfully');
                            let selectedData = props.Productseletected.subCategory;
                            for (let i = 0; i < selectedData.length; i++) {
                                if (props.productid === selectedData[i].id) {
                                    selectedData[i].productPriceList = data;
                                    if (type === 'remove') {
                                        selectedData[i].selected = false;
                                        selectedData[i].productPriceList = null;
                                    }
                                }
                            }

                            props.setProductseletected(selectedData);
                        }
                    });
                } else {
                    UpdateCustomerNationProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('Nation wise price saved successfully');
                            let selectedData = props.Productseletected.subCategory;
                            for (let i = 0; i < selectedData.length; i++) {
                                if (props.productid === selectedData[i].id) {
                                    selectedData[i].productPriceList = data;
                                    if (type === 'remove') {
                                        selectedData[i].selected = false;
                                        selectedData[i].productPriceList = null;
                                    }
                                }
                            }
                            props.setProductseletected(selectedData);
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
                // let selectedData = props.Productseletected;
                // selectedData.subCategory = data;

                props.setProductD(product);
                // props.setProductseletected(selectedData);
                toast.success('Nation wise price saved successfully');
            }
        } else if (viewState === 1) {
            if (type === '')
                stateList.map((ele) => {
                    if (ele.isChecked) data.push({ price: +ele.price, cityStateType: 1, cityStateId: ele.id });
                });
            if (props.selecetedVedorId !== undefined) {
                if (props.formType === 'vendor') {
                    UpdateVendorStateProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('State wise price saved successfully');
                            let selectedData = props.Productseletected.subCategory;
                            for (let i = 0; i < selectedData.length; i++) {
                                if (props.productid === selectedData[i].id) {
                                    selectedData[i].productPriceList = data;
                                    if (type === 'remove') {
                                        selectedData[i].selected = false;
                                        selectedData[i].productPriceList = null;
                                    }
                                }
                            }
                            props.setProductseletected(selectedData);
                        }
                    });
                } else {
                    UpdatecustomerStateProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('State wise price saved successfully');
                            let selectedData = props.Productseletected.subCategory;
                            for (let i = 0; i < selectedData.length; i++) {
                                if (props.productid === selectedData[i].id) {
                                    selectedData[i].productPriceList = data;
                                    if (type === 'remove') {
                                        selectedData[i].selected = false;
                                        selectedData[i].productPriceList = null;
                                    }
                                }
                            }
                            props.setProductseletected(selectedData);
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

                props.setProductD(product);

                toast.success('State wise price saved successfully');
            }
        } else {
            if (type === '')
                countyList.map((val) => {
                    val.countylist.map((ele) => {
                        if (ele.isChecked) data.push({ price: +ele.price, cityStateType: 2, cityStateId: ele.id });
                    });
                });
            if (props.selecetedVedorId !== undefined) {
                if (props.formType === 'vendor') {
                    UpdateVendorCountyProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('County wise price saved successfully');
                            let selectedData = props.Productseletected.subCategory;
                            for (let i = 0; i < selectedData.length; i++) {
                                if (props.productid === selectedData[i].id) {
                                    selectedData[i].productPriceList = data;
                                    if (type === 'remove') {
                                        selectedData[i].selected = false;
                                        selectedData[i].productPriceList = null;
                                    }
                                }
                            }
                            props.setProductseletected(selectedData);
                        }
                    });
                } else {
                    UpdatecustomerCountyProduct(data, props.selecetedVedorId, props.productid).then((res) => {
                        if (res.status === 200) {
                            toast.success('County wise price saved successfully');
                            let selectedData = props.Productseletected.subCategory;
                            for (let i = 0; i < selectedData.length; i++) {
                                if (props.productid === selectedData[i].id) {
                                    selectedData[i].productPriceList = data;
                                    if (type === 'remove') {
                                        selectedData[i].selected = false;
                                        selectedData[i].productPriceList = null;
                                    }
                                }
                            }
                            props.setProductseletected(selectedData);
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
                // props.setProductseletected(selectedData);
                toast.success('County wise price saved successfully');
            }
        }
        setViewState(0);
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
                    {loading ? (
                        <div className="text-lg text-center">Loading...</div>
                    ) : viewState === 0 ? (
                        nationList.map((ele) => {
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
                                            disabled={!ele.isChecked}
                                            label="Price"
                                            size="small"
                                            value={ele.price}
                                            onChange={(e) => handleChange(ele.id, 'price', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })
                    ) : viewState === 1 ? (
                        stateList.map((ele) => {
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
                                            disabled={!ele.isChecked}
                                            label="Price"
                                            size="small"
                                            value={ele.price}
                                            onChange={(e) => handleChange(ele.id, 'price', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })
                    ) : viewstatecounty === 0 ? (
                        stateList.map((ele) => {
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
                    ) : countyList.length > 0 ? (
                        countyList?.map((val, i) => {
                            return (
                                <div style={{ width: '100%' }}>
                                    <SubCard title={val.name}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '3px' }}>
                                            {val.countylist?.map((ele, ind) => {
                                                return (
                                                    <Grid container md={6} sx={{ mb: 1 }} key={ind}>
                                                        <Grid item md={1}>
                                                            <Checkbox
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                defaultChecked={ele.isChecked}
                                                                checked={ele.isChecked}
                                                                onClick={(e) => handleChange(ele.id, 'check', '', i)}
                                                                value={ele.id}
                                                            />
                                                        </Grid>
                                                        <Grid item md={5} sx={{ display: 'flex', alignItems: 'center' }}>
                                                            {ele.city}
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <TextField
                                                                disabled={!ele.isChecked}
                                                                label="Price"
                                                                size="small"
                                                                value={ele.price}
                                                                onChange={(e) => handleChange(ele.id, 'price', e.target.value, i)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                );
                                            })}
                                        </div>
                                    </SubCard>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ fontSize: '1rem' }}>{countyerrmsg}</p>
                    )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: '5px' }}>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleSubmit('remove')}>
                        Delete Price
                    </Button>
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
