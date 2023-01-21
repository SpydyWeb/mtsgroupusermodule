import React, { useEffect, useState } from 'react';
import { Grid, Link, TextField, Select, InputLabel, FormControl, MenuItem, Button } from '@mui/material';
import Loader from 'ui-component/Loader';
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerdata } from 'store/action/customerAction';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { AiFillEye, AiOutlineSearch } from 'react-icons/ai';
import { customersearchfield, initailSearchState } from './utilities';
import { getStatedata, getVendordata } from 'store/action/vendorAction';
const ViewTable = () => {
    const [filterdata, setFilterdata] = useState(initailSearchState);

    const handleFilterChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFilterdata({ ...filterdata, [name]: value });
    };
    const Vendorcolumns = [
        {
            headerName: 'Status',
            field: 'status',
            renderCell: (params) => {
                return params.row.status ? (
                    <span className="border-2 border-green-400 p-[2px] rounded-sm text-green-400">Active</span>
                ) : (
                    <span className="border-2 border-red-400 p-[2px] rounded-sm text-red-400">InActive</span>
                );
            }
        },
        { headerName: 'ID', field: 'vendorid', minWidth: 150, flex: 1 },
        { headerName: 'Name', field: 'name', minWidth: 150, flex: 1 },
        { headerName: 'Email', field: 'email', minWidth: 300, flex: 1 },
        { headerName: 'State', field: 'state', minWidth: 150, flex: 1 },
        { headerName: 'Contact', field: 'contact', minWidth: 300, flex: 1 },
        { headerName: 'Licence', field: 'licenceType', minWidth: 150, flex: 1 },
        { headerName: 'Product', field: 'product', minWidth: 150, flex: 1 },
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <div className="gap-3 d-flex">
                        <AiFillEye
                            className="hover:cursor-pointer"
                            size={20}
                            style={{ color: '#03a5e7' }}
                            onClick={() => {
                                GetmoreData(params.id);
                            }}
                        />
                    </div>
                );
            }
        }
    ];
    const Customercolumns = [
        { headerName: 'ID', field: 'vendorid', minWidth: 150, flex: 1 },
        { headerName: 'Name', field: 'name', minWidth: 150, flex: 1 },
        { headerName: 'Email', field: 'email', minWidth: 300, flex: 1 },
        { headerName: 'State', field: 'state', minWidth: 150, flex: 1 },
        { headerName: 'Contact', field: 'contact', minWidth: 300, flex: 1 },
        { headerName: 'Product', field: 'product', minWidth: 150, flex: 1 },
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <div className="gap-3 d-flex">
                        <AiFillEye
                            className="hover:cursor-pointer"
                            size={20}
                            style={{ color: '#03a5e7' }}
                            onClick={() => {
                                GetmoreData(params.id);
                            }}
                        />
                    </div>
                );
            }
        }
    ];
    const handleSearch = () => {
        let data = {};
        if (filterdata.Id !== '') data.id = filterdata.Id;
        if (filterdata.Name !== '') data.name = filterdata.Name;
        if (filterdata.Email !== '') data.email = filterdata.Email;
        // if (filterdata.Status !== "") data.status = filterdata.Status;
        if (filterdata.Contact !== '') data.contact = filterdata.Contact;
        if (filterdata.Licence !== '') data.licence = filterdata.Licence;
        if (filterdata.State !== '') data.state = filterdata.State;
        if (filterdata.Product !== '') data.product = filterdata.Product;
        dispatch(getCustomerdata(data));
    };
    const dispatch = useDispatch();
    const { customerData, VendorData, customization } = useSelector((state) => state);
    useEffect(() => {
        if (customization.isOpen.includes('customer')) dispatch(getCustomerdata({}));
        else dispatch(getVendordata({ status: true }));
        dispatch(getStatedata());
    }, [customization.isOpen[0]]);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs sm>
                <MainCard>
                    <Grid container spacing={2}>
                        {customersearchfield.map((ele) => {
                            return (
                                <Grid item key={ele.name}>
                                    {ele.type === 'textbox' && ele.name !== 'Licence' ? (
                                        <TextField
                                            id={ele.name}
                                            label={ele.label}
                                            name={ele.name}
                                            value={filterdata[ele.name]}
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => handleFilterChange(e)}
                                        />
                                    ) : ele.type === 'textbox' && customization.isOpen.includes('vendor') ? (
                                        <TextField
                                            id={ele.name}
                                            label={ele.label}
                                            name={ele.name}
                                            value={filterdata[ele.name]}
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => handleFilterChange(e)}
                                        />
                                    ) : ele.type === 'select' ? (
                                        <FormControl sx={{ width: '180px' }} fullWidth={true} size="small">
                                            <InputLabel>{ele.label}</InputLabel>
                                            <Select value={filterdata[ele.name]} name={ele.name} onChange={(e) => handleFilterChange(e)}>
                                                {VendorData.stateData.map((ele) => {
                                                    return (
                                                        <MenuItem value={ele.name} key={ele.name}>
                                                            {ele.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <></>
                                    )}
                                </Grid>
                            );
                        })}
                        <Grid item>
                            {' '}
                            <Button variant="contained" onClick={() => handleSearch()}>
                                <AiOutlineSearch size={18} /> &nbsp; Search
                            </Button>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={12}>
                {(customization.isOpen.includes('customer') ? customerData.loader : VendorData.loader) ? (
                    <Loader />
                ) : (
                    <DataGrid
                        sx={{ height: '60vh' }}
                        rows={customization.isOpen.includes('customer') ? customerData.customersData : VendorData.vendorData}
                        columns={customization.isOpen.includes('customer') ? Customercolumns : Vendorcolumns}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 }
                            }
                        }}
                        components={{ Toolbar: GridToolbar }}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default ViewTable;
