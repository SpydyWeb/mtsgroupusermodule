import React, { useState, useEffect } from "react";
import {
  Modal,
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

} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  GetallVendorBySearch,
  Getvendorbyid,
  GetStateList,
} from "../../Services/Vendor";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineClose,
  AiFillEdit,
} from "react-icons/ai";
import { AiFillEye, AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";
import EditModal from "./EditModal";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  backgroundColor: "#e0e0e0",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const ProductRow = (props) => {
  const { product } = props;

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product ? (
            product.map((historyRow, indx) => (
              <TableRow key={historyRow.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{historyRow.name}</TableCell>
                <TableCell align="right">{historyRow.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};

const CommunicationRow = (props) => {
  const { communication } = props;

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No.</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Detail</TableCell>
            <TableCell align="center">Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {communication ? (
            communication.map((historyRow, indx) => (
              <TableRow key={historyRow.id}>
                <TableCell align="center">{indx + 1}</TableCell>
                <TableCell align="center">{historyRow.type}</TableCell>
                <TableCell align="center">{historyRow.detail}</TableCell>
                <TableCell align="center">{historyRow.productname}</TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};
const LicenceRow = (props) => {
  const { licences } = props;

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Licence No</TableCell>
            <TableCell>Licence Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Disciplinary Action</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {licences ? (
            licences.map((historyRow, indx) => (
              <TableRow key={historyRow.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>
                  {historyRow.firstName + " " + historyRow.lastName}
                </TableCell>
                <TableCell>{historyRow.licenceNo}</TableCell>
                <TableCell>{historyRow.licenceType}</TableCell>
                <TableCell>{historyRow.status}</TableCell>
                <TableCell>{historyRow.address}</TableCell>
                <TableCell>{historyRow.expiry_Date.substring(0, 10)}</TableCell>
                <TableCell>{historyRow.issueDate.substring(0, 10)}</TableCell>
                <TableCell>{historyRow.disciplinaryAction}</TableCell>
                <TableCell>{historyRow.note}</TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};
const AddressRow = (props) => {
  const address = [props.primary, props.secondary];

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Suite</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Pincode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {address ? (
            address.map((historyRow, indx) => (
              <TableRow>
                <TableCell>{indx === 0 ? "Primary" : "Billing"}</TableCell>
                <TableCell>{historyRow.address}</TableCell>
                <TableCell>{historyRow.city}</TableCell>
                <TableCell>{historyRow.suite}</TableCell>
                <TableCell>{historyRow.state}</TableCell>
                <TableCell>{historyRow.pincode}</TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};
const ContactRow = (props) => {
  const address = [props.primary, props.secondary];

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ext</TableCell>
            <TableCell>Cell Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {address ? (
            address.map((historyRow, indx) => (
              <TableRow key={indx}>
                <TableCell>{indx === 0 ? "Primary" : "Secondary"}</TableCell>
                <TableCell>
                  {historyRow.firstName +
                    " " +
                    historyRow.middleName +
                    " " +
                    historyRow.lastName}
                </TableCell>
                <TableCell>{historyRow.phone}</TableCell>
                <TableCell>{historyRow.email}</TableCell>
                <TableCell>{historyRow.ext}</TableCell>
                <TableCell>{historyRow.cellPhone}</TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </>
  );
};

const AdditionalRow = (props) => {
  return (
    <>
    <div className="flex gap-4">
      <h3 className="flex">
        New Assignment{" "}
        {props.new_Assignment ? (
          <BsCheckCircleFill color="green" />
        ) : (
          <AiFillCloseCircle color="red" />
        )}
      </h3>
      <h3 className="flex">
        QC Rejection{" "}
        {props.qcRejection ? (
          <BsCheckCircleFill color="green" />
        ) : (
          <AiFillCloseCircle color="red" />
        )}
      </h3>
      <h3 className="flex">
        Daily Reminder{" "}
        {props.dailyReminder ? (
          <BsCheckCircleFill color="green" />
        ) : (
          <AiFillCloseCircle color="red" />
        )}
      </h3>
      <h3 className="flex">
        Profile Reminder{" "}
        {props.profileReminder ? (
          <BsCheckCircleFill color="green" />
        ) : (
          <AiFillCloseCircle color="red" />
        )}
      </h3>
   
    </div>
    <div className="flex items-center">   <h2 className="font-bold py-2">Assignment Note :    </h2><p>{props.assignmentNote}</p>
    </div>
    </>
  );
};
function Row(props) {
  const { vendorDetail, setVendorDetail } = props;
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [editModalOpen,seteditModalOpen]=useState(false)
const handleopenEditmodal=(event,view)=>{
  event.stopPropagation();
  setEditView(view);
  seteditModalOpen(!editModalOpen)
}
const [editView,setEditView]=useState(0)
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end mb-3 cursor-pointer">
            <AiOutlineClose
              onClick={() => {
                props.setOpen(false);
                setVendorDetail({});
              }}
              size={20}
            />
          </div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              className="Btn_Gradient_Ac"
              expandIcon={
                <IconButton size="small" aria-label="view">
                  {expanded === "panel1" ? (
                    <AiOutlineClose />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </IconButton>
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "#e1edef" }}
            >
              <Typography
                sx={{ flexShrink: 0, fontWeight: "700" }}
                className="flex justify-between w-full"
              >
                <h3>Product</h3>
                <div className="mr-2">
                  <IconButton
                    size="small"
                    aria-label="edit"
                    
                  >
                    <AiFillEdit onClick={(e)=>handleopenEditmodal(e,0)}/>
                  </IconButton>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-auto">
              <Typography>
                <ProductRow
                  product={
                    vendorDetail && vendorDetail.product
                      ? vendorDetail.product
                      : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              className="Btn_Gradient_Ac"
              expandIcon={
                <IconButton size="small" aria-label="view">
                  {expanded === "panel2" ? (
                    <AiOutlineClose />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </IconButton>
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              {" "}
              <Typography
                sx={{ flexShrink: 0, fontWeight: "700" }}
                className="flex justify-between w-full"
              >
                <h3>Communication</h3>
                <div className="mr-2">
                  <IconButton size="small" aria-label="view">
                    <AiFillEdit onClick={(e)=>handleopenEditmodal(e,1)} />
                  </IconButton>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-auto">
              <Typography>
                <CommunicationRow
                  communication={
                    vendorDetail && vendorDetail.communication
                      ? vendorDetail.communication
                      : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              className="Btn_Gradient_Ac"
              expandIcon={
                <IconButton size="small" aria-label="view">
                  {expanded === "panel3" ? (
                    <AiOutlineClose />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </IconButton>
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              {" "}
              <Typography
                sx={{ flexShrink: 0, fontWeight: "700" }}
                className="flex justify-between w-full"
              >
                <h3>Licence</h3>
                <div className="mr-2">
                  <IconButton size="small" aria-label="view">
                  <AiFillEdit onClick={(e)=>handleopenEditmodal(e,2)} />
                  </IconButton>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-auto">
              <Typography>
                <LicenceRow
                  licences={
                    vendorDetail && vendorDetail.licences
                      ? vendorDetail.licences
                      : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              className="Btn_Gradient_Ac"
              expandIcon={
                <IconButton size="small" aria-label="view">
                  {expanded === "panel4" ? (
                    <AiOutlineClose />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </IconButton>
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              {" "}
              <Typography
                sx={{ flexShrink: 0, fontWeight: "700" }}
                className="flex justify-between w-full"
              >
                <h3>Address</h3>
                <div className="mr-2">
                  <IconButton size="small" aria-label="view">
                  <AiFillEdit onClick={(e)=>handleopenEditmodal(e,3)} />
                  </IconButton>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-auto">
              <Typography>
                <AddressRow
                  primary={
                    vendorDetail && vendorDetail.primery_Address
                      ? vendorDetail.primery_Address
                      : ""
                  }
                  secondary={
                    vendorDetail && vendorDetail.secondary_Address
                      ? vendorDetail.secondary_Address
                      : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              className="Btn_Gradient_Ac"
              expandIcon={
                <IconButton size="small" aria-label="delete">
                  {expanded === "panel5" ? (
                    <AiOutlineClose />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </IconButton>
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              {" "}
              <Typography
                sx={{ flexShrink: 0, fontWeight: "700" }}
                className="flex justify-between w-full"
              >
                <h3>Contact</h3>
                <div className="mr-2">
                  <IconButton size="small" aria-label="delete">
                  <AiFillEdit onClick={(e)=>handleopenEditmodal(e,4)} />
                  </IconButton>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-auto">
              <Typography>
                <ContactRow
                  primary={
                    vendorDetail && vendorDetail.primery_Contact
                      ? vendorDetail.primery_Contact
                      : ""
                  }
                  secondary={
                    vendorDetail && vendorDetail.secondary_contact
                      ? vendorDetail.secondary_contact
                      : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              className="Btn_Gradient_Ac"
              expandIcon={
                <IconButton size="small" aria-label="delete">
                  {expanded === "panel6" ? (
                    <AiOutlineClose />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </IconButton>
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              {" "}
              <Typography
                sx={{ flexShrink: 0, fontWeight: "700" }}
                className="flex justify-between w-full"
              >
                <h3>Additional</h3>
                <div className="mr-2">
                  <IconButton size="small" aria-label="delete">
                  <AiFillEdit onClick={(e)=>handleopenEditmodal(e,5)} />
                  </IconButton>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="overflow-auto">
              <Typography>
                <AdditionalRow
                  profileReminder={
                    vendorDetail && vendorDetail.profileReminder
                      ? vendorDetail.profileReminder
                      : ""
                  }
                  dailyReminder={
                    vendorDetail && vendorDetail.dailyReminder
                      ? vendorDetail.dailyReminder
                      : ""
                  }
                  qcRejection={
                    vendorDetail && vendorDetail.qcRejection
                      ? vendorDetail.qcRejection
                      : ""
                  }
                  new_Assignment={
                    vendorDetail && vendorDetail.new_Assignment
                      ? vendorDetail.new_Assignment
                      : ""
                  }
                  assignmentNote={
                    vendorDetail && vendorDetail.assignmentNote
                    ? vendorDetail.assignmentNote
                    : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Modal>

     { editModalOpen?<EditModal open={editModalOpen}  vendorDetail={vendorDetail} setVendorDetail={setVendorDetail} seteditModalOpen={seteditModalOpen} editView={editView} selecetedVedorId={vendorDetail&&vendorDetail.id?vendorDetail.id:0}/>:''}
    </React.Fragment>
  );
}



const ViewVendor = () => {
  const [open, setOpen] = React.useState(false);
  const [vendorDetail, setVendorDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allstate, setAllState] = useState([]);
  const [allstatedata, setAllStatedata] = useState([]);

  const [filterdata, setFilterdata] = useState({
    Id: "",
    Email: "",
    Name: "",
    Status: true,
    Contact: "",
    Licence: "",
    State: "",
    Product: "",
  });

  const GetmoreData = (id) => {
    Getvendorbyid(id).then((res) => {
      setVendorDetail(res);

      setOpen(!open);
    });
  };

  const columns = [
    {
      headerName: "Status",
      field: "status",
      renderCell: (params) => {
        return params.row.status ? (
          <span className="border-2 border-green-400 p-[2px] rounded-sm text-green-400">
            Active
          </span>
        ) : (
          <span className="border-2 border-red-400 p-[2px] rounded-sm text-red-400">
            InActive
          </span>
        );
      },
    },
    { headerName: "ID", field: "vendorid", minWidth: 150, flex: 1 },
    { headerName: "Name", field: "name", minWidth: 150, flex: 1 },
    { headerName: "Email", field: "email", minWidth: 300, flex: 1 },
    { headerName: "State", field: "state", minWidth: 150, flex: 1 },
    { headerName: "Contact", field: "contact", minWidth: 300, flex: 1 },
    { headerName: "Licence", field: "licenceType", minWidth: 150, flex: 1 },
    { headerName: "Product", field: "product", minWidth: 150, flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="gap-3 d-flex">
            <AiFillEye
              className="hover:cursor-pointer"
              size={20}
              style={{ color: "#03a5e7" }}
              onClick={() => {
                GetmoreData(params.id);
              }}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    setIsLoading(true);
    GetallVendorBySearch({ status: true }).then((res) => {
      let data = [];

      res.map((ele) =>
        data.push({
          id: ele.id,
          vendorid: ele.vendorid,
          name: ele.name,
          email: ele.email,
          state: ele.address.split(",")[3],
          contact:
            ele.contact1.split(",")[4] === ""
              ? ele.contact1.split(",")[3]
              : ele.contact1.split(",")[3] + " ," + ele.contact1.split(",")[4],
          licenceType: ele.licence.licenceType,
          product: ele.product.name,
          status: ele.status,
        })
      );

      setAllStatedata(data);
      setIsLoading(false);
    });
    GetStateList().then((res) => {
      setAllState(res);
    });
  }, []);
  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilterdata({ ...filterdata, [name]: value });
  };
  const handleSearch = () => {
    setIsLoading(true);
    let data = {};
    if (filterdata.Id !== "") data.id = filterdata.Id;
    if (filterdata.Name !== "") data.name = filterdata.Name;
    if (filterdata.Email !== "") data.email = filterdata.Email;
    // if (filterdata.Status !== "") data.status = filterdata.Status;
    if (filterdata.Contact !== "") data.contact = filterdata.Contact;
    if (filterdata.Licence !== "") data.licence = filterdata.Licence;
    if (filterdata.State !== "") data.state = filterdata.State;
    if (filterdata.Product !== "") data.product = filterdata.Product;

    data.status = filterdata.Status;
    GetallVendorBySearch(data).then((res) => {
      let data = [];
      res.map((ele) =>
        data.push({
          id: ele.id,
          vendorid: ele.vendorid,
          name: ele.name,
          email: ele.email,
          state: ele.address.split(",")[3],
          contact:
            ele.contact1.split(",")[4] === ""
              ? ele.contact1.split(",")[3]
              : ele.contact1.split(",")[3] + " ," + ele.contact1.split(",")[4],
          licenceType: ele.licence.licenceType,
          product: ele.product.name,
          status: ele.status,
        })
      );
      setIsLoading(false);
      setAllStatedata(data);
    });
  };
  return (
    <>
      <>
        {" "}
        <div className="grid lg:grid-cols-5 gap-2  md:grid-cols-3 sm:grid-cols-1  border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500">
          <div>
            <TextField
              id="Id"
              label={<>ID</>}
              name="Id"
              value={filterdata.Id}
              variant="outlined"
              size="small"
              onChange={(e) => handleFilterChange(e)}
            />
          </div>
          <div>
            <TextField
              label={<>Email</>}
              name="Email"
              value={filterdata.Email}
              variant="outlined"
              size="small"
              onChange={(e) => handleFilterChange(e)}
            />
          </div>
          <div>
            <TextField
              label={<>Name</>}
              name="Name"
              variant="outlined"
              size="small"
              onChange={(e) => handleFilterChange(e)}
              value={filterdata.Name}
            />
          </div>
          <div>
            <FormControl className="w-52" size="small">
              <InputLabel>State</InputLabel>
              <Select
                value={filterdata.State}
                name="State"
                onChange={(e) => handleFilterChange(e)}
              >
                {allstate.map((ele, indx) => {
                  return <MenuItem value={ele.name}>{ele.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              label={<>Contact</>}
              name="Contact"
              variant="outlined"
              size="small"
              onChange={(e) => handleFilterChange(e)}
              value={filterdata.Contact}
            />
          </div>
          <div>
            <TextField
              label={<>Licence</>}
              name="Licence"
              variant="outlined"
              size="small"
              onChange={(e) => handleFilterChange(e)}
              value={filterdata.Licence}
            />
          </div>
          <div>
            <FormControl className="w-52" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterdata.Status}
                name="Status"
                onChange={(e) => handleFilterChange(e)}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>InActive</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <TextField
              label={<>Product</>}
              name="Product"
              variant="outlined"
              size="small"
              onChange={(e) => handleFilterChange(e)}
              value={filterdata.Product}
            />
          </div>
          <div>
            <Button variant="contained" onClick={() => handleSearch()}>
              <AiOutlineSearch size={18} /> &nbsp; Search
            </Button>
          </div>
        </div>
        {!isLoading ? (
          <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={allstatedata}
                  columns={columns}
                  disableColumnFilter
                  disableColumnSelector
                  disableDensitySelector
                  componentsProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
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
        <Row
          setOpen={setOpen}
          open={open}
          vendorDetail={vendorDetail}
          setVendorDetail={setVendorDetail}
        />
      </>
    </>
  );
};
export default ViewVendor;
