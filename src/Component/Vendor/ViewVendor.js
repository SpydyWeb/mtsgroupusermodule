import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { GetallVendor, Getvendorbyid } from "../../Services/Vendor";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineClose,
} from "react-icons/ai";
import { FiMinusSquare } from "react-icons/fi";
import { FcInfo } from "react-icons/fc";
import Header from "../../Admin/Header";
import Footer from "../../Admin/Footer";
import Sidebar from "../../Admin/Sidebar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
const ProductRow = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Sr no.</TableCell>
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
            <TableCell>Sr no.</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Detail</TableCell>
            <TableCell>Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {communication ? (
            communication.map((historyRow, indx) => (
              <TableRow key={historyRow.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{historyRow.type}</TableCell>
                <TableCell align="right">{historyRow.detail}</TableCell>
                <TableCell align="right">{historyRow.product_id}</TableCell>
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
            <TableCell>Sr no.</TableCell>
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
                  {historyRow.firstName + " " + historyRow.lastNme}
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
              <TableRow key={historyRow.id}>
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
    </>
  );
};
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [vendorDetail, setVendorDetail] = useState();
  const GetmoreData = (id) => {
    setOpen(!open);

    Getvendorbyid(id).then((res) => {
      setVendorDetail(res);
      props.setOpen(!props.open);
    });
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.emailId}</TableCell>
        <TableCell>{row.department}</TableCell>
        <TableCell>{row.userType}</TableCell>
        <TableCell>
          <FcInfo
            onClick={() => {
              GetmoreData(row.id);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
      <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel1" ? <AiOutlineClose /> : <AiOutlinePlus />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "#e1edef" }}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Product
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ProductRow
                  product={vendorDetail ? vendorDetail.product : ""}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              sx={{ background: "#e1edef" }}
              expandIcon={
                expanded === "panel2" ? <AiOutlineClose /> : <AiOutlinePlus />
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Communication
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <CommunicationRow
                  communication={vendorDetail ? vendorDetail.communication : ""}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              sx={{ background: "#e1edef" }}
              expandIcon={
                expanded === "panel3" ? <AiOutlineClose /> : <AiOutlinePlus />
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Licence
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <LicenceRow
                  licences={vendorDetail ? vendorDetail.licences : ""}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              sx={{ background: "#e1edef" }}
              expandIcon={
                expanded === "panel4" ? <AiOutlineClose /> : <AiOutlinePlus />
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Address
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <AddressRow
                  primary={vendorDetail ? vendorDetail.primery_Address : ""}
                  secondary={vendorDetail ? vendorDetail.secondary_Address : ""}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              sx={{ background: "#e1edef" }}
              expandIcon={
                expanded === "panel5" ? <AiOutlineClose /> : <AiOutlinePlus />
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Contact
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ContactRow
                  primary={vendorDetail ? vendorDetail.primery_Contact : ""}
                  secondary={vendorDetail ? vendorDetail.secondary_contact : ""}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              sx={{ background: "#e1edef" }}
              expandIcon={
                expanded === "panel6" ? <AiOutlineClose /> : <AiOutlinePlus />
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Additional
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <AdditionalRow
                  profileReminder={
                    vendorDetail ? vendorDetail.profileReminder : ""
                  }
                  dailyReminder={vendorDetail ? vendorDetail.dailyReminder : ""}
                  qcRejection={vendorDetail ? vendorDetail.qcRejection : ""}
                  new_Assignment={
                    vendorDetail ? vendorDetail.new_Assignment : ""
                  }
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const ViewVendor = () => {
  const [basicDetail, setbasicDetail] = useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    GetallVendor().then((res) => setbasicDetail(res));
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper px-4 pt-5">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead sx={{ background: "#e1edef" }}>
              <TableRow className="font-extrabold">
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {basicDetail.map((row) => (
                <Row key={row.name} row={row} setOpen={setOpen} open={open} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </>
  );
};
export default ViewVendor;
