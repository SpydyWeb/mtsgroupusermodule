import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    SpeedDial
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { CustomerSearch, GetCustomerDetaills, DownloadFile } from '../../servicesapi/Customerapi';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GetallVendorBySearch, Getvendorbyid, GetStateList } from '../../servicesapi/Vendorapi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AiFillEye, AiOutlineSearch, AiFillCloseCircle, AiOutlinePlus, AiOutlineClose, AiFillEdit, AiOutlineMail } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import EditModal from './EditModal';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useLocation } from 'react-router-dom';
import { MdSimCardDownload } from 'react-icons/md';
import toast from 'react-hot-toast';
import TabPanel from '../Common/TabPanel';
import { a11yProps } from '../Common/renderutil';
import { IoMdCall } from 'react-icons/io';
import { AiFillMail, AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';
import EnhancedTable from './EnhancedTable';
import { TabLink, TabLinkContent, TabLinkList, Tabs } from './Style component/StepperStyledComponents';
function Row(props) {
    const { vendorDetail, setVendorDetail, formType, open } = props;
    const [value, setValue] = React.useState(0);
    console.log();
    const [editView, setEditView] = useState(0);
    const [editModalOpen, seteditModalOpen] = useState(false);
    const handleopenEditmodal = (event, view) => {
        event.stopPropagation();
        setEditView(view);
        seteditModalOpen(!editModalOpen);
    };
    const [editData, setEditData] = useState(true);
    const handleChange = (newValue) => {
        setValue(newValue);
        setEditView(newValue);
        setEditData(true);
    };
    const tabsCutomerName = ['Profile', 'Communication', 'Product', 'Additional', 'Customer Integration Details', 'File Upload'];

    const tabsVendorName = ['Profile', 'Communication', 'Product', 'Additional', 'Licence', 'File Upload'];
    return (
        <React.Fragment>
            <Box>
                <div className={`flex ${formType === 'customer' ? 'justify-between' : 'justify-end'}  cursor-pointer gap-2`}></div>
                {/* <Grid container sx={{ borderRadius: '15px', background: 'gainsboro', pb: 1 }} spacing={2}>
                    <Grid item md={3}>
                        <Box sx={{ display: 'flex', gap: '2px' }}>
                            {open ? (
                                <div className="flex items-center gap-1">
                                    {formType === 'customer' ? (
                                        <MdSimCardDownload size={25} color="blue" onClick={() => dowloadFile()} />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                            {props.formType === 'vendor' ? vendorDetail.vendorId : vendorDetail.customeruserId}-{vendorDetail.name}
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        {' '}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaUser style={{ fontSize: '15px', color: 'cornflowerblue' }} />{' '}
                            <Box component={'span'}>
                                {vendorDetail.primery_Contact.firstName} {vendorDetail.primery_Contact.lastName}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <IoMdCall style={{ fontSize: '18px', color: 'cornflowerblue' }} />
                            <Box component={'span'}> {vendorDetail.primery_Contact.phone}</Box>
                        </Box>
                    </Grid>

                    <Grid item md={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <AiFillMail style={{ fontSize: '18px', color: 'cornflowerblue' }} />
                            <Box component={'span'}> {vendorDetail.primery_Contact.email}</Box>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <AiFillHome style={{ fontSize: '18px', color: 'cornflowerblue' }} />
                            <Box component={'span'}>
                                {' '}
                                {vendorDetail.primery_Address.address}, {vendorDetail.primery_Address.city},{' '}
                                {vendorDetail.primery_Address.state}-{vendorDetail.primery_Address.pincode}
                            </Box>
                        </Box>
                    </Grid>
                </Grid> */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {formType === 'customer'
                            ? tabsCutomerName.map((ele, i) => {
                                  return <Tab label={ele} {...a11yProps(i)} />;
                              })
                            : tabsVendorName.map((ele, i) => {
                                  return <Tab label={ele} className="custom-tabs" {...a11yProps(i)} />;
                              })}
                    </Tabs> */}

                    <Tabs>
                        <TabLinkList>
                            {formType === 'customer'
                                ? tabsCutomerName.map((ele, i) => {
                                      return (
                                          <TabLink active={value === i} key={i} onClick={() => handleChange(i)}>
                                              <TabLinkContent>{ele}</TabLinkContent>
                                          </TabLink>
                                      );
                                  })
                                : tabsVendorName.map((ele, i) => {
                                      return (
                                          <TabLink active={value === i} key={i} onClick={() => handleChange(i)}>
                                              <TabLinkContent>{ele}</TabLinkContent>
                                          </TabLink>
                                      );
                                  })}
                            {/* <TabLink active={value === 0} onClick={() => handleChange(0)}>
                                <TabLinkContent>&nbsp;Basic</TabLinkContent>
                            </TabLink>
                            <TabLink active={value === 1} onClick={() => handleChange(1)}>
                                <TabLinkContent>&nbsp;Deeds</TabLinkContent>
                            </TabLink>
                            <TabLink active={value === 2} onClick={() => handleChange(2)}>
                                <TabLinkContent>&nbsp;Mortgage</TabLinkContent>
                            </TabLink>
                            <TabLink active={value === 3} onClick={() => handleChange(3)}>
                                <TabLinkContent>&nbsp;Liens</TabLinkContent>
                            </TabLink>
                            <TabLink active={value === 4} onClick={() => handleChange(4)}>
                                <TabLinkContent>
                                    <i className="bi bi-cash-coin"></i>&nbsp;Taxes
                                </TabLinkContent>
                            </TabLink>
                            <TabLink active={value === 5} onClick={() => handleChange(5)}>
                                <TabLinkContent>&nbsp;Miscellaneous</TabLinkContent>
                            </TabLink> */}
                            {/* <DownloadReportButton /> */}
                        </TabLinkList>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={value}>
                    <EditModal
                        open={editModalOpen}
                        formType={formType}
                        vendorDetail={vendorDetail}
                        setVendorDetail={setVendorDetail}
                        seteditModalOpen={seteditModalOpen}
                        editView={editView}
                        editData={editData}
                        setOpenTableView={props.setOpen}
                        openTableView={props.open}
                        setEditData={setEditData}
                        TabValue={value}
                        TabLabelName={formType === 'customer' ? tabsCutomerName : tabsVendorName}
                        selecetedVedorId={vendorDetail && vendorDetail.id ? vendorDetail.id : vendorDetail.customerId}
                    />
                </TabPanel>
            </Box>
        </React.Fragment>
    );
}

const ViewVendor = (props) => {
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [openfilter, setOpenfilter] = React.useState(false);
    const [vendorDetail, setVendorDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [allstate, setAllState] = useState([]);
    const [allstatedata, setAllStatedata] = useState([]);
    const formType = props.formType;
    const [filterdata, setFilterdata] = useState({
        Id: '',
        Email: '',
        Name: '',
        Status: 0,
        Contact: '',
        Licence: '',
        State: '',
        Product: ''
    });

    const GetmoreData = (id) => {
        if (props.formType === 'vendor') {
            Getvendorbyid(id).then((res) => {
                setVendorDetail(res);
                setOpen(!open);
            });
        } else {
            GetCustomerDetaills(id).then((res) => {
                setVendorDetail(res.data);
                setOpen(!open);
            });
        }
    };
    const dowloadFile = () => {
        DownloadFile(vendorDetail.uploadedfile).then((res) => {
            let data = res.response !== undefined && res.response.status !== undefined ? res.response : res.status ? res : '';

            if (data.status === 200) {
                const url = window.URL.createObjectURL(new Blob([data.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            } else {
                toast.error('File not found');
            }
        });
    };
    const columns = [
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <div className="justify-content-center d-flex">
                        <FaEdit
                            className="hover:cursor-pointer"
                            size={15}
                            style={{ color: '#03a5e7' }}
                            onClick={() => {
                                GetmoreData(params.id);
                            }}
                            role="button"
                        />
                    </div>
                );
            }
        },
        {
            headerName: 'Status',
            field: 'status',
            renderCell: (params) => {
                return params.row.status === 0 ? (
                    <span style={{ border: '2px solid black', padding: '3px 6px', borderRadius: '5px', color: 'black' }}>New</span>
                ) : params.row.status === 1 ? (
                    <span style={{ border: '2px solid orange', padding: '3px 6px', borderRadius: '5px', color: 'orange' }}>Updated</span>
                ) : params.row.status === 2 ? (
                    <span style={{ border: '2px solid green', padding: '3px 6px', borderRadius: '5px', color: 'green' }}>Verified</span>
                ) : (
                    <span style={{ border: '2px solid red', padding: '3px 6px', borderRadius: '5px', color: 'red' }}>InActive</span>
                );
            }
        },
        { headerName: 'ID', field: 'vendorid', minWidth: 150, flex: 1 },
        { headerName: 'Name', field: 'name', minWidth: 150, flex: 1 },
        { headerName: 'Email', field: 'email', minWidth: 300, flex: 1 },
        // { headerName: 'State', field: 'state', minWidth: 150, flex: 1 },
        { headerName: 'Contact', field: 'contact', minWidth: 300, flex: 1 }
        // { headerName: 'Licence', field: 'licenceType', minWidth: 150, flex: 1 },
        // { headerName: 'Product', field: 'product', minWidth: 150, flex: 1 }
    ];
    const Customercolumns = [
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <div className="justify-content-center d-flex">
                        <FaEdit
                            role="button"
                            className="hover:cursor-pointer"
                            size={15}
                            style={{ color: '#03a5e7' }}
                            onClick={() => {
                                GetmoreData(params.id);
                            }}
                        />
                    </div>
                );
            }
        },
        { headerName: 'ID', field: 'vendorid', minWidth: 150, flex: 1 },
        { headerName: 'Name', field: 'name', minWidth: 150, flex: 1 },
        { headerName: 'Email', field: 'email', minWidth: 300, flex: 1 },
        // { headerName: 'State', field: 'state', minWidth: 150, flex: 1 },
        { headerName: 'Contact', field: 'contact', minWidth: 300, flex: 1 }
        // { headerName: 'Product', field: 'product', minWidth: 150, flex: 1 }
    ];
    useEffect(() => {
        let data = [];
        setIsLoading(true);
        setOpen(false);
        if (props.formType === 'vendor') {
            GetallVendorBySearch({ status: 0 }).then((res) => {
                res.map((ele) =>
                    data.push({
                        id: ele.id,
                        vendorid: ele.vendorid,
                        name: ele.name,
                        email: ele.email,
                        state: ele.address.split(',')[3],
                        contact:
                            ele.contact1.split(',')[4] === ''
                                ? ele.contact1.split(',')[3]
                                : ele.contact1.split(',')[3] + ' ,' + ele.contact1.split(',')[4],
                        licenceType: ele.licence.licenceType,
                        product: ele.product.name,
                        status: ele.status
                    })
                );
                setAllStatedata(data);
                setIsLoading(false);
            });
        } else {
            CustomerSearch({}).then((res) => {
                res.data.map((ele) =>
                    data.push({
                        id: ele.id,
                        vendorid: ele.customerId,
                        name: ele.name,
                        email: ele.email,
                        state: ele.address.split(',')[3],
                        contact:
                            ele.contact1.split(',')[4] === ''
                                ? ele.contact1.split(',')[3]
                                : ele.contact1.split(',')[3] + ' ,' + ele.contact1.split(',')[4],
                        product: ele.product.name
                    })
                );
                setAllStatedata(data);
                setIsLoading(false);
            });
        }
        GetStateList().then((res) => {
            setAllState(res);
        });
    }, [props.formType]);
    const handleFilterChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value === 'clear') setFilterdata({ ...filterdata, [name]: '' });
        else setFilterdata({ ...filterdata, [name]: value });
    };
    const handleSearch = () => {
        setIsLoading(true);
        let data = {};
        if (filterdata.Id !== '') data.id = filterdata.Id;
        if (filterdata.Name !== '') data.name = filterdata.Name;
        if (filterdata.Email !== '') data.email = filterdata.Email;
        // if (filterdata.Status !== "") data.status = filterdata.Status;
        if (filterdata.Contact !== '') data.contact = filterdata.Contact;
        if (filterdata.Licence !== '') data.licence = filterdata.Licence;
        if (filterdata.State !== '') data.state = filterdata.State;
        if (filterdata.Product !== '') data.product = filterdata.Product;

        if (formType === 'vendor') {
            data.status = filterdata.Status;
            GetallVendorBySearch(data).then((res) => {
                let data = [];
                res.map((ele) =>
                    data.push({
                        id: ele.id,
                        vendorid: ele.vendorid,
                        name: ele.name,
                        email: ele.email,
                        state: ele.address.split(',')[3],
                        contact:
                            ele.contact1.split(',')[4] === ''
                                ? ele.contact1.split(',')[3]
                                : ele.contact1.split(',')[3] + ' ,' + ele.contact1.split(',')[4],
                        licenceType: ele.licence.licenceType,
                        product: ele.product.name,
                        status: ele.status
                    })
                );
                setIsLoading(false);
                setAllStatedata(data);
            });
        } else {
            CustomerSearch(data).then((res) => {
                let data = [];
                res.data.map((ele) =>
                    data.push({
                        id: ele.id,
                        vendorid: ele.customerId,
                        name: ele.name,
                        email: ele.email,
                        state: ele.address.split(',')[3],
                        contact:
                            ele.contact1.split(',')[4] === ''
                                ? ele.contact1.split(',')[3]
                                : ele.contact1.split(',')[3] + ' ,' + ele.contact1.split(',')[4],
                        product: ele.product.name
                    })
                );
                setAllStatedata(data);
                setIsLoading(false);
            });
        }
    };

    return (
        <>
            {!open ? (
                <div className="">
                    <div className="row justify-content-between items-center py-3 mb-2" style={{ background: '#266293' }}>
                        <div className="col-sm-5">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Name"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon2"
                                    onChange={(e) => handleFilterChange(e)}
                                    value={filterdata.Name}
                                />
                                <span
                                    role="button"
                                    className="w-12 flex justify-center items-center"
                                    style={{ background: '#fff' }}
                                    onClick={() => handleSearch()}
                                    onKeyPress={() => {}}
                                    tabIndex={0}
                                >
                                    <AiOutlineSearch size={18} />
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div
                                onClick={() => setOpenfilter(!openfilter)}
                                className="text-center h-8 items-center flex justify-center"
                                style={{ background: '#fff', color: '#266293', fontWeight: 'bold' }}
                                role="button"
                                onKeyPress={() => {}}
                                tabIndex={0}
                            >
                                Advanced filter {openfilter ? <MdKeyboardArrowUp size={18} /> : <MdKeyboardArrowDown size={18} />}
                            </div>
                        </div>
                    </div>

                    {openfilter && (
                        <Grid container className="p-3" spacing={2}>
                            <Grid item>
                                <TextField
                                    id="Id"
                                    label={<>ID</>}
                                    name="Id"
                                    value={filterdata.Id}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => handleFilterChange(e)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={<>Email</>}
                                    name="Email"
                                    value={filterdata.Email}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => handleFilterChange(e)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={<>Name</>}
                                    name="Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => handleFilterChange(e)}
                                    value={filterdata.Name}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ width: '180px' }} fullWidth={true} size="small">
                                    <InputLabel>State</InputLabel>
                                    <Select value={filterdata.State} name="State" onChange={(e) => handleFilterChange(e)}>
                                        <MenuItem value={'clear'}>Clear Selection</MenuItem>
                                        {allstate.map((ele, indx) => {
                                            return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={<>Contact</>}
                                    name="Contact"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => handleFilterChange(e)}
                                    value={filterdata.Contact}
                                />
                            </Grid>
                            {props.formType === 'vendor' ? (
                                <>
                                    {' '}
                                    <Grid item>
                                        <TextField
                                            label={<>Licence</>}
                                            name="Licence"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => handleFilterChange(e)}
                                            value={filterdata.Licence}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControl className="w-52" size="small">
                                            <InputLabel>Status</InputLabel>
                                            <Select value={filterdata.Status} name="Status" onChange={(e) => handleFilterChange(e)}>
                                                <MenuItem value={0} defaultChecked={true}>
                                                    New
                                                </MenuItem>
                                                <MenuItem value={1}>Updated</MenuItem>
                                                <MenuItem value={2}>Verified</MenuItem>
                                                <MenuItem value={3}>InActive</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            ) : (
                                <></>
                            )}
                            <Grid item>
                                <TextField
                                    label={<>Product</>}
                                    name="Product"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => handleFilterChange(e)}
                                    value={filterdata.Product}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => handleSearch()} style={{ background: '#266293' }}>
                                    <AiOutlineSearch size={18} /> &nbsp; Search
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </div>
            ) : (
                <></>
            )}
            {!open ? (
                <>
                    {!isLoading ? (
                        <div style={{ height: 400, width: '100%', marginTop: '10px' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid
                                        rowHeight={40}
                                        rows={allstatedata}
                                        columns={formType === 'vendor' ? columns : Customercolumns}
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
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1
                            className="flex justify-center
        "
                        >
                            Loading...
                        </h1>
                    )}
                </>
            ) : (
                <Row
                    setOpen={setOpen}
                    open={open}
                    vendorDetail={vendorDetail}
                    setVendorDetail={setVendorDetail}
                    formType={props.formType}
                />
            )}
            {/* <EnhancedTable /> */}
            {!open ? (
                <SpeedDial
                    onClick={() => props.setValue(1)}
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 50 }}
                    icon={<FiPlus size={25} />}
                ></SpeedDial>
            ) : (
                <></>
            )}
        </>
    );
};
export default ViewVendor;
